import styled from "@emotion/styled";
import { NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import InputText from "components/common/InputText";
import FlightItem from "./FlightItem";

const FlightContainer = styled.div`
    width:100%;
    height:100vh;
    user-select:none;
    position:relative;
`

const CloseButton = styled.div`
    border-radius: 0 5px 5px 0;
    background-color:#fff;
    position:absolute;
    right:-25px;
    top:calc(50% - 25px);
    width:25px;
    height:50px;
`

const Title = styled.h2`
    
`

type propType = {
    setPage: (a : NavBarType) => void;
}

const FlightContent = (props: propType) => {

    return (
        <FlightContainer>
            <CloseButton onClick={() => { props.setPage(null) }} />
            <Title>비행검사</Title>
            <InputText></InputText>
            {Array(5).fill(0).map((t, i) => {
                return <>
                    <HorizontalLine />
                    <FlightItem key={i} />
                </>
            })}

        </FlightContainer>
    )
}

export default FlightContent;