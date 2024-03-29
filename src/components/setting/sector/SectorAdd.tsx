import styled from '@emotion/styled'
import { Autocomplete, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { postSectorData } from 'common/service/sectorService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
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

export default function SectorAdd() {
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    const { data, refetch, isLoading, isError } = useGetArea();
    const options = data.map(t => { return { label: `${t.areaName}`, name: t.areaName, color: t.areaColor, id: t.areaId } })
    const [name, setName] = React.useState('');
    const [area, setArea] = React.useState<AreaLabelType | null>(null)
    const [points, setPoints] = React.useState<LatLngLiteral[]>([])
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
        if (name && points.length && area) {
            const body: SectorDTO = {
                sectorName: name,
                sectorData: points,
                sectorAreaId: area.id
            }
            try {
                if(body.sectorName && body.sectorData.every(t => t.lat && t.lng)) {
                await postSectorData(body);
                alertModal(openModal, '섹터 추가 성공', `[ ${body.sectorName} ]\n섹터 추가에 성공하였습니다.`, closeScreen)
                } else {
                    throw new Error('BAD REQUEST')
                }
            } catch (e: any) {
                alertModal(openModal, '섹터 추가 실패', `섹터 추가에 실패하였습니다.`, closeModal)
            }
        }
    }

    const handlePointChange = (field: 'lat' | 'lng', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPoints = [...points];
        updatedPoints[index][field] = +e.target.value;
        setPoints(updatedPoints)
    }

    const addPoint = () => {
        setPoints([...points, { lat: 0, lng: 0 }/*{ label: '', id: points.length, coord: { lat: 0, lng: 0 } }*/])
    }

    const removePoint = (index: number) => {
        const updatedPoints = [...points];
        updatedPoints.splice(index, 1);
        setPoints(updatedPoints);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleAreaChange = (e: React.ChangeEvent<any>) => {
        setArea(e.target.value);
    }

    React.useEffect(() => {
        if (polygonLayer.current) {
            polygonLayer.current.remove();
        }
        // const error = { lat: validateCoordinates(coord.lat.toString()), lng: validateCoordinates(coord.lng.toString()) }

        if (points.length) {
            polygonLayer.current = L.polygon(points.map(t => [convertToWGS(t.lat), convertToWGS(t.lng)]), { pane: 'setting', color: 'red' }).addTo(map);
        }

        // setCoordError(error)

        return () => {
            if (polygonLayer.current) {
                polygonLayer.current.remove();
            }
        }
    }, [name, points])
    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <ScreenTitle text={'섹터 추가'} />
            <Content>
                <TextField sx={{ flex: 1 }} label="섹터 이름" size="small" inputRef={nameRef} onChange={handleNameChange} />
                <Autocomplete sx={{ flex: 1 }} options={options} onChange={(event: any, value: any) => { setArea(value) }} value={area}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
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

                {points.map((t, i) =>
                    <Content key={`${name}-${i}`}>
                        <TextField key={`${name} lat ${i}`} sx={{ flex: 1 }} label='위도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlePointChange('lat', i, e) }}></TextField>
                        <TextField key={`${name} lng ${i}`} sx={{ flex: 1 }} label='경도' type={'number'} size="small" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlePointChange('lng', i, e) }} ></TextField>
                        <Button color='error' onClick={() => removePoint(i)}>삭제</Button>
                    </Content>
                )}
                <Button onClick={addPoint}>지점 추가</Button>
            </InputWrapper>
            <Content>
                <Button color='error' onClick={closeScreen}>취소</Button>
                <Button onClick={handleSubmit}>확인</Button>
            </Content>

            <NavCloseButton contentSize={['NONE', 'MIN']} />
        </Container>

    )
}
