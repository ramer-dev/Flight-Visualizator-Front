import styled from '@emotion/styled'
import { Box } from '@mui/material'
import CustomTable from 'components/common/dataGrid/CustomTable'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

const Wrapper = styled(Box)`
    height: calc(100vh - 100px);
`
function FlightAdd() {

    return (
        <>
            <ScreenTitle text={"비행검사 추가"} />
            {/* {<TableViewer data={data} />} */}
            <Wrapper>
                <CustomTable edit add />

            </Wrapper>

            <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
        </>
    )
}

export default FlightAdd