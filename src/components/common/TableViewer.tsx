import { FlightList } from 'common/type/FlightType'
import React, { useState } from 'react'
import ViewerRow from './ViewerRow'
import styled from '@emotion/styled'

const ViewerContainer = styled.div`
    
`

interface Props {
    data : FlightList | null;
}
function TableViewer({data} : Props) {
    const [tableData, setTableData] = useState(data ? data : null);
  return (
    <ViewerContainer>
        {data?.data?.map(t => {
            return <ViewerRow data={t}/>
        })}

    </ViewerContainer>
    
  )
}

export default TableViewer