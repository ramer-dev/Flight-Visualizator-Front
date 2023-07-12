import { flightResultData } from 'common/store/atom';
import { FlightList } from 'common/type/FlightType';
import TableViewer from 'components/common/Not use/TableViewer'
import React from 'react'
import { useRecoilValueLoadable } from 'recoil';
import NavCloseButton from '../navbar/NavCloseButton'

function FlightEdit() {
    const flightData = useRecoilValueLoadable<FlightList>(flightResultData);
    let data = null;
    let error = null;
    switch (flightData.state) {
        case 'hasValue':
            data = flightData.contents;
            break;
        case 'hasError':
            break;
        case 'loading':

    }
    return (
        <>
            <div>FlightEdit</div>
            <NavCloseButton format={['MID', 'FULLSCREEN']} />
            {/* <TableViewer data={data?.data} isEditor /> */}
        </>
    )
}

export default FlightEdit