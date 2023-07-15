import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg'
import NoticeContent from './NoticeContent'
import { NoticeContext } from 'common/type/NoticeType'

interface Props extends NoticeContext {}

interface StyleProps {
    isOpen: boolean,
}

const Container = styled.div`
    user-select:none;
    display:flex;
    flex-direction : column;
    margin:10px 15px;
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
    display:flex;
    gap:10px;
`

const TypeTypo = styled.h3`
    color:#5096ff;
    margin-right:6px;
    white-space:nowrap;
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
        <Container >
            <Wrapper onClick={openHandler}>
                <ContentWrapper>
                    <TextWrapper>
                        <TypeTypo>[{type}]</TypeTypo>
                        <TitleTypo>{title}</TitleTypo>
                    </TextWrapper>
                    <DateTypo>
                        {date}
                    </DateTypo>
                </ContentWrapper>
                <IconWrapper onClick={openHandler} isOpen={isOpen}>
                    <ArrowIcon/>
                </IconWrapper>


            </Wrapper>

            {isOpen && <NoticeContent id={id} context={context} isOpen={isOpen} />}


        </Container>
    )
}

export default NoticeItem