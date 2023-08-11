import { FixPointType } from 'common/type/FixPointType';
import { useGetPoint } from 'components/hooks/useFixPoint';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { CircleMarker, Popup, Tooltip } from 'react-leaflet';

function LoadFixPoint() {
    const [point, setPoint] = React.useState<FixPointType[]>([])
    const { data } = useGetPoint();

    React.useEffect(() => {
        setPoint(data)
    }, [data, setPoint])

    return (
        <>
            {point.map(t => {
                return (
                    <CircleMarker center={{ lat: convertToWGS(t.pointCoordinate.lat), lng: convertToWGS(t.pointCoordinate.lng) }} radius={4} key={t.id} pane="point">
                        <Tooltip>{t.pointName}</Tooltip>
                        <Popup closeButton={false}>{t.pointName}</Popup>
                    </CircleMarker>
                )
            })}
        </>
    )
}

export default LoadFixPoint