import { FixPointType } from 'common/type/FixPointType';
import CustomAxios from 'module/axios';
import { convertToWGS } from 'module/DMS';
import React from 'react'
import { CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';

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
                    <CircleMarker center={{ lat: convertToWGS(t.pointCoordinate.lat), lng: convertToWGS(t.pointCoordinate.lng) }} radius={5} key={t.id}>
                        <Tooltip pane='hover'>{t.pointName}</Tooltip>
                        <Popup closeButton={false} pane='hover'>{t.pointName}</Popup>
                    </CircleMarker>
                )
            })}
        </>
    )
}

export default LoadFixPoint