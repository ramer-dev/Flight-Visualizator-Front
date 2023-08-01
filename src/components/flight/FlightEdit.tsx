import { flightResultData } from 'common/store/atom';
import { FlightList } from 'common/type/FlightType';
import CustomTable from 'components/common/dataGrid/CustomTable';
import LoadingPage from 'components/common/LoadingPage';
import TableViewer from 'components/common/Not use/TableViewer'
import ScreenTitle from 'components/common/ScreenTitle';
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
            <ScreenTitle text={"비행검사 수정"} />
            {/* {<TableViewer data={data} />} */}
            {data ? <CustomTable data={data} edit/> : <LoadingPage />}

            <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
        </>
    )
}

export default FlightEdit