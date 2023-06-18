import HorizontalLine from "components/common/HorizontalLine";
import { StyledInputBox } from "components/common/InputText";
import FlightItem from "./FlightItem";
import React from "react";
import Title from "components/common/Title";
import { Fab } from '@mui/material';
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add'

const Container = styled.div`
    position:relative;
`

const Wrapper = styled.div`
    margin:10px 25px;
`

const Content = styled.div`
    height:calc(100vh - 150px);
    overflow-y:scroll;
`


const AddButton = styled(Fab)`
    position:absolute;
    right:10px;
    bottom:0;
`


const FlightContent = () => {

    return (
        <Container>
            <AddButton color="info" aria-label="add">
                <AddIcon color="primary"/>
            </AddButton>
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