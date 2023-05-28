import styled from "@emotion/styled";
import FlightItem from "./FlightItem";

const FlightContainer = styled.div`
    width:100%;

`

const FlightContent = () => {
    return (
        <FlightContainer>
            {Array(5).fill(0).map((t,i) => {
            return <>
            <FlightItem key={i}/> 
            </>
            })} 

        </FlightContainer>
    )
}

export default FlightContent;