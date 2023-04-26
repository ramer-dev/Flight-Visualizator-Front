import styled from "@emotion/styled";
import { useState, useEffect } from 'react';
import NavItem from "./NavItem";
import { ReactComponent as ICFlightCheck } from 'atom/icon/icon_flightcheck.svg';

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

const NavBar = () => {
    const [page, setPage] = useState(0)

    useEffect(() => {
        // if

    }, [page])


    return (
        <Container>
            <MainNavBar>
                <>
                <NavItem icon={ICFlightCheck} page={page}/>
                </>
            </MainNavBar>
            {page ? <ContentView>
                zz
            </ContentView> : null}
        </Container>
    )
}

export default NavBar;