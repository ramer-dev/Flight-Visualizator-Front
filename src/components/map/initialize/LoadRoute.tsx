import { RouteType } from 'common/type/RouteType';
import { useGetRoute } from 'components/hooks/useRoute';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet';

function LoadRoute() {
    const [route, setRoute] = React.useState<RouteType[]>([])
    const { data } = useGetRoute();

    React.useEffect(() => {
        setRoute(data)
    }, [data, setRoute])

    return (
        <>
            {
                route.map(al => <Polyline key={al.routeId} color='rgba(122,122,122,0.6)' positions={
                    al.routeData?.filter((t, i) => (
                        i <= al.routeData.length - 1)).sort((a, b) => a.routeEntry > b.routeEntry ? -1 : 1).map(t => ({
                            lat: convertToWGS(t.routePointData.pointCoordinate.lat),
                            lng: convertToWGS(t.routePointData.pointCoordinate.lng)
                        }))} eventHandlers={{
                            mouseover: (e) => e.target.setStyle({ color: 'rgba(122,122,122,0.6)' }),
                            mouseout: (e) => e.target.setStyle({ color: 'rgba(122,122,122,1)' })
                        }} pane="route">
                    <Tooltip>{al.routeName}</Tooltip>
                </Polyline>)
            }
        </>
    )
}

export default LoadRoute