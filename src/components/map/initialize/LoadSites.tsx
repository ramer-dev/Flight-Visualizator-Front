import { Site } from 'common/type/SiteType';
import { LatLngLiteral } from 'leaflet';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useState } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import siteIcon from 'atom/icon/ic_site.png'
import lowSiteIcon from 'atom/icon/ic_lowsite.png'
import vortacIcon from 'atom/icon/ic_vortac.png'
import { useSetRecoilState } from 'recoil';
import { siteState } from 'common/store/atom';

const LoadEntireSite = async () => {
    try {
        const res = await CustomAxios.get<Site[]>('site');
        return res;
    } catch (e) {
        return {data:[]};
    }

}

const SiteIcon = L.icon({
    iconUrl: siteIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    tooltipAnchor: [12, 0],
})

const LowSiteIcon = L.icon({
    iconUrl: lowSiteIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    tooltipAnchor: [12, 0],
})

const VortacIcon = L.icon({
    iconUrl: vortacIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
    tooltipAnchor: [12, 0],
})

const iconSelector = (st: string) => {
    switch (st) {
        case 'SITE':
            return SiteIcon;
        case 'LOWSITE':
            return LowSiteIcon;
        case 'VORTAC':
            return VortacIcon;
    }
}
function LoadSites() {
    const [site, setSite] = useState<Site[]>([])
    const siteSetter = useSetRecoilState(siteState);
    const result = LoadEntireSite();
    useEffect(() => {
        result
            .then(t => { setSite(t.data); 
                siteSetter(t.data)
            })
            .catch(e => { setSite([]) })
    }, [])

    return (
        <>
            {site?.map(t => {
                const { lat, lng } = t.siteCoordinate as LatLngLiteral
                const icon = iconSelector(t.siteType)
                return <Marker key={t.siteId} position={{ lat: convertToWGS(lat), lng: convertToWGS(lng) }} pane='site'
                    icon={icon}>
                    <Tooltip pane='hover'>{t.siteName}</Tooltip>
                    <Popup pane='hover' closeButton={false}>{t.siteName}</Popup>
                </Marker>
            })}
        </>
    )
}

export default LoadSites