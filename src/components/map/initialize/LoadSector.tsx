import { Sector } from 'common/type/SectorType';
import { LatLngLiteral } from 'leaflet';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useState } from 'react'
import { Pane, Polygon, Popup, Tooltip } from 'react-leaflet';


const LoadEntireSector = async () => {
    try {
        const sector = await CustomAxios.get<Sector[]>('sector');
        return sector.data;
    } catch (e) {
        console.log('sector load failed')
        return [];
    }
}

const DashedSector = (st: string) => {
    if (st === '제주중부') return '10, 10';
    return undefined;
}

function LoadSector() {
    const [sector, setSector] = useState<Sector[]>([])
    const result = LoadEntireSector();
    useEffect(() => {
        result.then(t => { setSector(t) }).catch(e => console.error(e))
    }, [])

    return (
        <>
            {sector?.map(t => {
                const coords = t.sectorData as LatLngLiteral[]
                const dashedStroke = DashedSector(t.sectorName)
                return <Polygon key={t.id} dashArray={dashedStroke} positions={coords.map(t => { return { lat: convertToWGS(t.lat), lng: convertToWGS(t.lng) } })}
                    fillOpacity={0.4}
                    eventHandlers={{
                        mouseover: (e) => e.target.setStyle({ color: 'rgba(122,122,122,1)' }),
                        mouseout: (e) => e.target.setStyle({ color: 'rgba(122,122,122,0.5)' })
                    }} pane="sector">
                    <Tooltip>{t.sectorName}</Tooltip>
                    <Popup closeButton={false} >{t.sectorName}</Popup>
                </Polygon>
            })}
            </>
    )
}

export default LoadSector