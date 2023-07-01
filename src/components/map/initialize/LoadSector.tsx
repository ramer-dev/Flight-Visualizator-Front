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

const DashedSector = (st : string) => {
    if (st === '제주중부') return '10, 10';
    return undefined;
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
                const dashedStroke = DashedSector(t.sectorName)
                return <Polygon key={t.id} dashArray={dashedStroke} positions={coords.map(t => { return { lat: convertToWGS(t.lat), lng: convertToWGS(t.lng) } })} pane='sector'
                    fillOpacity={0.4}
                    eventHandlers={{
                        mouseover: (e) => e.target.setStyle({ color: 'rgba(122,122,122,0.6)' }),
                        mouseout: (e) => e.target.setStyle({ color: 'rgba(122,122,122,1)' })
                    }}>
                    <Tooltip pane='hover'>{t.sectorName}</Tooltip>
                    <Popup closeButton={false} pane='hover'>{t.sectorName}</Popup>
                </Polygon>
            })}
        </>
    )
}

export default LoadSector