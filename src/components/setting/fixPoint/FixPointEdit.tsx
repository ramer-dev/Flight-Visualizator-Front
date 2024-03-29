import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { deleteFixPoint, patchFixPoint, postFixPoint } from 'common/service/pointService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import CustomModal from 'components/common/CustomModal'
import ScreenTitle from 'components/common/ScreenTitle'
import useModal from 'components/hooks/useModal'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { FixPointDTO } from 'dto/fixPointDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
import Portal from 'module/Portal'
import { validateCoordinates } from 'module/validationCoordinate'
import React from 'react'
import { useMap } from 'react-leaflet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SettingStateType } from '../SettingStateType'
interface StyledProp {
    color: string,
}

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



function FixPointEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const [name, setName] = React.useState('');
    const [coord, setCoord] = React.useState<LatLngLiteral>({ lat: 0, lng: 0 })
    const [coordError, setCoordError] = React.useState({ lat: false, lng: false })
    const coordRef = React.useRef<HTMLDivElement[]>([]);
    const nameRef = React.useRef<HTMLInputElement>();
    const map = useMap();
    const dotLayer = React.useRef<L.CircleMarker>();
    const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
    const { isModalOpen, openModal, closeModal } = useModal()

    function alertModal(open: () => void, title: string, message: string, close?: () => void) {
        setModalContext({ title, message, close })
        open()
    }
    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
    }

    const handleSubmit = async () => {
        if (nameRef.current) {
            const body: FixPointDTO = {
                pointName: nameRef.current.value,
                pointCoordinate: { lat: coord.lat, lng: coord.lng }
            }
            try {
                if (body.pointName && body.pointCoordinate.lat && body.pointCoordinate.lng) {
                    await patchFixPoint(body, settingState.data.id);
                    alertModal(openModal, '구역 수정 성공', `[ ${body.pointName} ]\n픽스점 수정에 성공하였습니다.`, closeScreen)
                } else {
                    throw new Error('BAD REQUEST')
                }
            } catch (e) {
                alertModal(openModal, '구역 수정 성공', `[ ${body.pointName} ]\n픽스점 수정에 성공하였습니다.`, closeModal)
            }
        }
    }

    const handleDelete = async () => {
        await deleteFixPoint(settingState.data.id);
        closeScreen();
    }

    const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>, st: string) => {
        switch (st) {
            case 'lat':
                setCoord({ ...coord, lat: +e.target.value })
                break;
            case 'lng':
                setCoord({ ...coord, lng: +e.target.value })
                break;
            case 'name':
                setName(e.target.value)
                break;
        }
    }


    React.useEffect(() => {
        if (dotLayer.current) {
            dotLayer.current.remove();
        }
        const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (coord.lat && coord.lng && error.lat && error.lng) {
            dotLayer.current = L.circleMarker([convertToWGS(coord.lat), convertToWGS(coord.lng)], { radius: 8, color: 'red', }).addTo(map);
        }
        setCoordError({ lat: !error.lat, lng: !error.lng })

        return () => {
            if (dotLayer.current) {
                dotLayer.current.remove();
            }
        }
    }, [name, coord])

    React.useEffect(() => {
        if (nameRef.current && coordRef.current[0] && coordRef.current[1] && settingState?.data) {
            nameRef.current.value = settingState.data?.label;
            setCoord(settingState?.data?.coord)
        } else {
            closeScreen();
        }
    }, [settingState])

    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <ScreenTitle text={'픽스점 수정'} />
            <Content>
                <TextField label="픽스점 이름" size="small" fullWidth inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'name') }}></TextField>
            </Content>
            <Content>
                <TextField value={coord.lat} error={coordError.lat} sx={{ flex: 1 }} label='위도' type={'number'} size="small" ref={(el: HTMLDivElement) => (coordRef.current[0] = el)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lat') }}></TextField>
                <TextField value={coord.lng} error={coordError.lng} sx={{ flex: 1 }} label='경도' type={'number'} size="small" ref={(el: HTMLDivElement) => (coordRef.current[1] = el)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lng') }} ></TextField>
            </Content>
            <Content>
                <Button color='error' variant='outlined' onClick={handleDelete}>픽스점 삭제</Button>
                <Button color='error' onClick={closeScreen}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Content>
            <NavCloseButton contentSize={['NONE', 'MIN']} />

        </Container>

    )
}

export default FixPointEdit