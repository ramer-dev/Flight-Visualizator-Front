import { Sector } from 'common/type/SectorType';
import { Site } from 'common/type/SiteType';
import { LatLngLiteral } from 'leaflet';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useRef, useState } from 'react'
import { LayerGroup, LayersControl, Marker, Pane, Polygon, Popup, Rectangle, Tooltip } from 'react-leaflet';


const LoadEntireSector = async () => {
    return await CustomAxios.get<Sector[]>('sector');
}


function LoadSector() {
    const [site, setSite] = useState<Sector[]>([])
    const result = LoadEntireSector();
    useEffect(() => {
        result.then(t => { setSite(t.data) }).catch(e => console.error(e))
    }, [])

    return (
        <>
            {site?.map(t => {
                const coords = t.sectorData as LatLngLiteral[]

                return <Polygon key={t.id} positions={coords.map(t => { return { lat: convertToWGS(t.lat), lng: convertToWGS(t.lng) } })} pane='sector'>
                    <Tooltip>{t.sectorName}</Tooltip>
                    <Popup closeButton={false}>{t.sectorName}</Popup>
                </Polygon>
            })}
        </>
    )
}

export default LoadSector