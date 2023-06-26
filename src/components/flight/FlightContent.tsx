import { ContentType, ContentViewType, NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import { StyledInputBox } from "components/common/InputText";
import FlightItem from "./FlightItem";
import NavSideBar from "../navbar/NavSideBar";
import React from "react";
import Title from "components/common/Title";
import { Box, Fab } from '@mui/material';
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add'
import { contentFormat } from "common/store/atom";
import { useRecoilState } from "recoil";
import NavCloseButton from "../navbar/NavCloseButton";

const Container = styled.div`
  position:relative;
`

const Wrapper = styled.div`
`

const Content = styled.div`
    height:calc(100vh - 150px);
    overflow-y:scroll;
`

const StyledFab = styled(Fab)`
    position:absolute;
    bottom:20px;
    right:10px;
`

const FlightContent = () => {
    const [content, setContentView] = useRecoilState(contentFormat)
    
    const AddFlightResultEvent = (e:any) => {
        e.stopPropagation();
        setContentView('ADD');
    }
    return (
        <Container>
            <StyledFab color="info" aria-label="add" onClick={AddFlightResultEvent}>
                <AddIcon color="primary"/>
            </StyledFab>
            <Wrapper>
                <Title>비행검사</Title>
                <StyledInputBox label="비행검사 이름" fullWidth size='small' color="primary"></StyledInputBox>
                <Content>
                    {Array(10).fill(0).map((t, i) => {
                        return <>
                            <HorizontalLine key={i*2-1}/>
                            <FlightItem key={i*2} />
                        </>
                    })}
                </Content>
            </Wrapper>

        </Container>
    )
}

export default FlightContent;