import CustomTable from 'components/common/dataGrid/CustomTable'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'
import styled from '@emotion/styled'

const Container = styled.div`
    overflow: hidden;
`

function FlightView() {

  return (
    <>
      <Container>
        <ScreenTitle text={"비행검사 조회"} />
        <CustomTable />

      </Container>
      <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
    </>
  )

}

export default FlightView