import { flightResultData, flightResultDataID } from 'common/store/atom'
import { FlightList } from 'common/type/FlightType'
import CustomTable from 'components/common/dataGrid/CustomTable'
import LoadingPage from 'components/common/LoadingPage'
import ScreenTitle from 'components/common/ScreenTitle'
import { useFlightData } from 'components/hooks/useFlightData'
import React, { useEffect, useTransition } from 'react'
import { useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  const flightDataId = useRecoilValue<number>(flightResultDataID);
  let { data = undefined, isLoading, isError, refetch } = useFlightData(flightDataId);

  useEffect(() => {
    refetch()
  }, [flightDataId])

  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* {<TableViewer data={data} />} */}
      <CustomTable data={data} idx={flightDataId} isLoading={isLoading} />

      <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
    </>
  )

}

export default FlightView