import { flightResultData, flightResultDataID } from 'common/store/atom'
import { FlightList } from 'common/type/FlightType'
import CustomTable from 'components/common/dataGrid/CustomTable'
import LoadingPage from 'components/common/LoadingPage'
import DataGridViewer from 'components/common/Not use/DataGridViewer'
import ScreenTitle from 'components/common/ScreenTitle'
import { useFlightData } from 'components/hooks/useFlightData'
import React, { useEffect, useTransition } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable} from 'recoil'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  const flightDataId = useRecoilValue<number>(flightResultDataID);
  let {data, isLoading, refetch} = useFlightData(flightDataId);
  let error = null;
  // switch (flightData.state) {
  //   case 'hasValue':
  //     data = flightData.contents;
  //     break;
  //   case 'hasError':
  //     error = flightData.contents;
  //     break;
  //   case 'loading':
  //     break;
  // }

  useEffect(() => {
    refetch()
  }, [flightDataId])

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* {<TableViewer data={data} />} */}
      <CustomTable data={data}/>

      <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
    </>
  )

}

export default FlightView