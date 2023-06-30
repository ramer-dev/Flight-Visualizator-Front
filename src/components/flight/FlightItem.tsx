import React, { useEffect } from 'react'
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';

import styled from '@emotion/styled'
import { useRecoilState } from 'recoil';
import { ContentType } from 'common/type/NavBarType';
import { contentFormat } from 'common/store/atom';
import { FlightList } from 'common/type/FlightType';

const Container = styled.div`
    padding:20px 10px;
    &:hover{
        background-color:#f0f0f0;
    }
`
const Title = styled.h3`
    font-style:bold;
`

const ContentWrapper = styled.div`
    margin-top:8px;
    gap:5px;
    display:flex;
`

const FlightType = styled.h4`
    color:#8e8e8e;
    font-weight:300;
`

const FlightDate = styled.h4`
    color:#5096ff;
    font-weight:300;
`

const ButtonContainer = styled.div`
    margin-top:10px;
    height:26px;
    display:flex;
`

const ModifyButton = styled.a`
    padding:5px 8px;
    text-decoration:none;
    transition:0.2s ease;
    font-size:12px;
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: #D9D9D9;
    border-radius: 10px 0px 0px 10px;
    &:hover{
        background-color:#d9d9d9;
    }
`

const DeleteButton = styled.a`
    padding:5px 8px;
    text-decoration:none;
    transition:0.2s ease;
    font-size:12px;
    border-width: 1px 1px 1px 0px;
    border-style: solid;
    border-color: #D9D9D9;
    border-radius:0 10px 10px 0;
    &:hover{
        background-color:#ff3737;
        border-color: #ff3737;
        color:#ffffff;
    }
    color:#ff3737;
`

const PinButton = styled.div`
    margin-left:10px;
    width:25px;
    border:#d9d9d9 solid 1px;
    border-radius:50%;
    transition:0.2s ease;
    &:hover{
        background-color:#d9d9d9;
    }
    svg{
        margin:2px;
        width:20px;
        height:20px;
    }
    path{
        fill: #000;
    }
`

const FlightItem = ({testName, testType, testDate, id}:FlightList) => {
    const [content, setContent] = useRecoilState<ContentType>(contentFormat);
    const ViewFlightItem = (e: any) => {
        e.stopPropagation();
        setContent('VIEW');
    }

    const EditFlightItem = (e: any) => {
        e.stopPropagation();
        setContent('EDIT');
    }

    const DeleteFlightItem = (e: any) => {
        e.stopPropagation();
        console.log('delete');
    }

    return (
        <Container onClick={ViewFlightItem}>

            <Title>{testName}</Title>
            <ContentWrapper>
                <FlightType>{testType}</FlightType>
                <FlightDate>{testDate.toString()}</FlightDate>
            </ContentWrapper>
            <ButtonContainer>
                <ModifyButton onClick={EditFlightItem}>수정</ModifyButton>
                <DeleteButton onClick={DeleteFlightItem}>삭제</DeleteButton>
                <PinButton>
                    <ICMarking />
                </PinButton>
            </ButtonContainer>
        </Container>
    )
}

export default FlightItem;