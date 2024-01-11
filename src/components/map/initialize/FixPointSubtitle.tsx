import L, { LatLngExpression } from 'leaflet'
import { LatLng } from 'lib/leaflet/leaflet-src'
import React from 'react'
import { Marker } from 'react-leaflet'
import {renderToString} from 'react-dom/server'
import styled from '@emotion/styled'

const Wrapper = styled.div`
    color:#0077ff;
`

function marker(name:string) {
    
    return renderToString(
        <div style={{color:'#0077ff', width:50, textAlign:'center' }}>{name}</div>
    )
}

const icon = (name:string) => L.divIcon({ html: marker(name), className:'subtitle', bgPos: [0, 0], iconAnchor:[25,-5]})

type Props = {
    name: string,
    position: LatLngExpression
}

function FixPointSubtitle({name, position}:Props) {
    return (
        <Marker icon={icon(name)} position={position} pane={'pointSubtitle'}/>
    )
}
export default FixPointSubtitle