import DataViewer from 'components/common/DataViewer'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  return (
    <>
    <DataViewer/>
    <NavCloseButton format={['MID','FULLSCREEN']} />
    </>
  )
}

export default FlightView