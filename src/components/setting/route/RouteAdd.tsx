import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { postRoute } from 'common/service/fileService'
import { postFixPoint } from 'common/service/pointService'
import { postRouteData } from 'common/service/routeService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetPoint } from 'components/hooks/useFixPoint'
import { FixPointAutoCompleteItemType, FixPointDTO } from 'dto/fixPointDTO'
import { RouteDTO, RoutePointDTO } from 'dto/routeDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
import { validateCoordinates } from 'module/validationCoordinate'
import React from 'react'
import { useMap } from 'react-leaflet'
import { useSetRecoilState } from 'recoil'
import FixPointAutoComplete from '../fixPoint/FixPointAutoComplete'
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

const InputWrapper = styled.div`
  display:flex;
  flex-direction:column;
    
`



function RouteAdd() {
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const { data, refetch, isLoading, isError } = useGetPoint();
    const options = data.map(t => { return { label: `${t.pointName}`, coord: t.pointCoordinate, id: t.id } })
    const [name, setName] = React.useState('');
    const [points, setPoints] = React.useState<FixPointAutoCompleteItemType[]>([])
    const nameRef = React.useRef<HTMLInputElement>();
    const map = useMap();
    const polyLineLayer = React.useRef<L.Polyline>();

    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
    }

    const handleSubmit = async () => {
        if (nameRef?.current?.value && points.length) {
            const body: RouteDTO = {
                routeName: nameRef.current.value,
                routeData: points.map(t => { return { routeName: t.label }})
            }
            try {
            await postRouteData(body);
            closeScreen()
            } catch(e : any) {
                console.error(e)
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
        setPoints([...points, { label: '', id: points.length, coord: { lat: 0, lng: 0 } }])
    }

    const removePoint = (index: number) => {
        const updatedPoints = [...points];
        updatedPoints.splice(index, 1);
        setPoints(updatedPoints);
    }


    React.useEffect(() => {
        if (polyLineLayer.current) {
            polyLineLayer.current.remove();
        }
        // const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (points.length) {
            polyLineLayer.current = L.polyline(points.map(t => [convertToWGS(t?.coord.lat), convertToWGS(t?.coord.lng)]), { pane: 'setting', color: 'red' }).addTo(map);
        }

        // setCoordError(error)

        return () => {
            if (polyLineLayer.current) {
                polyLineLayer.current.remove();
            }
        }
    }, [name, points])
    return (
        <Container>
            <ScreenTitle text={'항로 추가'} />
            <Content>
                <TextField label="항로 이름" size="small" inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleNameChange(e) }} />
            </Content>
            <InputWrapper>

                {points.map((t, i) =>
                    <Content key={t?.label ? `${t.id}-${i}-${t.label}` : null}>
                        <FixPointAutoComplete options={options} isLoading={isLoading} isError={isError} value={t}
                            changeData={(e: FixPointAutoCompleteItemType) => handlePointChange(i, e)} />
                        <Button onClick={() => removePoint(i)}>삭제</Button>
                    </Content>
                )}
                <Button onClick={addPoint}>픽스점 추가</Button>



            </InputWrapper>
            <Content>
                <Button onClick={handleSubmit}>확인</Button>
                <Button color='error' onClick={closeScreen}>취소</Button>
            </Content>

        </Container>

    )
}

export default RouteAdd