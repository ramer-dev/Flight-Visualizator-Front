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
import { postLogout } from "common/service/loginService";
import { AuthType } from "common/type/AuthType";
import { AnimatePresence, motion } from "framer-motion";
import useConfirm from "components/hooks/useConfirm";
import Portal from "module/Portal";
import CustomConfirm from "components/common/CustomConfirm";
import { ReactComponent as LogoColor } from 'atom/icon/logo_color.svg';
import { ReactComponent as LogoGray } from 'atom/icon/logo_grayscale.svg';

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
    display:flex;
    flex-direction:column;
    align-items:center;
    margin:15px 7px 5px;
    width:50px;
    text-align:center;
    cursor:pointer;
    & > svg {
        width:50px;
    }
`

const SubNavBar = styled.div`
    
`

const ContentView = styled(motion.div)`
    position:fixed;
    margin-left:64px;
    background-color:#ffffff;   
    z-index:2000;
`

const TitleText = styled(motion.div)`
    color:#929292;
    word-break: keep-all;
`

const NavBar = () => {
    const [selectedPage, setPage] = useRecoilState<NavBarType>(page);
    const [isLogin, setIsLogin] = useRecoilState(authState);
    const [logoState, setLogoState] = useState(false);
    const container = useRef<HTMLDivElement>(null);
    const setContentView = useSetRecoilState<ContentViewType>(contentViewFormat);
    const setContentFormat = useSetRecoilState(contentViewFormat)
    const [dialogOpen, setDialogOpen] = useState(false);
    const { isConfirmOpen, closeConfirm, openConfirm } = useConfirm()
    const onButtonClick = (str: NavBarType) => {

        if (selectedPage !== str) {
            setPage(str);
            setContentView('NONE');
        }

        if (selectedPage === str) {
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

        postLogout();
        const emptyUser: AuthType = {
            id: "",
            username: "",
            role: 0
        }
        setContentFormat('NONE')
        setContentView('NONE');
        setPage(null);
        setIsLogin(emptyUser);
    }

    const LogoutConfirm = () => {
        openConfirm();
    }

    const handleLogoMouseOver = () => {
        setLogoState(true);
    }

    const handleLogoMouseOut = () => {
        setLogoState(false);
    }

    return (
        <>
            <Portal>
                <CustomConfirm isOpen={isConfirmOpen} title="로그아웃" message="로그아웃할까요?" confirm={Logout} close={closeConfirm} />
            </Portal>
            <LoginComponent open={dialogOpen} closeLogin={closeLogin} />

            <Container ref={container}>

                <Wrapper>
                    <LogoImg onMouseEnter={handleLogoMouseOver} onMouseLeave={handleLogoMouseOut}>
                        {logoState
                            ? <LogoColor />
                            : <LogoGray />}
                        <TitleText>비행검사 시각화 서비스</TitleText>
                    </LogoImg>
                    <MainNavBar>
                        <NavItem icon={FlightListIcon} title={"FLIGHT_RESULT"} content={"비행검사"} onclick={() => { onButtonClick("FLIGHT_RESULT") }} />
                        <NavItem icon={SearchIcon} title={"SEARCH"} content={"검색"} onclick={() => { onButtonClick("SEARCH") }} />
                        <NavItem icon={MarkingIcon} title={"MARKING"} content={"마킹"} onclick={() => { onButtonClick("MARKING") }} />
                        <NavItem icon={NoticeIcon} title={"NOTICE"} content={"공지사항"} onclick={() => { onButtonClick("NOTICE") }} />
                        {process.env.REACT_APP_ONLY_SETTING === '1' && <NavItem icon={SettingIcon} title={"SETTING"} content={"설정"} onclick={() => { onButtonClick("SETTING") }} />}
                    </MainNavBar>
                    <SubNavBar>
                        <NavEtcItem icon={QuestionIcon} title={"도움말"} onClick={() => { }} isClicked={false} />
                        <NavEtcItem icon={isLogin.role ? LogoutIcon : LoginIcon} title={isLogin.role ? "로그아웃" : "로그인"} onClick={() => { isLogin.role ? LogoutConfirm() : openLogin() }} isClicked={false} />

                    </SubNavBar>
                </Wrapper>
                <AnimatePresence mode='wait'>
                    {selectedPage &&
                        <ContentView initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "tween" }}>
                            <NavSideBar selectedPage={selectedPage} />
                        </ContentView>}
                </AnimatePresence>

            </Container>

        </>
    )

}
export default NavBar;