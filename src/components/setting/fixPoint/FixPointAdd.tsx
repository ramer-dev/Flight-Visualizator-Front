import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { postFixPoint } from 'common/service/pointService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
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
import { useSetRecoilState } from 'recoil'

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



function FixPointAdd() {
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const [name, setName] = React.useState('');
    const [coord, setCoord] = React.useState<LatLngLiteral>({ lat: 0, lng: 0 })
    const [coordError, setCoordError] = React.useState({ lat: false, lng: false })
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
        closeModal()
    }

    const handleSubmit = () => {
        if (nameRef.current) {
            const body: FixPointDTO = {
                pointName: nameRef.current.value,
                pointCoordinate: { lat: coord.lat, lng: coord.lng }
            }

            try {
                if(body.pointName && body.pointCoordinate.lat && body.pointCoordinate.lng){
                    postFixPoint(body);
                    alertModal(openModal, '픽스점 추가 성공', `[ ${body.pointName} ]\n픽스점 추가에 성공하였습니다.`, closeScreen)    
                } else {
                    throw new Error('BAD REQUEST')
                }
            } catch (e) {
                alertModal(openModal, '픽스점 추가 실패', `픽스점 추가에 실패하였습니다.`, closeModal)
            }
        }
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
    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <ScreenTitle text={'픽스점 추가'} />
            <Content>
                <TextField label="픽스점 이름" size="small" fullWidth inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'name') }}></TextField>
            </Content>
            <Content>
                <TextField sx={{ flex: 1 }} error={coordError.lat} label='위도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lat') }}></TextField>
                <TextField sx={{ flex: 1 }} error={coordError.lng} label='경도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lng') }} ></TextField>
            </Content>
            <Content>
                <Button color='error' onClick={closeScreen}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Content>
            <NavCloseButton contentSize={['NONE', 'MIN']} />

        </Container>

    )
}

export default FixPointAdd