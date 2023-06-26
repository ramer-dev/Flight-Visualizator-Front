import DataViewer from 'components/common/DataViewer'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      <DataViewer />
      <NavCloseButton format={['MID', 'FULLSCREEN']} />
    </>
  )
}


export default FlightView