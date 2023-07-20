import L from 'leaflet'
import { LatLngExpression } from 'leaflet'
import React from 'react'
import { renderToString } from 'react-dom/server'
interface Props {
    index: number
}

export const divicon = (point: LatLngExpression, index: number) => { return L.divIcon({ html: renderToString(<NumberIcon index={1} />) }) }


function NumberIcon({ index }: Props) {
    return (
        <div>NumberIcon</div>
    )
}

export default divicon