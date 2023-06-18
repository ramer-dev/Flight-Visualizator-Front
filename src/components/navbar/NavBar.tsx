import styled from "@emotion/styled";
import { useEffect } from 'react';
import NavItem from "./NavItem";
import { ReactComponent as ICFlightCheck } from 'atom/icon/icon_flightcheck.svg';
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';
import { ReactComponent as ICSearch } from 'atom/icon/icon_search.svg';
import { ReactComponent as ICNotice } from 'atom/icon/icon_notice.svg';
import { ReactComponent as ICSetting } from 'atom/icon/icon_setting.svg';
import { ReactComponent as ICLogin } from 'atom/icon/icon_login.svg';
import { ReactComponent as ICQuestion } from 'atom/icon/icon_question.svg';
import { NavBarType, SubPageType } from "common/type/NavBarType";
import { fold, page, subPage } from 'common/store/atom'
import { useRecoilState } from 'recoil';
import NavSideBar from "./NavSideBar";
import NavEtcItem from "./NavEtcItem";
import { Fab } from "@mui/material";
import NavScreen from "./NavScreen";
import NavCloseButton from "./NavCloseButton";

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

const LogoImg = styled.a`
    height:64px;
    line-height:64px;
    text-align:center;
    font-weight:500;
    color:#aaa;
    cursor:pointer;
    &:hover{
        color:#000;
    }
`

const SubNavBar = styled.div`
    
`

const ContentView = styled.div`
    width:350px;
    background-color:#ffffff;   

`


const NavBar = () => {
    const onLogoClick = (e: any) => {
        e.preventDefault();
        setPage(null);
    }
    const [selectedPage, setPage] = useRecoilState<NavBarType>(page);
    const [folded, setFold] = useRecoilState<boolean>(fold);
    const [_subPage, setSubPage] = useRecoilState<SubPageType>(subPage);

    useEffect(() => {

    }, [selectedPage])

    const onButtonClick = (str: NavBarType) => {
        setPage(str);
        setFold(true);
    }

    return (
        <Container>
            <Wrapper>
                <LogoImg onClick={onLogoClick}>LOGO</LogoImg>
                <MainNavBar>
                    <NavItem icon={ICFlightCheck} title={"FLIGHT_RESULT"} content="비행검사" onclick={() => { onButtonClick("FLIGHT_RESULT") }} />
                    <NavItem icon={ICSearch} title={"SEARCH"} content="검색" onclick={() => { onButtonClick("SEARCH") }} />
                    <NavItem icon={ICMarking} title={"MARKING"} content="마킹" onclick={() => { onButtonClick("MARKING") }} />
                    <NavItem icon={ICNotice} title={"NOTICE"} content="공지사항" onclick={() => { onButtonClick("NOTICE") }} />
                    <NavItem icon={ICSetting} title={"SETTING"} content="설정" onclick={() => { onButtonClick("SETTING") }} />
                </MainNavBar>
                <SubNavBar>
                    <NavEtcItem icon={ICQuestion} title={"도움말"} onclick={() => { }} isClicked={false} />
                    <NavEtcItem icon={ICLogin} title={"로그인"} onclick={() => { }} isClicked={false} />
                </SubNavBar>
            </Wrapper>

            {/* 페이지 선택 시, folded가 true라면 페이지 정상 표출
            fold된 상태라면 ArrowButton만 표출 
            그 외엔 null*/}
            {/* {
                selectedPage && (
                    <>
                        {folded && (
                            <>
                                <ContentView>
                                    <NavSideBar selectedPage={selectedPage} setPage={setPage} subPage={_subPage} setSubPage={setSubPage}/>
                                </ContentView>
                                <NavScreen selectedPage={selectedPage} setPage={setPage} subPage={_subPage} setSubPage={setSubPage}/>
                            </>
                        )}
                        <NavCloseButton selectedPage={selectedPage} setPage={setPage} fold={folded} setFold={setFold} />
                    </>
                )
            } */}

        </Container>
    )
}
export default NavBar;