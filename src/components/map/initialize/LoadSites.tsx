import { Site } from 'common/type/SiteType';
import { LatLngLiteral } from 'leaflet';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useRef, useState } from 'react'
import { LayerGroup, LayersControl, Marker, Pane, Rectangle, Tooltip } from 'react-leaflet';


const LoadEntireSite = async () => {
    return await CustomAxios.get<Site[]>('site');
}


function LoadSites() {
    const [site, setSite] = useState<Site[]>([])
    const result = LoadEntireSite();
    useEffect(() => {
        result.then(t => { setSite(t.data) }).catch(e => console.error(e))
    }, [])


    useEffect(() => {
        console.log(site)
        if (site?.length) {
            site.map(t => {
                const { lat, lng } = t.siteCoordinate as LatLngLiteral
            })
        }
    }, [site])
    return (
        <>
            {site?.map(t => {
                const { lat, lng } = t.siteCoordinate as LatLngLiteral
                console.log(t.siteName, lat,lng, '|', convertToWGS(lat), convertToWGS(lng) )
                return <Marker key={t.siteId} position={{lat:convertToWGS(lat), lng:convertToWGS(lng)}} pane='site'>
                    <Tooltip>{t.siteName}</Tooltip>
                </Marker>
            })}
        </>
    )
}

export default LoadSites