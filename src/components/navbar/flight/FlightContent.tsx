import { ContentType, NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import { StyledInputBox } from "components/common/InputText";
import FlightItem from "./FlightItem";
import NavSideBar from "../NavSideBar";
import React from "react";
import Title from "components/common/Title";
import { Box, Fab } from '@mui/material';
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add'
import { contentFormat } from "common/store/atom";
import { useRecoilState } from "recoil";

const Container = styled.div`
  display:flex;
`

const Wrapper = styled.div`
`

const Content = styled.div`
    height:calc(100vh - 150px);
    overflow-y:scroll;
`

type propType = {
    content: ContentType;
    setContent: (a: ContentType) => void;
    contentView: boolean;
    setContentView: (a: boolean) => void;
    
}

const FlightContent = (prop: propType) => {
    return (
        <Container>
            {/* <Fab color="info" aria-label="add">
                <AddIcon color="primary"/>
            </Fab> */}
            <Wrapper>
                <Title>비행검사</Title>
                <StyledInputBox label="비행검사 이름" fullWidth variant="outlined" size='small' color="primary"></StyledInputBox>
                <Content>
                    {Array(10).fill(0).map((t, i) => {
                        return <>
                            <HorizontalLine />
                            <FlightItem key={i} />
                        </>
                    })}
                </Content>
            </Wrapper>

        </Container>
    )
}

export default FlightContent;