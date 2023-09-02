import { RouteType } from 'common/type/RouteType';
import { useGetRoute } from 'components/hooks/useRoute';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { Polyline, Tooltip } from 'react-leaflet';

function LoadRoute() {
    const { data, isLoading, isError } = useGetRoute();
    const [route, setRoute] = React.useState<RouteType[]>([])

    React.useEffect(() => {
        if(!(isError || isLoading )) setRoute(data)

    }, [data, isError])

    return (
        <>
            {
                route.map(route => <Polyline key={route.routeId}
                    positions={route.routeData
                        ?.filter((t, i) => (i <= route.routeData.length - 1))
                        .sort((a, b) => a.routeEntry > b.routeEntry ? -1 : 1)
                        .map(point => {
                            if(!point?.routePointData?.pointCoordinate) return {lat:0, lng:0};
                            return {lat: convertToWGS(point.routePointData.pointCoordinate.lat),
                            lng: convertToWGS(point.routePointData.pointCoordinate.lng)}
                        })}
                    eventHandlers={{
                        mouseover: (e) => e.target.setStyle({ color: 'rgba(122,122,122,0.6)' }),
                        mouseout: (e) => e.target.setStyle({ color: 'rgba(122,122,122,1)' })
                    }} pane="route">
                    <Tooltip sticky>{route.routeName}</Tooltip>
                </Polyline>)
            }
        </>
    )
}

export default LoadRoute