import { GridRowId, GridValidRowModel } from '@mui/x-data-grid'
import { FlightList, FlightResult } from 'common/type/FlightType'
import CustomTable from 'components/common/dataGrid/CustomTable'
import LoadingPage from 'components/common/LoadingPage'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightAdd() {

    return (
        <>
            <ScreenTitle text={"비행검사 추가"} />
            {/* {<TableViewer data={data} />} */}
            <CustomTable edit/>

            <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
        </>
    )
}

export default FlightAdd