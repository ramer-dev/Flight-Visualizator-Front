import React, { useEffect } from 'react';
import { ContentType, ContentViewType, NavBarType } from "../../common/type/NavBarType";
import styled from "@emotion/styled";
import { StyledInputBox } from "../common/InputText";
import FlightContent from './flight/FlightContent';
import { useRecoilState } from 'recoil';
import { contentFormat } from 'common/store/atom';
import NavScreen from './NavScreen';
import Marking from './marking/Marking';
import NavCloseButton from './NavCloseButton';


const Container = styled.div`
  height: 100vh;
  user-select: none;
  position: relative;
  display:flex;
`

const Wrapper = styled.div`
    width:350px;
    
    border-right:1px solid #d9d9d9;
    padding:10px 25px;
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
  const { content, contentView, setContent, setContentView } = prop;

  return (
    <Container>

      {/* 더미 텍스트 */}
      <Wrapper>
        {(() => {
          switch (prop.selectedPage) {
            case "FLIGHT_RESULT":
              return <FlightContent content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
            case "MARKING":
              return <Marking content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
            case "SEARCH":
              return <FlightContent content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
            case "SETTING":
              return <FlightContent content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
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