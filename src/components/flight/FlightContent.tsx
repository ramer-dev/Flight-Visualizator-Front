import { ContentType, ContentViewType, NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import { StyledInputBox } from "components/common/InputText";
import FlightItem from "./FlightItem";
import NavSideBar from "../navbar/NavSideBar";
import React, { useEffect, useState } from "react";
import Title from "components/common/Title";
import { Box, Fab } from '@mui/material';
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add'
import { contentFormat } from "common/store/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import NavCloseButton from "../navbar/NavCloseButton";
import CustomAxios from "module/axios";
import { FlightList } from "common/type/FlightType";

const Container = styled.div`
  position:relative;
`

const Wrapper = styled.div`
`

const Content = styled.div`
    height:calc(100vh - 135px);
    overflow-y:scroll;
    margin-top:15px;
`

const StyledFab = styled(Fab)`
    position:absolute;
    bottom:20px;
    right:10px;
`

const CustomInput = styled(StyledInputBox)`

`



const FlightContent = () => {
    const setContentView = useSetRecoilState(contentFormat)
    const [list, setList] = useState<FlightList[]>();
    const [value, setValue] = useState('');
    const getFlightList = async () => {
        const flightList = await CustomAxios.get<FlightList[]>('flight/list');

        setList(flightList.data);
    }
    useEffect(() => {
        getFlightList()
    }, [])
    
    const AddFlightResultEvent = (e: any) => {
        e.stopPropagation();
        setContentView('ADD');
    }
    return (
        <Container>
            <StyledFab color="info" aria-label="add" onClick={AddFlightResultEvent}>
                <AddIcon color="primary" />
            </StyledFab>
            <Wrapper>
                <Title>비행검사</Title>
                <StyledInputBox onChange={(e) => setValue(e.target.value)} label="비행검사 이름" fullWidth size='small' color="primary"></StyledInputBox>
                <Content>
                    {
                        list?.map((it, i) => {
                            return it.testName.includes(value) ? <div key={it.id}>
                                <HorizontalLine />
                                <FlightItem testName={it.testName} testDate={it.testDate} testType={it.testType} id={it.id} userId={it.userId} />
                            </div> : null
                        })
                    }
                    {/* {Array(10).fill(0).map((t, i) => {
                        return <>
                            <HorizontalLine key={i*2-1}/>
                            <FlightItem key={i*2} />
                        </>
                    })} */}
                </Content>
            </Wrapper>

        </Container>
    )
}

export default FlightContent;