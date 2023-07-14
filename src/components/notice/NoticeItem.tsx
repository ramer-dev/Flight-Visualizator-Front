import React, { useState } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg'
import { Divider } from '@mui/material'
import NoticeContent from './NoticeContent'
import { NoticeContext } from 'common/type/NoticeType'

interface Props extends NoticeContext {
    removeFunc : (id: number) => void;
    modifyFunc : (item : NoticeContext) => void;
}

interface StyleProps {
    isOpen: boolean,
}

const Container = styled.div`
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
`

const ArrowIcon = styled(ICArrowLeft)`
    transition: 0.3s ease all;
    transform: ${(({ isOpen }: StyleProps) => (isOpen ? 'rotateZ(90deg)' : 'rotateZ(-90deg)'))};
`

function NoticeItem({ id, title, date, content, isUpdate, removeFunc, modifyFunc }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const openHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Container>
            <Wrapper>
                <ContentWrapper>
                    <TextWrapper>
                        {isUpdate ? <TypeTypo>[업데이트]</TypeTypo> : <TypeTypo>[일반]</TypeTypo>}

                        <TitleTypo>{title}</TitleTypo>
                    </TextWrapper>
                    <DateTypo>
                        {date}
                    </DateTypo>
                </ContentWrapper>
                <IconWrapper onClick={openHandler}>
                    <ArrowIcon isOpen={isOpen} />
                </IconWrapper>


            </Wrapper>

            {isOpen && <NoticeContent id={id} content={content} isOpen={isOpen} removeFunc={removeFunc} modifyFunc={modifyFunc}/>}


        </Container>
    )
}

export default NoticeItem