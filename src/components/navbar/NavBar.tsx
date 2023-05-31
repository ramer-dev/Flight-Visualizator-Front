import styled from "@emotion/styled";
import { useState, useEffect, useReducer } from 'react';
import NavItem from "./NavItem";
import { ReactComponent as ICFlightCheck } from 'atom/icon/icon_flightcheck.svg';
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';
import { ReactComponent as ICSearch } from 'atom/icon/icon_search.svg';
import { ReactComponent as ICNotice } from 'atom/icon/icon_notice.svg';
import { ReactComponent as ICSetting } from 'atom/icon/icon_setting.svg';
import FlightContent from "./flight/FlightContent";
import { NavBarType } from "common/type/NavBarType";
import { page } from 'common/store/atom'
import { useRecoilState } from 'recoil';

const Container = styled.div`
    height:100vh;
    display: flex;
    position: fixed;
    z-index:200;
    justify-content: space-around;
    border-right: 1px solid #D9D9D9;
    background-color:#ffffff;   
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const MainNavBar = styled.div`
    width:64px;
    display: flex;
    flex-direction: column;
    `

// const Item = styled.li(props => ({
//     listStyle: 'none'
// }))

const ContentView = styled.div`
    width:350px;
`

const NavBar = () => {
    const [selected_page, setPage] = useRecoilState<NavBarType>(page)
    useEffect(() => {

    }, [selected_page])

    const onButtonClick = (str: NavBarType) => {
        setPage(str);
    }

    return (
        <Container>
            <MainNavBar>
                <>
                    <NavItem icon={ICFlightCheck} title={"비행검사"} onclick={() => { onButtonClick("FLIGHT_RESULT") }} isClicked={selected_page === "FLIGHT_RESULT"} />
                    <NavItem icon={ICSearch} title={"검색"} onclick={() => { onButtonClick("SEARCH") }} isClicked={selected_page === "SEARCH"} />
                    <NavItem icon={ICMarking} title={"마킹"} onclick={() => { onButtonClick("MARKING") }} isClicked={selected_page === "MARKING"} />
                    <NavItem icon={ICNotice} title={"공지사항"} onclick={() => { onButtonClick("NOTICE") }} isClicked={selected_page === "NOTICE"} />
                    <NavItem icon={ICSetting} title={"설정"} onclick={() => { onButtonClick("SETTING") }} isClicked={selected_page === "SETTING"} />

                </>
            </MainNavBar>
            {selected_page ? <ContentView>
                <FlightContent setPage={setPage}/>
            </ContentView> : null}
        </Container>
    )
}

export default NavBar;