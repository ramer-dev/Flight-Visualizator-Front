import { FixPointType } from 'common/type/FixPointType';
import { useGetPoint } from 'components/hooks/useFixPoint';
import L from 'leaflet';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import FixPointSubtitle from './FixPointSubtitle';

function LoadFixPoint() {
    const [point, setPoint] = React.useState<FixPointType[]>([])
    const { data, isError, isLoading } = useGetPoint();
    const map = useMap()
    React.useEffect(() => {
        if (!(isError || isLoading)) setPoint(data)
    }, [data, isError])

    return (
        <>
            {point.map(t => {
                const coordinate = {lat: convertToWGS(t.pointCoordinate.lat), lng: convertToWGS(t.pointCoordinate.lng) }
                return (
                    <CircleMarker center={coordinate} radius={4} key={t.id} pane="point">
                        <Tooltip>{t.pointName}</Tooltip>
                        <Popup closeButton={false}>{t.pointName}</Popup>
                        <FixPointSubtitle name={t.pointName} position={coordinate}/>
                    </CircleMarker>
                )
            })}
        </>
    )
}

export default LoadFixPoint