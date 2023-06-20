import React from 'react';
import { ContentType, NavBarType } from "../../common/type/NavBarType";
import styled from "@emotion/styled";
import { StyledInputBox } from "../common/InputText";
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import FlightContent from './flight/FlightContent';
import { useRecoilState } from 'recoil';
import { contentFormat } from 'common/store/atom';
import NavScreen from './NavScreen';


const Container = styled.div`
  height: 100vh;
  user-select: none;
  position: relative;
  display:flex;
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
const Wrapper = styled.div`
    width:350px;
    margin:10px 25px;
`
const CloseArrow = styled.div`
  margin: 17px 7px;
`

type propType = {
  setPage: (a: NavBarType) => void;
  selectedPage: NavBarType | null;
  content: ContentType;
  setContent: (a: ContentType) => void;
  contentView: boolean;
  setContentView: (a: boolean) => void;
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
              return <FlightContent content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
            case "SEARCH":
              return <FlightContent content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
            case "SETTING":
              return <FlightContent content={content} setContent={setContent} contentView={contentView} setContentView={setContentView} />
            default:
              return null;
          }
        })()}
        <CloseButton onClick={() => {
          prop.setPage(null)
        }}>
          <CloseArrow>
            <ICArrowLeft />
          </CloseArrow>
        </CloseButton>
      </Wrapper>
      <NavScreen />

    </Container>
  );
};

export default NavSideBar;