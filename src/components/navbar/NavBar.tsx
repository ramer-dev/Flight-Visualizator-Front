import styled from "@emotion/styled";
import { useState, useEffect, useReducer } from 'react';
import NavItem from "./NavItem";
import { ReactComponent as ICFlightCheck } from 'atom/icon/icon_flightcheck.svg';
import { ReactComponent as ICMarking } from 'atom/icon/icon_marking.svg';

const Container = styled.div`
    height:100vh;
    display: flex;
    justify-content: space-around;
    border-right: 1px solid #D9D9D9;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const MainNavBar = styled.div`
    width:63px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

// const Item = styled.li(props => ({
//     listStyle: 'none'
// }))

const ContentView = styled.div`
    width:350px;
`

type Action = 'FLIGHT_RESULT'
            | 'SEARCH'
            | "MARKING"
            | "NOTICE"
            | "SETTING"

const NavBar = () => {
    const [page, setPage] = useState<Action>("FLIGHT_RESULT")
    useEffect(() => {
       
        console.log(page);
    }, [page])

    const onButtonClick = (str: Action) => {
        setPage(str);
    }



    return (
        <Container>
            <MainNavBar>
                <>
                    <NavItem icon={ICFlightCheck} title={"비행검사"}
                    onclick={() => { onButtonClick("FLIGHT_RESULT") }} 
                    isClicked={page==="FLIGHT_RESULT"} />
                    <NavItem icon={ICMarking} title={"마킹"}
                    onclick={() => { onButtonClick("MARKING") }} 
                    isClicked={page==="MARKING"} />
                </>
            </MainNavBar>
            {page ? <ContentView>
                zz
            </ContentView> : null}
        </Container>
    )
}

export default NavBar;