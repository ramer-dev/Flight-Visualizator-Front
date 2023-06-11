import styled from "@emotion/styled";
import { NavBarType } from "common/type/NavBarType";
import HorizontalLine from "components/common/HorizontalLine";
import InputText from "components/common/InputText";
import FlightItem from "./FlightItem";
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';

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

const CloseArrow = styled.div`
    margin:17px 7px;
`

const Title = styled.h2`
    margin:20px 0;
`

type propType = {
    setPage: (a: NavBarType) => void;
}

const FlightContent = (props: propType) => {

    return (
        <FlightContainer>
            <CloseButton onClick={() => { props.setPage(null) }} >
                <CloseArrow>
            <ICArrowLeft/>
            </CloseArrow>
            </CloseButton>
            <Title>비행검사</Title>
            <InputText></InputText>
            
            {/* 더미 텍스트 */}
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