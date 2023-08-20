import React from 'react'
import styled from '@emotion/styled'
import { LatLngLiteral } from 'leaflet';
import { useRecoilState } from 'recoil';
import { markingCards } from 'common/store/atom';
import CancelIcon from '@mui/icons-material/Cancel';
import { motion } from 'framer-motion';

interface StyleProps {
  isDragging?: boolean
}

const Container = styled(motion.div)`
    display:flex;
    user-select:none;
    justify-content: space-between;
    align-items:center;
    padding: 15px 10px;
    border: 1px solid #eeeeee;
    margin: 5px 0;
    border-radius:4px;
    margin-bottom:1px;
    background-color: ${({ isDragging }: StyleProps) => (isDragging ? '#eeeeee' : 'white')};
    opacity: ${({isDragging}: StyleProps) => (isDragging ? 0.5 : 1)};
    transition:0.2s all ease;
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
  id: string,
  site: string,
  distance: number,
  angle: number,
  index: number,
  isDragging?: boolean,
  level: number,
  coord?: LatLngLiteral
}



const MarkingCard = ({ site, coord, distance, angle, index, isDragging, id }: MarkingCardProps) => {

  const [list, setList] = useRecoilState<MarkingCardProps[]>(markingCards);

  const handlerDeleteClick = () => {
    const newArray = list.filter(t => t.id !== id)
    setList(newArray);
  }

  return (
    <Container isDragging={isDragging} initial={{opacity:0 ,y:'-100%'}} animate={{opacity:1, y:0}} exit={{opacity:0, y:'-100%'}} transition={{duration:.2}}>
      <FlexBox>
        <Index>
          {index + 1}
        </Index>
        <Site>{coord ? coord.lat.toFixed(4) + ' / ' + coord.lng.toFixed(4) : site}</Site>
        <InfoText>{angle}/{distance}</InfoText>
      </FlexBox>
      <FlexBox>
        <ButtonBox>
          {/* <ModifyButton>수정</ModifyButton> */}
          <CancelIcon sx={{cursor:'pointer'}} onClick={handlerDeleteClick}/>
        </ButtonBox>
        {/* <PinButton>
          <ICMarking />
        </PinButton> */}
      </FlexBox>
    </Container>
  )
}

export default MarkingCard