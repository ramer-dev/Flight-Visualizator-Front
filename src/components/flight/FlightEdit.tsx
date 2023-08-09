import CustomTable from 'components/common/dataGrid/CustomTable';
import ScreenTitle from 'components/common/ScreenTitle';
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightEdit() {
    // const flightData = useRecoilValueLoadable<FlightList>(flightResultData);
    // const id = useRecoilValue(flightResultDataID)
    // let { data = undefined, isLoading, isError, refetch } = useFlightData(id);
    // useEffect(() => {
    //     refetch()
    // }, [id])

    return (
        <>
            <ScreenTitle text={"비행검사 수정"} />
            {/* {<TableViewer data={data} />} */}
            <CustomTable edit />

            <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
        </>
    )
}

export default FlightEdit