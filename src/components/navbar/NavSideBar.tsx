import React, { useEffect } from 'react';
import { ContentType, ContentViewType, NavBarType } from "../../common/type/NavBarType";
import styled from "@emotion/styled";
import { StyledInputBox } from "../common/InputText";
import FlightContent from './flight/FlightContent';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentFormat, contentViewFormat } from 'common/store/atom';
import NavScreen from './NavScreen';
import Marking from './marking/Marking';
import NavCloseButton from './NavCloseButton';

type StyleProp = { isHidden: boolean }

const Container = styled.div`
  height: 100vh;
  user-select: none;
  position: relative;
  display:flex;
`

const Wrapper = styled.div`
    width:${(props: StyleProp) => props.isHidden ? '0' : '350px'};
    overflow:hidden;
    border-right:1px solid #d9d9d9;
    padding: ${(props: StyleProp) => props.isHidden ? '0' : '10px 25px'};
`

type propType = {
  setPage: (a: NavBarType) => void;
  selectedPage: NavBarType | null;
  content: ContentType;
  setContent: (a: ContentType) => void;
  contentView: ContentViewType;
  setContentView: (a: ContentViewType) => void;
}


const NavSideBar = (prop: propType) => {
  const [content, setContent] = useRecoilState(contentFormat);
  const [contentView, setContentView] = useRecoilState(contentViewFormat)
  return (
    <Container>

      {/* 더미 텍스트 */}
      <Wrapper isHidden={contentView === 'MID'}>
        {(() => {
          switch (prop.selectedPage) {
            case "FLIGHT_RESULT":
              return <FlightContent />
            case "MARKING":
              return <Marking />
            case "SEARCH":
              return <FlightContent />
            case "SETTING":
              return <FlightContent />
            default:
              return null;
          }
        })()}
      </Wrapper>

      <NavScreen />

    </Container>
  );
};

export default NavSideBar;