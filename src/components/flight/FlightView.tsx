import { flightResultData } from 'common/store/atom'
import { FlightList } from 'common/type/FlightType'
import DataGridViewer from 'components/common/DataGridViewer'
import ScreenTitle from 'components/common/ScreenTitle'
import React, { useTransition } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  const flightData = useRecoilValueLoadable<FlightList>(flightResultData);
  let data = null;
  let error = null;
  switch (flightData.state) {
    case 'hasValue':
      data = flightData.contents;
      break;
    case 'hasError':
      break;
    case 'loading':

  }
  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* <DataViewer searchVisible checkboxVisible /> */}

      <DataGridViewer data={data?.data} />
      <NavCloseButton format={['MID', 'FULLSCREEN']} />
    </>
  )
}


export default FlightView