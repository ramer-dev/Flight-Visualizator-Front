import { FlightList } from 'common/type/FlightType'
import React, { useEffect, useState } from 'react'
import ViewerRow from './ViewerRow'
import styled from '@emotion/styled'

const ViewerContainer = styled.div`
    width:100%;
`

interface Props {
    data : FlightList | null;
}
function TableViewer({data} : Props) {
    const [tableData, setTableData] = useState(data ? data : null);


  return (
    <ViewerContainer>
        {tableData?.data?.map(t => {
            return <ViewerRow data={t} pk={t.id} key={t.id}/>
        })}

    </ViewerContainer>
    
  )
}

export default TableViewer