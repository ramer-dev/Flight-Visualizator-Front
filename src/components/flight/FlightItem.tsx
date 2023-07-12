import React, { useEffect } from 'react'
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';

import styled from '@emotion/styled'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ContentType } from 'common/type/NavBarType';
import { contentFormat, flightResultData, flightResultDataID } from 'common/store/atom';
import { FlightList } from 'common/type/FlightType';
import CustomAxios from 'module/axios';
import { DeleteButton, ModifyButton, PinButton } from 'components/common/CustomButton';

const Container = styled.div`
    padding:20px 10px;
    cursor:pointer;
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


const FlightItem = ({ testName, testType, testDate, id }: FlightList) => {
    const [content, setContent] = useRecoilState<ContentType>(contentFormat);
    const setFlightData = useSetRecoilState(flightResultDataID);
    const ViewFlightItem = (e: any, id: number) => {
        e.stopPropagation();
        setFlightData(id)
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
        <Container onClick={(e) => {ViewFlightItem(e, id)}}>

            <Title>{testName}</Title>
            <ContentWrapper>
                <FlightType>{testType}</FlightType>
                <FlightDate>{testDate.toString().split('T')[0]}</FlightDate>
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