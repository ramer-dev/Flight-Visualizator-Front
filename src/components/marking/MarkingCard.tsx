import React from 'react'
import styled from '@emotion/styled'
import { DeleteButton, ModifyButton, PinButton } from 'components/common/CustomButton'
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';
import { LatLngExpression, LatLngLiteral } from 'leaflet';

interface StyleProps {
  isDragging?: boolean
}

const Container = styled.div`
    display:flex;
    user-select:none;
    justify-content: space-between;
    align-items:center;
    padding: 15px 10px;
    border-radius:4px;
    margin-bottom:1px;
    background-color: ${({ isDragging }: StyleProps) => (isDragging ? '#999' : 'white')};
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

const ButtonBox = styled.div`
`

const InfoText = styled.div`
  font-size:12px;
  color:#8e8e8e;
  font-weight:400;
`

export interface MarkingCardProps {
  id:string,
  site: string,
  distance: number,
  angle: number,
  index: number,
  isDragging?: boolean,
  coord?: LatLngLiteral
}

const MarkingCard : React.FC<MarkingCardProps> = ({ site, coord, distance, angle, index, isDragging }: MarkingCardProps) => {
  return (
    <Container isDragging={isDragging}>
      <FlexBox>
        <Index>
          {index+1}
        </Index>
        <Site>{coord ? coord.lat.toFixed(4) + ' / ' + coord.lng.toFixed(4) : site}</Site>
        <InfoText>{angle}/{distance}</InfoText>
      </FlexBox>
      <FlexBox>
        <ButtonBox>
          <ModifyButton>수정</ModifyButton>
          <DeleteButton>삭제</DeleteButton>
        </ButtonBox>
        <PinButton>
          <ICMarking />
        </PinButton>
      </FlexBox>
    </Container>
  )
}

export default MarkingCard