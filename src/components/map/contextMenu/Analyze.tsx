import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { getNearBy } from 'common/service/mapService'
import { FlightResult } from 'common/type/FlightType'
import MarkingTooltip from 'components/marking/MarkingTooltip'
import L, { LatLngExpression, LatLngLiteral } from 'leaflet'
import divicon from 'module/NumberIcon'
import { FindMinimumScore } from 'module/ScoreCalculate'
import React from 'react'
import { useMap } from 'react-leaflet'

const Container = styled.div`
    padding:10px 5px;
    width:150px;
`

const InputWrapper = styled.div`
    display:flex;
    flex-direction: column;
`

interface Props {
    origin: LatLngExpression;
}



function Analyze({ origin }: Props) {
    const map = useMap();
    const [radius, setRadius] = React.useState<number>(0)
    const [nearBy, setNearBy] = React.useState<FlightResult[]>()
    const circle = React.useRef<L.Circle>()
    const layerGroupRef = React.useRef<L.LayerGroup>(L.layerGroup([]));
    React.useEffect(() => {
        drawCircle();
    }, [radius])

    React.useEffect(() => {
        drawMarker()
    }, [nearBy])

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadius(+e.target.value)
    }

    const handleSubmit = async () => {
        setNearBy(await getNearBy(origin as LatLngLiteral, radius))
        drawCircle()
        drawMarker()
    }

    const drawCircle = () => {
        if (circle.current) {
            circle.current.remove();
        }

        if (radius > 0) {
            circle.current = L.circle(origin, { radius: radius * 1000, pane:'analyze' }).addTo(map);
        }
    }

    const drawMarker = () => {
        if (layerGroupRef.current) {
            layerGroupRef.current.remove()
            const markers = nearBy?.map(t => L.marker(t.point!, { pane:'analyze', zIndexOffset:100, icon: divicon(FindMinimumScore(t.txmain, t.rxmain, t.txstby, t.rxstby)) }).bindTooltip(MarkingTooltip({site:t.siteName, distance: t.distance, angle: t.angle })))
            layerGroupRef.current = L.layerGroup(markers).addTo(map)
        }
    }
    return (
        <Container>
            <InputWrapper>
                <TextField onChange={handleRadiusChange} label='분석 반경(km)' type={'number'} size="small" />
                <Button onClick={handleSubmit}>분석</Button>
            </InputWrapper>
        </Container>
    )
}

export default Analyze