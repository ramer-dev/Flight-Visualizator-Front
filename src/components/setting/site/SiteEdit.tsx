import styled from '@emotion/styled'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { deleteSite, patchSite } from 'common/service/siteService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
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

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
`

const options = [{ label: '표지소', value: 'SITE' }, { label: '저고도', value: 'LOWSITE' }, { label: 'VORTAC', value: 'VORTAC' }]

function SiteEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const [name, setName] = React.useState('');
    const [, setSiteMenuOpen] = React.useState(false);
    const [, setSite] = React.useState('')
    const [siteType, setSiteType] = React.useState(options[0])
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
        closeModal()
    }

    const handleSubmit = async () => {
        if (nameRef.current) {
            const body: SiteDTO = {
                siteName: nameRef.current.value,
                siteCoordinate: { lat: coord.lat, lng: coord.lng },
                siteType: siteType.value
            }
            try {
                if (body.siteName && body.siteType && body.siteCoordinate.lat && body.siteCoordinate.lng) {
                    await patchSite(body, settingState.data.id);
                    alertModal(openModal, '표지소 수정 성공', `[ ${body.siteName} ]\n표지소 수정에 성공하였습니다.`, closeScreen)
                } else {
                    throw new Error('BAD REQUEST');
                }
            } catch (e) {
                alertModal(openModal, '표지소 수정 실패', `표지소 수정에 실패하였습니다.`, closeModal)
            }
        }
    }

    const handleDelete = async () => {
        try {
            await deleteSite(settingState.data.id);
            alertModal(openModal, '표지소 삭제 성공', `표지소 삭제에 성공하였습니다.`, closeScreen)
        } catch (e) {
            alertModal(openModal, '표지소 삭제 실패', `표지소 삭제에 실패하였습니다.`, closeModal)
        }
    }

    const handleSiteTypeChange = (e: any, a: any) => {
        setSiteType(a)
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
            dotLayer.current = L.circleMarker([convertToWGS(coord.lat), convertToWGS(coord.lng)], { radius: 15, color: 'red', }).addTo(map);
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
            setSiteType(options.filter(t => t.value === settingState.data.siteType)[0])

        } else {
            closeScreen();
        }
    }, [settingState])

    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <ScreenTitle text={'표지소 수정'} />
            <Wrapper>
                <Content>
                    <TextField label="표지소 이름" size="small" inputRef={nameRef} sx={{ flex: 1 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'name') }}></TextField>
                    <Autocomplete options={options} value={siteType} onChange={handleSiteTypeChange}
                        sx={{ flex: 1 }} isOptionEqualToValue={(option, value) => option.label === value.label}
                        renderOption={(props, option) => {
                            return <>
                                {
                                    <Box component='li' key={option.label} {...props} value={`${option.label}`}>
                                        {option.label}
                                    </Box>
                                }
                            </>
                        }}
                        renderInput={(params) => <TextField {...params} label='표지소 타입' inputProps={{
                            ...params.inputProps,
                        }} />
                        }
                        size='small'
                        fullWidth />
                </Content>
                <Content>
                    <TextField value={coord.lat} sx={{ flex: 1 }} error={coordError.lat} label='위도' type={'number'} size="small" ref={(el: HTMLDivElement) => (coordRef.current[0] = el)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lat') }}></TextField>
                    <TextField value={coord.lng} sx={{ flex: 1 }} error={coordError.lng} label='경도' type={'number'} size="small" ref={(el: HTMLDivElement) => (coordRef.current[1] = el)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lng') }} ></TextField>
                </Content>
                <Content>
                    <Button color='error' variant='outlined' onClick={handleDelete}>표지소 삭제</Button>
                    <Button color='error' onClick={closeScreen}>취소</Button>
                    <Button onClick={handleSubmit}>확인</Button>
                </Content>
            </Wrapper>
            <NavCloseButton contentSize={['NONE', 'MIN']} />
        </Container>

    )
}

export default SiteEdit