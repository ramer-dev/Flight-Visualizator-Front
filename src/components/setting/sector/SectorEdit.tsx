import styled from '@emotion/styled'
import { Autocomplete, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { deleteSectorData, patchSectorData } from 'common/service/sectorService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import CustomModal from 'components/common/CustomModal'
import ErrorPage from 'components/common/ErrorPage'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetArea } from 'components/hooks/useArea'
import useModal from 'components/hooks/useModal'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { SectorDTO } from 'dto/sectorDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
import Portal from 'module/Portal'
import { validateCoordinates } from 'module/validationCoordinate'
import React from 'react'
import { useMap } from 'react-leaflet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
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

interface AreaLabelType {
    label: string,
    name: string,
    color?: string,
    id: number
}
const invalidValue: AreaLabelType = { label: '미지정', name: '미지정', color: '#009CE0', id: 0 };
export default function SectorEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const { data, refetch, isLoading, isError } = useGetArea();
    const options = data?.map(t => { return { label: `${t.areaName}`, name: t.areaName, color: t.areaColor, id: t.areaId } })
    const [name, setName] = React.useState('');
    const [area, setArea] = React.useState<AreaLabelType | null>(null)
    const [points, setPoints] = React.useState<LatLngLiteral[] | null>(null)
    const [coordError, setCoordError] = React.useState<{ lat: boolean, lng: boolean }[]>([])
    const nameRef = React.useRef<HTMLInputElement>();
    const map = useMap();
    const polygonLayer = React.useRef<L.Polygon>();
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
        if (nameRef?.current?.value && points?.length && area) {
            const body: SectorDTO = {
                sectorName: nameRef?.current?.value,
                sectorData: points,
                sectorAreaId: area.id
            }
            try {
                if(body.sectorName && body.sectorData.every(t => t.lat && t.lng)){
                await patchSectorData(settingState.data.id, body);
                alertModal(openModal, '섹터 수정 성공', `[ ${body.sectorName} ]\n섹터 수정에 성공하였습니다.`, closeScreen)
                } else {
                    throw new Error('BAD REQUEST')
                }
            } catch (e: any) {
                alertModal(openModal, '섹터 수정 실패', `섹터 수정에 실패하였습니다.`, closeModal)
            }
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePointChange = (field: 'lat' | 'lng', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        // 2단 깊은 복사
        if (points) {
            const updatedPoints = points.map(t => { return { ...t } });
            updatedPoints[index][field] = +e.target.value;
            setPoints(updatedPoints)
        }
    }
    const addPoint = () => {
        if (points) {
            setPoints([...points, { lat: 0, lng: 0 }])
        }
    }

    const removePoint = (index: number) => {
        if (points) {
            const updatedPoints = [...points];
            updatedPoints.splice(index, 1);
            setPoints(updatedPoints);
        }
    }



    const handleDelete = async () => {
        try {
            await deleteSectorData(settingState.data.id);
            alertModal(openModal, '섹터 삭제 성공', `섹터 삭제에 성공하였습니다.`, closeScreen)
        } catch (e) {
            alertModal(openModal, '섹터 삭제 실패', `섹터 삭제에 실패하였습니다.`, closeModal)
        }
    }

    function getAreaItem(id?: number): AreaLabelType {
        if (id && data.length) {
            const { areaName, areaId, areaColor } = data.filter(t => t.areaId === id)[0]
            return { label: areaName, name: areaName, color: areaColor, id: areaId }
        }
        else return invalidValue;
    }


    React.useEffect(() => {
        if (polygonLayer.current) {
            polygonLayer.current.remove();
        }
        // const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (points?.length) {
            const polygonCoords = []

            for (let item of points) {
                if (item.lat && item.lng)
                    polygonCoords.push({ lat: convertToWGS(item.lat), lng: convertToWGS(item.lng) })
            }
            polygonLayer.current = L.polygon(polygonCoords, { pane: 'setting', color: 'red' }).addTo(map);
        }

        // setCoordError(error)

        return () => {
            if (polygonLayer.current) {
                polygonLayer.current.remove();
            }
        }
    }, [name, points])

    // onLoad
    React.useEffect(() => {
        if (nameRef.current && settingState?.data?.coords?.length) {
            nameRef.current.value = settingState.data?.label;
            const coordState = settingState.data.coords
                .filter((t: LatLngLiteral) => t.lat && t.lng)
            setArea(getAreaItem(settingState.data.area))
            setPoints(coordState)
        } else {
            closeScreen();
        }
    }, [settingState])

    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <ScreenTitle text={'섹터 수정'} />
            <Content>
                <TextField label="섹터 이름" size="small" inputRef={nameRef} sx={{ flex: 1 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleNameChange(e) }} />
                <Autocomplete sx={{ flex: 1 }} options={options} onChange={(event: any, value: any) => { setArea(value) }} value={area}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => {
                        return <>
                            {isLoading && <CircularProgress size={20} />}
                            {isError && <ErrorPage />}
                            {
                                <Box sx={{ justifyContent: 'center', alignItems: 'center' }} component={'li'} key={option.label + option.name + option.color} {...props} value={option.id}>
                                    <Typography>{option.label}</Typography>
                                    <Box sx={{ backgroundColor: option?.color, width: 24, height: 18, borderRadius: 2, marginLeft: 2 }}></Box>
                                </Box>
                            }
                        </>
                    }}
                    renderInput={(params) => {
                        return <TextField   {...params} fullWidth inputProps={{ ...params.inputProps }} label="구역" size="small" />
                    }
                    }
                />
            </Content>
            <InputWrapper>

                {points?.map((t, i) =>
                    <Content key={`${name}-${i}`}>
                        <TextField key={`${name} lat ${i}`} sx={{ flex: 1 }} label='위도' type={'number'} value={t.lat} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlePointChange('lat', i, e) }}></TextField>
                        <TextField key={`${name} lng ${i}`} sx={{ flex: 1 }} label='경도' type={'number'} value={t.lng} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlePointChange('lng', i, e) }} ></TextField>
                        <Button color='error' onClick={() => removePoint(i)}>삭제</Button>
                    </Content>
                )}
                <Button onClick={addPoint}>지점 추가</Button>

            </InputWrapper>
            <Content>
                <Button color='error' variant="outlined" onClick={handleDelete}>섹터 삭제</Button>
                <Button color='error' onClick={closeScreen}>취소</Button>
                <Button onClick={handleSubmit}>저장</Button>
            </Content>

            <NavCloseButton contentSize={['NONE', 'MIN']} />
        </Container>

    )
}