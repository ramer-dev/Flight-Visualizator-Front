import styled from '@emotion/styled'
import L from 'leaflet'
import { ControlOptions } from 'leaflet'
import React, { useEffect, useRef } from 'react'
import { green, red, orange, blue, pink, grey } from '@mui/material/colors'
import LayersIcon from '@mui/icons-material/Layers';
import PolylineIcon from '@mui/icons-material/Timeline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useMap } from 'react-leaflet'

// const POSITION_CLASSES = {
//   bottomleft: 'leaflet-bottom leaflet-left',
//   bottomright: 'leaflet-right leaflet-bottom',
//   topleft: 'leaflet-top leaflet-left',
//   topright: 'leaflet-top leaflet-right'
// }

const Container = styled.div`
  position:absolute;
  top:15px;
  right:55px;
  font-family:'Pretendard';
  user-select:none;
`

const Wrapper = styled.div`
  background-color:#fff;
  /* margin:10px 55px; */
  display: flex;
  flex-direction:column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.25);
  & > div:first-of-type {
      border-radius: 5px 5px 0 0;
  }
  & > div:last-of-type {
    border-radius: 0 0 5px 5px ;
  }
`
const Item = styled.div`
display: flex;
width:90px;
padding: 14px;
justify-content: space-between;
align-items: center;
cursor:pointer;
gap:5px;
transition:0.1s ease all;
&:hover {
  background-color:rgba(80,150,255,.5);
}
`

const Text = styled.h3`
  font-weight:400;
`

interface LayerControlType {
  site: boolean,
  lowsite: boolean,
  vortac: boolean,
  sector: boolean,
  route: boolean,
  point: boolean,
  marking: boolean,
  pin: boolean,
  analyze: boolean,
}

const Cover = styled.div`
  text-align:center;
  line-height:48px;
  width:48px;
  height:48px;
  background-color:white;
  border-radius: 5px;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.25);
`

const EmptyStyle = { color: grey[200], stroke: grey[400] }

function CustomLayerControl({ position }: ControlOptions) {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false)
  const [layers, setLayers] = React.useState<{ [key in keyof LayerControlType]: boolean }>({
    site: true,
    lowsite: true,
    vortac: true,
    sector: true,
    route: true,
    point: true,
    marking: true,
    pin:true,
    analyze:true,
  })

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, [isOpen])

  const handlerButtonClick = (e: React.MouseEvent, it: keyof LayerControlType) => {
    const newLayer: LayerControlType = { ...layers };

    newLayer[it] = !layers[it];
    setLayers(newLayer);
  }

  useEffect(() => {
    Object.keys(layers).forEach((t) => {
      const k = t as keyof LayerControlType
      const pane = map.getPane(t);
      if (pane) {
        if (layers[k]) {
          pane.style.display = ''
        } else {
          pane.style.display = 'none'
        }
      }
    })
  }, [layers, map])

  // const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
  return (
    <Container className={"leaflet-control"}>
      {
        isOpen ? 
        <Wrapper ref={containerRef} onMouseLeave={() =>{setIsOpen(false)}}>
        <Item onClick={(e) => { handlerButtonClick(e, 'site') }}><LayersIcon sx={layers.site ? { color: red[500] } : EmptyStyle} /><Text>표지소</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'lowsite') }}><LayersIcon sx={layers.lowsite ? { color: green[500] } : EmptyStyle} /><Text>저고도</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'vortac') }}><LayersIcon sx={layers.vortac ? { color: blue[300] } : EmptyStyle} /><Text>VORTAC</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'sector') }}><LayersIcon sx={layers.sector ? { color: orange[500] } : EmptyStyle} /><Text>섹터</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'route') }}><PolylineIcon sx={layers.route ? { color: pink[400] } : EmptyStyle} /><Text>항로</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'point') }}><RadioButtonCheckedIcon sx={layers.point ? { color: blue[600] } : EmptyStyle} /><Text>포인트</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'pin') }}><RadioButtonCheckedIcon sx={layers.pin ? { color: blue[600] } : EmptyStyle} /><Text>비행검사</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'marking') }}><RadioButtonCheckedIcon sx={layers.marking ? { color: blue[600] } : EmptyStyle} /><Text>마킹</Text></Item>
        <Item onClick={(e) => { handlerButtonClick(e, 'analyze') }}><RadioButtonCheckedIcon sx={layers.marking ? { color: blue[600] } : EmptyStyle} /><Text>주변분석</Text></Item>

      </Wrapper>
      : <Cover onMouseEnter={() => {setIsOpen(true)}}>
        <LayersIcon sx={{...EmptyStyle, width:38, height:38, margin:'5px'}} fontSize="large"/>
      </Cover>
      }
      
    </Container>
  )
}

export default CustomLayerControl