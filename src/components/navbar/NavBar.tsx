import styled from "@emotion/styled";
import { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import NavItem from "./NavItem";
import { ReactComponent as ICFlightCheck } from 'atom/icon/icon_flightcheck.svg';
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';
import { ReactComponent as ICSearch } from 'atom/icon/icon_search.svg';
import { ReactComponent as ICNotice } from 'atom/icon/icon_notice.svg';
import { ReactComponent as ICSetting } from 'atom/icon/icon_setting.svg';
import { ReactComponent as ICLogin } from 'atom/icon/icon_login.svg';
import { ReactComponent as ICQuestion } from 'atom/icon/icon_question.svg';
import FlightContent from "../flight/FlightContent";
import { ContentType, ContentViewType, NavBarType } from "common/type/NavBarType";
import { contentFormat, contentViewFormat, page } from 'common/store/atom'
import { useRecoilState, useSetRecoilState } from 'recoil';
import NavSideBar from "./NavSideBar";
import NavEtcItem from "./NavEtcItem";
import L from 'leaflet';

const Container = styled.div`
    display: inline-flex;
    height:100vh;
    width:64px;
    z-index:1000;
    margin:0;
    font-family: 'Pretendard';
    cursor:auto;
`
const Wrapper = styled.div`
    background-color:#ffffff;   
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    border-right: 1px solid #D9D9D9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    z-index:1100;

`
const MainNavBar = styled.div`
    width:64px;
    display: flex;
    flex-direction: column;
    `

const LogoImg = styled.div`
    line-height:64px;
    text-align:center;
`

const SubNavBar = styled.div`
    
`

const ContentView = styled.div`
    position:fixed;
    margin-left:64px;
    background-color:#ffffff;   
    z-index:1100;

`

const NavBar = () => {
    const [selectedPage, setPage] = useRecoilState<NavBarType>(page);
    const container = useRef<HTMLDivElement>(null);
    const setContentView = useSetRecoilState<ContentViewType>(contentViewFormat);

    const onButtonClick = (str: NavBarType) => {

        if (selectedPage !== str) {
            setPage(str);
            setContentView('NONE');
        }
    }

    useEffect(() => {
        if (container.current) {
            L.DomEvent.disableClickPropagation(container.current);
            L.DomEvent.disableScrollPropagation(container.current);
        }
    }, [])

    const NavBarFunc = useMemo(() => (
        <Container ref={container}>
            <Wrapper>
                <LogoImg>LOGO</LogoImg>
                <MainNavBar>
                    <NavItem icon={ICFlightCheck} title={"FLIGHT_RESULT"} content={"비행검사"} onclick={() => { onButtonClick("FLIGHT_RESULT") }} />
                    <NavItem icon={ICSearch} title={"SEARCH"} content={"검색"} onclick={() => { onButtonClick("SEARCH") }} />
                    <NavItem icon={ICMarking} title={"MARKING"} content={"마킹"} onclick={() => { onButtonClick("MARKING") }} />
                    <NavItem icon={ICNotice} title={"NOTICE"} content={"공지사항"} onclick={() => { onButtonClick("NOTICE") }} />
                    <NavItem icon={ICSetting} title={"SETTING"} content={"설정"} onclick={() => { onButtonClick("SETTING") }} />
                </MainNavBar>
                <SubNavBar>
                    <NavEtcItem icon={ICQuestion} title={"도움말"} onclick={() => { }} isClicked={false} />
                    <NavEtcItem icon={ICLogin} title={"로그인"} onclick={() => { }} isClicked={false} />
                </SubNavBar>
            </Wrapper>
            {selectedPage &&
                <ContentView>
                    <NavSideBar selectedPage={selectedPage} />
                </ContentView>}

        </Container>
    ), [selectedPage])

    return NavBarFunc
}
export default NavBar;