import { SiteType } from 'common/type/SiteType';
import { LatLngLiteral } from 'leaflet';
import { convertToWGS } from 'module/DMS';
import React, { useEffect, useState } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import siteIcon from 'atom/icon/ic_site.png'
import lowSiteIcon from 'atom/icon/ic_lowsite.png'
import vortacIcon from 'atom/icon/ic_vortac.png'
import { useSetRecoilState } from 'recoil';
import { siteState } from 'common/store/atom';
import { useGetSite } from 'components/hooks/useSite';

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
    const [site, setSite] = useState<SiteType[]>([])
    const siteSetter = useSetRecoilState(siteState);
    const { data } = useGetSite()

    useEffect(() => {
        setSite(data);
        siteSetter(data)
    }, [data, siteSetter, setSite])

    return (
        <>
            {site?.map(t => {
                const { lat, lng } = t.siteCoordinate as LatLngLiteral
                const icon = iconSelector(t.siteType)
                return <Marker key={t.siteId}
                    position={{ lat: convertToWGS(lat), lng: convertToWGS(lng) }} icon={icon} pane={t.siteType.toLowerCase()}>
                    <Tooltip >{t.siteName}</Tooltip>
                    <Popup closeButton={false}>{t.siteName}</Popup>
                </Marker>
            })}

        </>
    )
}

export default LoadSites