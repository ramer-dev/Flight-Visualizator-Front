import { FlightResult } from 'common/type/FlightType'
import React from 'react'
import styled from '@emotion/styled'
import ViewerColumn from './ViewerColumn'

interface Props {
    data: FlightResult,
    pk:number,
}

const RowContainer = styled.div`
    display:flex;
    justify-content: space-around;
`


function ViewerRow({data, pk} :Props) {
  return (
    <RowContainer>
      
        {Object.entries(data).map(([key, value],index) => {
            return <ViewerColumn key={pk+'-'+index} pk={pk} type={key} data={value}/>
        })}
    </RowContainer>
  )
}

export default ViewerRow