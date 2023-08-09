import { getFlightData } from 'common/service/flightService';
import { flightResultData, flightResultDataID } from 'common/store/atom';
import { FlightList } from 'common/type/FlightType';
import CustomTable from 'components/common/dataGrid/CustomTable';
import LoadingPage from 'components/common/LoadingPage';
import ScreenTitle from 'components/common/ScreenTitle';
import { useFlightData } from 'components/hooks/useFlightData';
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import NavCloseButton from '../navbar/NavCloseButton'

function FlightEdit() {
    // const flightData = useRecoilValueLoadable<FlightList>(flightResultData);
    const id = useRecoilValue(flightResultDataID)
    let { data = undefined, isLoading, isError, refetch } = useFlightData(id);
    useEffect(() => {
        refetch()
    }, [id])

    return (
        <>
            <ScreenTitle text={"비행검사 수정"} />
            {/* {<TableViewer data={data} />} */}
            <CustomTable data={data} edit isLoading={isLoading} />

            <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
        </>
    )
}

export default FlightEdit