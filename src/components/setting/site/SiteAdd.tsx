import styled from '@emotion/styled'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { postFixPoint } from 'common/service/pointService'
import { postSite } from 'common/service/siteService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { FixPointDTO } from 'dto/fixPointDTO'
import { SiteDTO } from 'dto/siteDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
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
    // const siteGroup = 
    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
    }

    const handleSubmit = () => {
        if (nameRef.current) {
            const body: SiteDTO = {
                siteName: nameRef.current.value,
                siteCoordinate: { lat: coord.lat, lng: coord.lng },
                siteType: siteType.value,
            }
            postSite(body);
            closeScreen()
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
            dotLayer.current = L.circleMarker([convertToWGS(coord.lat), convertToWGS(coord.lng)], { radius: 5, color: 'red', pane: 'setting' }).addTo(map);
        }

        setCoordError(error)

        return () => {
            if (dotLayer.current) {
                dotLayer.current.remove();
            }
        }
    }, [name, coord])

    return (
        <Container>
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
                    <TextField sx={{ flex: 1 }} label='위도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lat') }}></TextField>
                    <TextField sx={{ flex: 1 }} label='경도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lng') }} ></TextField>
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