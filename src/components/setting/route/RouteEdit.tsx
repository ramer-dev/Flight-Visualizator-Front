import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { postRoute } from 'common/service/fileService'
import { postFixPoint } from 'common/service/pointService'
import { deleteRouteData, patchRouteData, postRouteData } from 'common/service/routeService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import { RoutePointType } from 'common/type/RouteType'
import CustomModal from 'components/common/CustomModal'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetPoint } from 'components/hooks/useFixPoint'
import useModal from 'components/hooks/useModal'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { FixPointAutoCompleteItemType, FixPointDTO } from 'dto/fixPointDTO'
import { RouteDTO, RoutePointDTO } from 'dto/routeDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
import Portal from 'module/Portal'
import { validateCoordinates } from 'module/validationCoordinate'
import React from 'react'
import { useMap } from 'react-leaflet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import FixPointAutoComplete from '../fixPoint/FixPointAutoComplete'
import { SettingStateType } from '../SettingStateType'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  overflow-X:hidden;
`

const Content = styled.div`
  display:flex;
  gap:10px;
  justify-content:end;
`

const InputWrapper = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  overflow-y:auto;
  height:100%;
  max-height:calc(100vh - 230px);
  padding: 5px 0;
`

function RouteEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const { data, refetch, isLoading, isError } = useGetPoint();
    const options = data.map(t => { return { label: `${t.pointName}`, coord: t.pointCoordinate, id: t.id } })
    const [name, setName] = React.useState('');
    const [points, setPoints] = React.useState<FixPointAutoCompleteItemType[]>([])
    const nameRef = React.useRef<HTMLInputElement>();
    const map = useMap();
    const polyLineLayer = React.useRef<L.Polyline>();
    const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
    const { isModalOpen, openModal, closeModal } = useModal()

    function alertModal(open: () => void, title: string, message: string, close?: () => void) {
        setModalContext({ title, message, close })
        open()
    }

    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
        closeModal()
    }

    const handleSubmit = async () => {
        if (nameRef?.current?.value && points.length) {
            const body: RouteDTO = {
                routeName: nameRef.current.value,
                routeData: points.map(t => { return { routeName: t.label } })
            }
            try {
                if (body.routeName && body.routeData.every(t => !!t)) {
                    await patchRouteData(settingState.data.id, body);
                    alertModal(openModal, '항로 수정 성공', `[ ${body.routeName} ]\n항로 수정에 성공하였습니다.`, closeScreen)
                } else {
                    throw new Error('BAD REQUEST')
                }
            } catch (e: any) {
                alertModal(openModal, '항로 수정 실패', `항로 수정에 실패하였습니다.`, closeModal)
            }
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePointChange = (index: number, value: FixPointAutoCompleteItemType) => {
        const updatedPoints = [...points];
        updatedPoints[index] = value;
        setPoints(updatedPoints)
    }

    const addPoint = () => {
        setPoints([...points, options[0]/*{ label: '', id: points.length, coord: { lat: 0, lng: 0 } }*/])
    }

    const removePoint = (index: number) => {
        const updatedPoints = [...points];
        updatedPoints.splice(index, 1);
        setPoints(updatedPoints);
    }

    const handleDelete = async () => {
        try {
            await deleteRouteData(settingState.data.id);
            alertModal(openModal, '항로 삭제 성공', `항로 삭제에 성공하였습니다.`, closeScreen)
        } catch (e) {
            alertModal(openModal, '항로 삭제 실패', `항로 삭제에 실패하였습니다.`, closeScreen)
        }
    }


    React.useEffect(() => {
        if (polyLineLayer.current) {
            polyLineLayer.current.remove();
        }
        // const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (points.length) {
            const polylineCoords = []

            for (let item of points) {
                if (item?.coord.lat && item?.coord.lng)
                    polylineCoords.push({ lat: convertToWGS(item.coord.lat), lng: convertToWGS(item.coord.lng) })
            }
            polyLineLayer.current = L.polyline(polylineCoords, { pane: 'setting', color: 'red' }).addTo(map);
        }

        // setCoordError(error)

        return () => {
            if (polyLineLayer.current) {
                polyLineLayer.current.remove();
            }
        }
    }, [name, points])

    React.useEffect(() => {
        if (nameRef.current && settingState?.data?.coords?.length) {
            nameRef.current.value = settingState.data?.label;

            const newState = settingState.data.coords
                .filter((t: RoutePointType) => !!t.routePointData)
                .map((t: RoutePointType) => ({
                    label: t.routePointData.pointName,
                    coord: t.routePointData.pointCoordinate,
                    id: t.routePointData.id
                } as FixPointAutoCompleteItemType))
            setPoints(newState)
        } else {
            closeScreen();
        }
    }, [settingState])

    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <ScreenTitle text={'항로 수정'} />
            <Content>
                <TextField label="항로 이름" size="small" fullWidth inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleNameChange(e) }} />
            </Content>
            <InputWrapper>

                {points.map((t, i) =>
                    <Content key={t?.label ? `${t.id}-${i}-${t.label}` : null}>
                        <FixPointAutoComplete label={`픽스점-${i + 1}`} options={options} isLoading={isLoading} isError={isError} value={t}
                            changeData={(e: FixPointAutoCompleteItemType) => handlePointChange(i, e)} />
                        <Button color='error' onClick={() => removePoint(i)}>삭제</Button>
                    </Content>
                )}
                <Button onClick={addPoint}>픽스점 추가</Button>

            </InputWrapper>
            <Content>
                <Button color='error' variant="outlined" onClick={handleDelete}>항로 삭제</Button>
                <Button color='error' onClick={closeScreen}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Content>

            <NavCloseButton contentSize={['NONE', 'MIN']} />
        </Container>

    )
}

export default RouteEdit;