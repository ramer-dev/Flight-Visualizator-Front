import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { postFixPoint } from 'common/service/pointService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { FixPointDTO } from 'dto/fixPointDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
import { validateCoordinates } from 'module/validationCoordinate'
import React from 'react'
import { useMap } from 'react-leaflet'
import { useSetRecoilState } from 'recoil'
interface StyledProp {
    color: string,
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
`

const Content = styled.div`
  display:flex;
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

    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
    }

    const handleSubmit = () => {
        if (nameRef.current) {
            const body: FixPointDTO = {
                pointName: nameRef.current.value,
                pointCoordinate: { lat: coord.lat, lng: coord.lng }
            }
            postFixPoint(body);
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


    React.useEffect(() => {
        console.log(name, coord, coordError)
        if (dotLayer.current) {
            dotLayer.current.remove();
        }
        const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (coord.lat && coord.lng && error.lat && error.lng) {
            dotLayer.current = L.circleMarker([convertToWGS(coord.lat), convertToWGS(coord.lng)], { radius: 4, color: 'red' }).addTo(map);
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
            <ScreenTitle text={'픽스점 추가'} />
            <Content>
                <TextField label="픽스점 이름" size="small" inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'name') }}></TextField>
            </Content>
            <Content>
                <TextField sx={{ flex: 1 }} label='위도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lat') }}></TextField>
                <TextField sx={{ flex: 1 }} label='경도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleCoordChange(e, 'lng') }} ></TextField>
            </Content>
            <Content>
                <Button onClick={handleSubmit}>확인</Button>
                <Button color='error' onClick={closeScreen}>취소</Button>
            </Content>

        </Container>

    )
}

export default FixPointAdd