import React from 'react'
import styled from '@emotion/styled'
import { MarkingCardProps } from './MarkingCard';
import { renderToString } from 'react-dom/server'
import { LatLngLiteral } from 'leaflet';

interface StyleProps {
  isDragging?: boolean
}

const Container = styled.div`
    display:flex;
    user-select:none;
    justify-content: space-between;
    align-items:center;
    padding: 10px 10px;
    border-radius:4px;
    margin-bottom:1px;
    background-color: ${({ isDragging }: StyleProps) => (isDragging ? '#cccccc' : 'white')};
`

const FlexBox = styled.div`
  display:flex;
  align-items:center;
  gap:7px;
`

const Index = styled.div`
  border-radius:50%;
  background-color:#d9d9d9;
  width:24px;
  height:24px;
  line-height:24px;
  text-align:center;
  font-weight:300;
  font-size:15px;
`

const Site = styled.div`
  font-size:14px;
  font-weight:700;
`


const InfoText = styled.div`
  font-size:12px;
  color:#8e8e8e;
  font-weight:400;
`

export interface MarkingTooltipProps {
  site: string,
  distance: number,
  angle: number,
  index?: number,
  isDragging?: boolean,
  coord?: LatLngLiteral
}



export default function MarkingTooltip({ site, coord, distance, angle, index }: MarkingTooltipProps) {

  // const [list, setList] = useRecoilState<MarkingCardProps[]>(markingCards);

  // const handlerDeleteClick = () => {
  //   const newArray = list.filter(t => t.id !== id)
  //   setList(newArray);
  // }

  return renderToString(
    <Container style={{
      display: 'flex',
      userSelect: 'none',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 10px',
      borderRadius: '4px',
      marginBottom: '1px',
    }}>
      <FlexBox style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px'
      }}>
        {typeof index === 'number' ?
          <Index style={{
            borderRadius: '50%',
            backgroundColor: '#d9d9d9',
            width: '24px',
            height: '24px',
            lineHeight: '24px',
            textAlign: 'center',
            fontWeight: 300,
            fontSize: '15px'
          }}>
            {index}
          </Index> : null
        }
        <Site style={{
          fontSize: "14px",
          fontWeight: 700
        }}>{site ? site : coord?.lat.toFixed(4) + ' / ' + coord?.lng.toFixed(4)}</Site>
        <InfoText>{angle}/{distance}</InfoText>
      </FlexBox>
      
    </Container>
  )
}