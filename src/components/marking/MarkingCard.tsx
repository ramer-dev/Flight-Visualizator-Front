import React from 'react'
import styled from '@emotion/styled'
import { DeleteButton, ModifyButton, PinButton } from 'components/common/CustomButton'
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';
import { LatLngExpression, LatLngLiteral } from 'leaflet';

const Container = styled.div`
    display:flex;
    
    justify-content: space-around;
    align-items:center;
    padding: 15px 0;
`

const FlexBox = styled.div`
  width:230px;
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

interface Props {
  site: string,
  distance: number,
  angle: number,
  index: number,
  coord?: LatLngLiteral
}

function MarkingCard({ site, coord, distance, angle, index }: Props) {
  return (
    <Container>
      <FlexBox>
        <Index>
          {index}
        </Index>
        <Site>{coord ? coord.lat.toFixed(4) + ' / ' + coord.lng.toFixed(4) : site}</Site>
        <InfoText>{angle}/{distance}</InfoText>
      </FlexBox>
      <ButtonBox>
        <ModifyButton>수정</ModifyButton>
        <DeleteButton>삭제</DeleteButton>
      </ButtonBox>
      <PinButton>
        <ICMarking />
      </PinButton>

    </Container>
  )
}

export default MarkingCard