import styled from "@emotion/styled";
import { useEffect, useRef, useState } from 'react';
import NavItem from "./NavItem";
import FlightListIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import MarkingIcon from '@mui/icons-material/RoomOutlined';
import NoticeIcon from '@mui/icons-material/NotificationImportantOutlined';
import SettingIcon from '@mui/icons-material/Tune';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionIcon from '@mui/icons-material/HelpOutline';
import { ContentViewType, NavBarType } from "common/type/NavBarType";
import { contentViewFormat, page } from 'common/store/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import NavSideBar from "./NavSideBar";
import NavEtcItem from "./NavEtcItem";
import L from 'leaflet';
import LoginComponent from "components/login/LoginComponent";
import { authState } from "common/store/auth";
import { getLogout } from "components/hooks/useLogin";
import { AuthType } from "common/type/AuthType";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
    display: inline-flex;
    height:100vh;
    width:64px;
    z-index:3000;
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
    z-index:2500;

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
    z-index:2000;

`

const NavBar = () => {
    const [selectedPage, setPage] = useRecoilState<NavBarType>(page);
    const [isLogin, setIsLogin] = useRecoilState(authState);
    const container = useRef<HTMLDivElement>(null);
    const setContentView = useSetRecoilState<ContentViewType>(contentViewFormat);
    const [dialogOpen, setDialogOpen] = useState(false);

    const onButtonClick = (str: NavBarType) => {

        if (selectedPage !== str) {
            setPage(str);
            setContentView('NONE');
        }

        if(selectedPage === str) {
            setPage(null);
        }
    }

    useEffect(() => {
        if (container.current) {
            L.DomEvent.disableClickPropagation(container.current);
            L.DomEvent.disableScrollPropagation(container.current);
        }
    }, [])



    const openLogin = () => {
        setDialogOpen(true);
    }

    const closeLogin = () => {
        setDialogOpen(false);
    }

    const Logout = () => {
        getLogout();
        const emptyUser : AuthType = {
            id: "",
            username: "",
            role: 0
        }
        setIsLogin(emptyUser)
    }


    return (
        <>
            <LoginComponent open={dialogOpen} closeLogin={closeLogin} />

            <Container ref={container}>

                <Wrapper>
                    <LogoImg>LOGO</LogoImg>
                    <MainNavBar>
                        <NavItem icon={FlightListIcon} title={"FLIGHT_RESULT"} content={"비행검사"} onclick={() => { onButtonClick("FLIGHT_RESULT") }} />
                        <NavItem icon={SearchIcon} title={"SEARCH"} content={"검색"} onclick={() => { onButtonClick("SEARCH") }} />
                        <NavItem icon={MarkingIcon} title={"MARKING"} content={"마킹"} onclick={() => { onButtonClick("MARKING") }} />
                        <NavItem icon={NoticeIcon} title={"NOTICE"} content={"공지사항"} onclick={() => { onButtonClick("NOTICE") }} />
                        <NavItem icon={SettingIcon} title={"SETTING"} content={"설정"} onclick={() => { onButtonClick("SETTING") }} />
                    </MainNavBar>
                    <SubNavBar>
                        <NavEtcItem icon={QuestionIcon} title={"도움말"} onClick={() => { }} isClicked={false} />
                        <NavEtcItem icon={isLogin.role ? LogoutIcon : LoginIcon} title={isLogin.role ? "로그아웃" : "로그인"} onClick={() => { isLogin.role ? Logout() : openLogin() }} isClicked={false} />

                    </SubNavBar>
                </Wrapper>
                {selectedPage &&
                    <ContentView>
                        <NavSideBar selectedPage={selectedPage} />
                    </ContentView>}

            </Container>

        </>
    )

}
export default NavBar;