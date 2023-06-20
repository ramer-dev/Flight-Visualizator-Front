import styled from "@emotion/styled";
import { useState, useEffect, useReducer } from 'react';
import NavItem from "./NavItem";
import { ReactComponent as ICFlightCheck } from 'atom/icon/icon_flightcheck.svg';
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';
import { ReactComponent as ICSearch } from 'atom/icon/icon_search.svg';
import { ReactComponent as ICNotice } from 'atom/icon/icon_notice.svg';
import { ReactComponent as ICSetting } from 'atom/icon/icon_setting.svg';
import { ReactComponent as ICLogin } from 'atom/icon/icon_login.svg';
import { ReactComponent as ICQuestion } from 'atom/icon/icon_question.svg';
import FlightContent from "./flight/FlightContent";
import { ContentType, NavBarType } from "common/type/NavBarType";
import { contentFormat, contentViewFormat, page } from 'common/store/atom'
import { useRecoilState } from 'recoil';
import NavSideBar from "./NavSideBar";
import NavEtcItem from "./NavEtcItem";

const Container = styled.div`
    display: flex;
    background-color:#ffffff;   
    height:100vh;
    z-index:200;
    position: fixed;
`
const Wrapper = styled.div`
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    border-right: 1px solid #D9D9D9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const MainNavBar = styled.div`
    width:64px;
    display: flex;
    flex-direction: column;
    `

const LogoImg = styled.div`
    
`

const SubNavBar = styled.div`
    
`

const ContentView = styled.div`
    background-color:#ffffff;   

`

const NavBar = () => {
    const [selectedPage, setPage] = useRecoilState<NavBarType>(page);
    const [content, setContent] = useRecoilState<ContentType>(contentFormat); 
    const [contentView, setContentView] = useRecoilState<boolean>(contentViewFormat);

    const onButtonClick = (str: NavBarType) => {
        setPage(str);
    }

    return (
        <Container>
            <Wrapper>
                <LogoImg>LOGO</LogoImg>
                <MainNavBar>
                    <NavItem icon={ICFlightCheck} title={"FLIGHT_RESULT"} onclick={() => { onButtonClick("FLIGHT_RESULT") }} />
                    <NavItem icon={ICSearch} title={"SEARCH"} onclick={() => { onButtonClick("SEARCH") }}  />
                    <NavItem icon={ICMarking} title={"MARKING"} onclick={() => { onButtonClick("MARKING") }}  />
                    <NavItem icon={ICNotice} title={"NOTICE"} onclick={() => { onButtonClick("NOTICE") }}  />
                    <NavItem icon={ICSetting} title={"SETTING"} onclick={() => { onButtonClick("SETTING") }}  />
                </MainNavBar>
                <SubNavBar>
                    <NavEtcItem icon={ICQuestion} title={"도움말"} onclick={() => { }} isClicked={false} />
                    <NavEtcItem icon={ICLogin} title={"로그인"} onclick={() => { }} isClicked={false} />
                </SubNavBar>
            </Wrapper>
            {selectedPage &&
                <ContentView>
                    <NavSideBar selectedPage={selectedPage} setPage={setPage} content={content} setContent={setContent} contentView={contentView} setContentView={setContentView}/>
                </ContentView>}

        </Container>
    )
}
export default NavBar;