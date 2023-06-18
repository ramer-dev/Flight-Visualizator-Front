import React from 'react';
import { NavBarType, SubPageType } from "../../common/type/NavBarType";
import styled from "@emotion/styled";
// import {StyledInputBox} from "../common/InputText";
import FlightContent from './flight/FlightContent';
// import NavCloseButton from './NavCloseButton';


const FlightContainer = styled.div`
  width: 100%;
  height: 100vh;
  user-select: none;
  position: relative;
`


type propType = {
  setPage: (a: NavBarType) => void;
  selectedPage: NavBarType | null;
  subPage:SubPageType;
  setSubPage:(a:SubPageType) => void
}


const NavSideBar = (prop: propType) => {

  return (
    <FlightContainer>
      <>

        {/* 더미 텍스트 */}

        {/* 더미 텍스트 */}
        {(() => {
          switch (prop.selectedPage) {
            case "FLIGHT_RESULT":
              return <FlightContent />
            case "MARKING":
              return <FlightContent />
            case "SEARCH":
              return <FlightContent />
            case "SETTING":
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