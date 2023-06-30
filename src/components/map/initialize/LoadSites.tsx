import { Site } from 'common/type/SiteType';
import { LatLngLiteral } from 'leaflet';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useRef, useState } from 'react'
import { LayerGroup, LayersControl, Marker, Pane, Popup, Rectangle, Tooltip } from 'react-leaflet';


const LoadEntireSite = async () => {
    return await CustomAxios.get<Site[]>('site');
}


function LoadSites() {
    const [site, setSite] = useState<Site[]>([])
    const result = LoadEntireSite();
    useEffect(() => {
        result.then(t => { setSite(t.data) }).catch(e => console.error(e))
    }, [])

    return (
        <>
            {site?.map(t => {
                const { lat, lng } = t.siteCoordinate as LatLngLiteral
                return <Marker key={t.siteId} position={{lat:convertToWGS(lat), lng:convertToWGS(lng)}} pane='site'>
                    <Tooltip>{t.siteName}</Tooltip>
                    <Popup closeButton={false}>{t.siteName}</Popup>
                </Marker>
            })}
        </>
    )
}

export default LoadSites