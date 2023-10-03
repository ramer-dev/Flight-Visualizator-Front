import styled from '@emotion/styled'
import { Box } from '@mui/material'
import CustomTable from 'components/common/dataGrid/CustomTable'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

const Wrapper = styled(Box)`
    height: calc(100vh - 100px);
`

const Container = styled.div`
    overflow: hidden;
`

function FlightAdd() {

    return (
        <>
        <Container >
            <ScreenTitle text={"비행검사 추가"} />
            {/* {<TableViewer data={data} />} */}
                <CustomTable edit add />

        </Container>
        <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
        </>
    )
}

export default FlightAdd