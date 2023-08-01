import { flightResultData } from 'common/store/atom'
import { FlightList } from 'common/type/FlightType'
import CustomTable from 'components/common/dataGrid/CustomTable'
import LoadingPage from 'components/common/LoadingPage'
import DataGridViewer from 'components/common/Not use/DataGridViewer'
import ScreenTitle from 'components/common/ScreenTitle'
import TableViewer from 'components/tableView/TableViewer'
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
      error = flightData.contents;
      break;
    case 'loading':
      break;
  }

  if (flightData.state === 'loading') {
    return <div>loading</div>
  } else if(flightData.state === 'hasError'){
    console.error(error)
  }

  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* {<TableViewer data={data} />} */}
      {data ? <CustomTable data={data}/> : <LoadingPage/>}

      <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
    </>
  )

}

export default FlightView