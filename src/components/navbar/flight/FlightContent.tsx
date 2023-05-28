import styled from "@emotion/styled";
import HorizontalLine from "components/common/HorizontalLine";
import InputText from "components/common/InputText";
import FlightItem from "./FlightItem";

const FlightContainer = styled.div`
    width:100%;
    user-select:none;

`

const Title = styled.h2`
    
`

const FlightContent = () => {
    return (
        <FlightContainer>
            <Title>비행검사</Title>
            <InputText></InputText>
            {Array(5).fill(0).map((t,i) => {
            return <>
            <HorizontalLine/>
            <FlightItem key={i}/> 
            </>
            })} 

        </FlightContainer>
    )
}

export default FlightContent;