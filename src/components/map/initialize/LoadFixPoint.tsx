import { FixPointType } from 'common/type/FixPointType';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { CircleMarker, Pane, Popup, Tooltip, useMap } from 'react-leaflet';

const LoadEntireSector = async () => {
    try {
        const point = await CustomAxios.get<FixPointType[]>('point');
        return point.data;
    } catch (e) {
        console.log('point load failed')
        return [];
    }
}

function LoadFixPoint() {
    const [point, setPoint] = React.useState<FixPointType[]>([])
    const result = LoadEntireSector();
    React.useEffect(() => {
        result.then(t => { setPoint(t) }).catch(e => console.error(e))
    }, [])


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