import styled from '@emotion/styled'
import { Autocomplete, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { postRoute } from 'common/service/fileService'
import { postFixPoint } from 'common/service/pointService'
import { deleteRouteData, patchRouteData, postRouteData } from 'common/service/routeService'
import { patchSectorData } from 'common/service/sectorService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import { RoutePointType } from 'common/type/RouteType'
import ErrorPage from 'components/common/ErrorPage'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetArea } from 'components/hooks/useArea'
import { useGetPoint } from 'components/hooks/useFixPoint'
import { FixPointAutoCompleteItemType, FixPointDTO } from 'dto/fixPointDTO'
import { RouteDTO, RoutePointDTO } from 'dto/routeDTO'
import { SectorDTO } from 'dto/sectorDTO'
import L from 'leaflet'
import { LatLngLiteral } from 'leaflet'
import { convertToWGS } from 'module/DMS'
import { validateCoordinates } from 'module/validationCoordinate'
import React from 'react'
import { useMap } from 'react-leaflet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import FixPointAutoComplete from '../fixPoint/FixPointAutoComplete'
import { SettingStateType } from '../SettingStateType'
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
  gap:15px;
  overflow-y:auto;
  height:calc(100vh - 240px);
  padding: 5px 0;
`

interface AreaLabelType {
    label: string,
    name: string,
    color?: string,
    id: number
}
const invalidValue: AreaLabelType = { label: 'undefined', name: 'Error', color: '#FFF', id: -1 };
export default function SectorEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const { data, refetch, isLoading, isError } = useGetArea();
    const options = data?.map(t => { return { label: `${t.areaName}`, name: t.areaName, color: t.areaColor, id: t.areaId } })
    const [name, setName] = React.useState('');
    const [area, setArea] = React.useState<AreaLabelType>(getAreaItem(settingState?.data.area))
    const [points, setPoints] = React.useState<LatLngLiteral[]>(settingState?.data.coords)
    const nameRef = React.useRef<HTMLInputElement>();
    const map = useMap();
    const polygonLayer = React.useRef<L.Polygon>();
    const closeScreen = () => {
        setContentView('NONE')
        setContent('NONE')
    }

    const handleSubmit = async () => {
        if (nameRef?.current?.value && points.length && area) {
            const body: SectorDTO = {
                sectorName: nameRef?.current?.value,
                sectorData: points,
                sectorAreaId: area.id
            }
            try {
                await patchSectorData(settingState.data.id, body);
                closeScreen()
            } catch (e: any) {
                console.error(e)
            }
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handlePointChange = (field: 'lat' | 'lng', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        // 2단 깊은 복사
        const updatedPoints = points.map(t => { return { ...t } });
        updatedPoints[index][field] = +e.target.value;
        setPoints(updatedPoints)
    }
    const addPoint = () => {
        setPoints([...points, { lat: 0, lng: 0 }])
    }

    const removePoint = (index: number) => {
        const updatedPoints = [...points];
        updatedPoints.splice(index, 1);
        setPoints(updatedPoints);
    }



    const handleDelete = async () => {
        try {
            await deleteRouteData(settingState.data.id);
            closeScreen()
        } catch (e) {
            console.error(e)
        }
    }

    function getAreaItem(id?: number) {
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

        if (points.length) {
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
            // closeScreen();
        }
    }, [settingState])

    return (
        <Container>
            <ScreenTitle text={'섹터 수정'} />
            <Content>
                <TextField label="섹터 이름" size="small" inputRef={nameRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleNameChange(e) }} />
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
                        <Button onClick={() => removePoint(i)}>삭제</Button>
                    </Content>
                )}

            </InputWrapper>
            <Content>
                <Button onClick={addPoint}>픽스점 추가</Button>

                <Button onClick={handleSubmit}>저장</Button>
                <Button color='error' onClick={closeScreen}>취소</Button>
                <Button color='error' variant="outlined" onClick={handleDelete}>섹터 삭제</Button>
            </Content>

        </Container>

    )
}