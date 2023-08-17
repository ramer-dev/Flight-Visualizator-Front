import React from 'react'

import styled from '@emotion/styled'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ContentType } from 'common/type/NavBarType';
import { contentFormat, flightResultDataID } from 'common/store/atom';
import { FlightList } from 'common/type/FlightType';
import { DeleteButton, ModifyButton } from 'components/common/CustomButton';
import dayjs from 'dayjs'
import { deleteFlightList } from 'common/service/flightService';
import { authState } from 'common/store/auth';

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

interface Props {
    refetch: () => void;
}

const FlightItem = ({ testName, testType, testDate, id, refetch }: FlightList & Props) => {
    const setContent = useSetRecoilState<ContentType>(contentFormat);
    const setFlightData = useSetRecoilState(flightResultDataID);
    const authLevel = useRecoilValue(authState);

    const ViewFlightItem = (e: any, id: number) => {
        e.stopPropagation();
        setFlightData(id)
        setContent('VIEW');
    }

    const EditFlightItem = (e: any) => {
        e.stopPropagation();
        setFlightData(id)
        setContent('EDIT');
    }

    const DeleteFlightItem = (e: any) => {
        e.stopPropagation();
        console.log('delete');
        if (id)
            if (window.confirm("진짜로 비행점검 삭제?")) {
                deleteFlightList(id).then(() => refetch())
            }
    }

    return (
        <Container onClick={(e) => { ViewFlightItem(e, id ? id : -1) }}>

            <Title>{testName}</Title>
            <ContentWrapper>
                <FlightType>{testType}</FlightType>
                <FlightDate>{dayjs(testDate).format('YYYY-MM-DD')}</FlightDate>
            </ContentWrapper>
            {authLevel.role >= 2 ? <ButtonContainer>

                <ModifyButton onClick={EditFlightItem}>수정</ModifyButton>
                <DeleteButton onClick={DeleteFlightItem}>삭제</DeleteButton>
            </ButtonContainer>
                : null}
        </Container>
    )
}

export default FlightItem;