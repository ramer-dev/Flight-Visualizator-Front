import React, { useEffect } from 'react';
import {motion} from 'framer-motion'
import { ContentType, ContentViewType, NavBarType } from "../../common/type/NavBarType";
import styled from "@emotion/styled";
import { StyledInputBox } from "../common/InputText";
import FlightContent from '../flight/FlightContent';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentFormat, contentViewFormat } from 'common/store/atom';
import NavScreen from './NavScreen';
import Marking from 'components/marking/Marking';
import NavCloseButton from './NavCloseButton';
import Search from 'components/search/Search';
import Setting from 'components/setting/Setting';
import Notice from 'components/notice/Notice';
import { ButtonProps } from '@mui/material';

type StyleProp = { isHidden: boolean }

const Container = styled.div`
  height: 100vh;
  position: relative;
  display:flex;
`

const Wrapper = styled(motion.div)`
    transform:${(props: StyleProp) => props.isHidden ? 'translateX(-100%)' : ''};
    opacity:${(props:StyleProp) => props.isHidden ? '0' : '1'};
    width:350px;
    /* width:${(props: StyleProp) => props.isHidden ? '0' : '350px'}; */
    overflow:hidden;
    border-right:1px solid #d9d9d9;
    transition: 0.3s ease all;
    padding:10px 25px;
    position:${(props:StyleProp) => props.isHidden ? 'fixed' : 'relative'};
    /* padding: ${(props: StyleProp) => props.isHidden ? '0' : '10px 25px'}; */
`

type propType = { 
  selectedPage: NavBarType | null; 
}


const NavSideBar = (prop: propType) => {
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
              return <Search />
            case "SETTING":
              return <Setting />
            case "NOTICE":
              return <Notice />
            default:
              return null;
          }
        })()}
      </Wrapper>

      <NavScreen />

    </Container>
  );
};

export default React.memo(NavSideBar);