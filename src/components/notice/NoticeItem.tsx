import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg'
import NoticeContent from './NoticeContent'
import { NoticeContentType } from 'common/type/NoticeType'
import dayjs from 'dayjs'

interface Props extends NoticeContentType {}

interface StyleProps {
    isOpen: boolean,
}

const Container = styled.div`
    user-select:none;
    display:flex;
    flex-direction : column;
    margin:15px 15px;
    border-radius:5px;
    border: 1px solid #ABABAB;
    padding:10px;
    transition: height 0.3s ease ;

`

const Wrapper = styled.div`
    display:flex;
    
    justify-content:space-between;
    align-items:center;
`
const ContentWrapper = styled.div`

`

const TextWrapper = styled.div`
    width:260px;
    display:flex;
    gap:5px;
`

const TypeTypo = styled.h3`
    width:70px;
    color:#5096ff;
`

const TitleTypo = styled.h3`
    width:200px;
`

const DateTypo = styled.h5`
    color:#8e8e8e;
    font-weight:400;
    margin:0;
`

const IconWrapper = styled.div`
    line-height:100%;
    padding: 1px 4px;
    text-align:center;
    cursor:pointer;
    transition: 0.3s ease all;
    transform: ${(({ isOpen }: StyleProps) => (isOpen ? 'rotateZ(90deg)' : 'rotateZ(-90deg)'))};
`

const ArrowIcon = styled(ICArrowLeft)`

`

function NoticeItem({ id, title, date, context, type }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const openHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Container>
            <Wrapper onClick={openHandler}>
                <ContentWrapper>
                    <TextWrapper>
                        <TypeTypo>[{type}]</TypeTypo>
                        <TitleTypo>{title}</TitleTypo>
                    </TextWrapper>
                    <DateTypo>
                        {dayjs(date).format('YYYY-MM-DD')}
                    </DateTypo>
                </ContentWrapper>
                <IconWrapper onClick={openHandler} isOpen={isOpen}>
                    <ArrowIcon/>
                </IconWrapper>


            </Wrapper>

            {isOpen && <NoticeContent id={id} title={title} date={date} type={type} context={context} isOpen={isOpen} />}


        </Container>
    )
}

export default NoticeItem