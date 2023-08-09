import CustomTable from 'components/common/dataGrid/CustomTable'
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