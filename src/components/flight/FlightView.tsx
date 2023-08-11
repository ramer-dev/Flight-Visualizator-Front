import CustomTable from 'components/common/dataGrid/CustomTable'
import ScreenTitle from 'components/common/ScreenTitle'
import React from 'react'
import NavCloseButton from '../navbar/NavCloseButton'

function FlightView() {
  // let { data = undefined, isLoading, isError, refetch } = useFlightData(flightDataId);

  // useEffect(() => {
  //   refetch()
  // }, [flightDataId])

  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* {<TableViewer data={data} />} */}
      <CustomTable />

      <NavCloseButton contentSize={['MID', 'FULLSCREEN']} />
    </>
  )

}

export default FlightView