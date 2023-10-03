import styled from '@emotion/styled'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { postSite } from 'common/service/siteService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
import CustomModal from 'components/common/CustomModal'
import ScreenTitle from 'components/common/ScreenTitle'
import useModal from 'components/hooks/useModal'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { SiteDTO } from 'dto/siteDTO'
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

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
`
const options = [{ label: '표지소', value: 'SITE' }, { label: '저고도', value: 'LOWSITE' }, { label: 'VORTAC', value: 'VORTAC' }]

function SiteAdd() {
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const [name, setName] = React.useState('');
    const [coord, setCoord] = React.useState<LatLngLiteral>({ lat: 0, lng: 0 })
    const [coordError, setCoordError] = React.useState({ lat: false, lng: false })
    const [siteType, setSiteType] = React.useState(options[0])
    const nameRef = React.useRef<HTMLInputElement>();
    const map = useMap();
    const dotLayer = React.useRef<L.CircleMarker>();
    const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
    const { isModalOpen, openModal, closeModal } = useModal()
  
    function alertModal(open: () => void, title: string, message: string, close?: () => void) {
      setModalContext({ title, message, close })
      open()
    }
    // const siteGroup = 
    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
        closeModal()
    }

    const handleSubmit = () => {
        if (nameRef.current) {
            const body: SiteDTO = {
                siteName: nameRef.current.value,
                siteCoordinate: { lat: coord.lat, lng: coord.lng },
                siteType: siteType.value,
            }
            try {
                if(body.siteName && body.siteType && body.siteCoordinate.lat && body.siteCoordinate.lng) {
                    postSite(body)
                    alertModal(openModal, '표지소 추가 성공', `[ ${body.siteName} ]\n표지소 추가에 성공하였습니다.`, closeScreen)
                } else {
                    throw new Error('BAD REQUEST')
                }
            } catch (e) {
                alertModal(openModal, '표지소 추가 실패', `표지소 추가에 실패하였습니다.`, closeModal)
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

    const handleSiteTypeChange = (e: any, a: any) => {
        setSiteType(a)
    }

    React.useEffect(() => {
        if (dotLayer.current) {
            dotLayer.current.remove();
        }
        const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (coord.lat && coord.lng && error.lat && error.lng) {
            dotLayer.current = L.circleMarker([convertToWGS(coord.lat), convertToWGS(coord.lng)], { radius: 15, color: 'red', }).addTo(map);
        }
        setCoordError({lat:!error.lat, lng:!error.lng})

        return () => {
            if (dotLayer.current) {
                dotLayer.current.remove();
            }
        }
    }, [name, coord])

    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={closeModal} />
            </Portal>
            <ScreenTitle text={'표지소 추가'} />
            <Wrapper>
                <Content>
                    <TextField sx={{ flex: 1 }} label="표지소 이름" size="small" inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'name') }} />
                    <Autocomplete sx={{ flex: 1 }} options={options}
                        isOptionEqualToValue={(option, value) => option.label === value.label}
                        value={siteType} onChange={handleSiteTypeChange}
                        renderOption={(props, option) => {
                            return <>
                                {
                                    <Box component='li' key={option.label} {...props} value={`${option.label}`}>
                                        {option.label}
                                    </Box>
                                }
                            </>
                        }}
                        renderInput={(params) => <TextField {...params} label="표지소 타입" inputProps={{
                            ...params.inputProps,
                        }} />
                        }
                        size='small'
                        fullWidth />
                </Content>
                <Content>
                    <TextField sx={{ flex: 1 }} label='위도' type={'number'}  error={coordError.lat} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lat') }}></TextField>
                    <TextField sx={{ flex: 1 }} label='경도' type={'number'}  error={coordError.lng} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lng') }} ></TextField>
                </Content>
                <Content>
                    <Button color='error' onClick={closeScreen}>취소</Button>
                    <Button onClick={handleSubmit}>확인</Button>
                </Content>
            </Wrapper>
            <NavCloseButton contentSize={['NONE', 'MIN']} />
        </Container>

    )
}

export default SiteAdd