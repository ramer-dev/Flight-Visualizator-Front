import DataGridViewer from 'components/common/DataGridViewer'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* <DataViewer searchVisible checkboxVisible /> */}
      <DataGridViewer/>
      <NavCloseButton format={['MID', 'FULLSCREEN']} />
    </>
  )
}


export default FlightView