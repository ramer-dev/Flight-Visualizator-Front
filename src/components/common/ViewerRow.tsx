import { FlightResult } from 'common/type/FlightType'
import React from 'react'
import styled from '@emotion/styled'

interface Props {
    data: FlightResult
}

const RowContainer = styled.div`
    display:flex;
`

const RowColumn = styled.div`
    
`

function ViewerRow({data} :Props) {
  return (
    <RowContainer>
        {Object.entries(data).map(([key, value]) => {
            return <RowColumn>{value}</RowColumn>
        })}
    </RowContainer>
  )
}

export default ViewerRow