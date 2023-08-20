import CustomTable from 'components/common/dataGrid/CustomTable';
import ScreenTitle from 'components/common/ScreenTitle';
import NavCloseButton from 'components/navbar/NavCloseButton';
import React from 'react'

function Search() {
  // let { data = undefined, isLoading, isError, refetch } = useFlightData(0, 100);

  // useEffect(() => {
  //   refetch()
  // }, [flightDataId])

  return (
    <>
      <ScreenTitle text={"비행검사 조회"} />
      {/* {<TableViewer data={data} />} */}
      <CustomTable search />

      <NavCloseButton contentSize={['NONE', 'ENTIRE']} />
    </>
  )
}

export default Search