import React from 'react';
import { NavBarType } from "../../common/type/NavBarType";
import styled from "@emotion/styled";
import InputText from "../common/InputText";
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import FlightContent from './flight/FlightContent';


const FlightContainer = styled.div`
  width: 100%;
  height: 100vh;
  user-select: none;
  position: relative;
`

const CloseButton = styled.div`
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  position: absolute;
  right: -25px;
  top: calc(50% - 25px);
  width: 25px;
  height: 50px;
  border-width: 1px 1px 1px 0;
  border-style: solid;
  border-color: #DDDDDD;
  transition: 0.1s ease;
  cursor: pointer;

  &:hover {

  }
`

const CloseArrow = styled.div`
  margin: 17px 7px;
`

const Title = styled.h2`
  margin: 20px 0;
`

type propType = {
  setPage: (a: NavBarType) => void;
  selectedPage: NavBarType | null;
}


const NavSideBar = (prop: propType) => {

  return (
    <FlightContainer>
      <>
        <CloseButton onClick={() => {
          prop.setPage(null)
        }}>
          <CloseArrow>
            <ICArrowLeft />
          </CloseArrow>
        </CloseButton>

        {/* 더미 텍스트 */}
        {(() => {
          switch (prop.selectedPage) {
            case "FLIGHT_RESULT":
              return <>
                <Title>비행검사</Title>
                <InputText />
              </>
            case "SEARCH":
              return <>
                <Title>검색</Title>
                <InputText />
              </>
            case "MARKING":
              return <>
                <Title>마킹</Title>
                <InputText />
              </>
            case "NOTICE":
              return <>
                <Title>공지사항</Title>
                <InputText />
              </>

            case "SETTING":
              return <>
                <Title>환경설정</Title>
              </>
            default:
              return <Title>Null</Title>
          }
        })()}


        {/* 더미 텍스트 */}
        {(() => {
          switch (prop.selectedPage) {
            case "FLIGHT_RESULT":
              return <FlightContent />
            case "MARKING":
              return <FlightContent />
            case "SEARCH":
              return <FlightContent />
            case "FLIGHT_RESULT":
              return <FlightContent />

            default:
              return null;
          }
        })()}
      </>

    </FlightContainer>
  );
};

export default NavSideBar;