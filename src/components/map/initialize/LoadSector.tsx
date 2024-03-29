import { SectorType } from 'common/type/SectorType';
import { useGetSector } from 'components/hooks/useSector';
import { LatLngLiteral } from 'leaflet';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useState } from 'react'
import { Polygon, Popup, Tooltip } from 'react-leaflet';

const DashedSector = (st: string) => {
    if (st === '제주중부') return '10, 10';
    return undefined;
}

function LoadSector() {
    const [sector, setSector] = useState<SectorType[]>([])
    const { data, isError, isLoading } = useGetSector();
    
    useEffect(() => {
        if(!(isError || isLoading )) setSector(data)

    }, [data, setSector])

    return (
        <>
            {sector?.map(t => {
                const coords = t.sectorData as LatLngLiteral[]
                const dashedStroke = DashedSector(t.sectorName)
                return <Polygon key={t.id} dashArray={dashedStroke} positions={coords.map(t => { return { lat: convertToWGS(t.lat), lng: convertToWGS(t.lng) } })}
                    fillOpacity={0.1}
                    opacity={.5}
                    color={t.sectorArea?.areaColor}
                    eventHandlers={{
                        mouseover: (e) => e.target.setStyle({ opacity: '1', fillOpacity: '.3' }),
                        mouseout: (e) => e.target.setStyle({ opacity: '.5', fillOpacity: '.1' })
                    }} pane="sector">
                    <Tooltip sticky>{t.sectorName}</Tooltip>
                </Polygon>
            })}
        </>
    )
}

export default LoadSector