import { RouteType } from 'common/type/RouteType';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet';

const LoadEntireRoute = async () => {
    try {
        const route = await CustomAxios.get<RouteType[]>('route');
        return route.data;
    } catch (e) {
        console.log('route load failed')
        return [];
    }
}

function LoadRoute() {
    const [route, setRoute] = React.useState<RouteType[]>([])
    const result = LoadEntireRoute();
    React.useEffect(() => {
        result.then(t => { setRoute(t) }).catch(e => console.error(e))
    }, [])
    return (
        <>
            {
                route.map(al => <Polyline positions={
                    al.routeData?.filter((t, i) => (
                        i <= al.routeData.length-1)).sort((a,b) => a.routeEntry > b.routeEntry ? -1 : 1).map(t => ({
                        lat: convertToWGS(t.routePointData.pointCoordinate.lat),
                        lng: convertToWGS(t.routePointData.pointCoordinate.lng)
                    }))} eventHandlers={{
                        mouseover: (e) => e.target.setStyle({ color: 'rgba(122,122,122,0.6)' }),
                        mouseout: (e) => e.target.setStyle({ color: 'rgba(122,122,122,1)' })
                    }}>
                        <Tooltip>{al.routeName}</Tooltip>
                    </Polyline>)
            }
        </>
    )
}

export default LoadRoute