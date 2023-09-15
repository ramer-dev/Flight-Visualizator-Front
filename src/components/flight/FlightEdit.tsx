import CustomTable from 'components/common/dataGrid/CustomTable';
import ScreenTitle from 'components/common/ScreenTitle';
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'
import styled from '@emotion/styled';

const Container = styled.div`
    overflow: hidden;
`

function FlightEdit() {

    return (
        <Container>
            <ScreenTitle text={"비행검사 수정"} />
            {/* {<TableViewer data={data} />} */}
            <CustomTable edit />

        </Container>
    )
}

export default FlightEdit