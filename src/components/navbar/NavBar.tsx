import styled from "@emotion/styled";
import { useState, useEffect } from 'react';

const Container = styled.div`
    position:fixed;
    left:0;
    top:0;
    height:100vh;
    width:50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index:100;
    border-right: 1px solid #D9D9D9;
    background-color:#ffffff;   
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const Item = styled.li(props => ({
    listStyle: 'none'
}))

const NavBar = () => {
    const [page, setPage] = useState('')

    useEffect(() => {
        console.log(page);

    }, [page])


    return (
        <Container>
            <Wrapper>
                <Item onClick={() => { setPage("1") }}>alpha</Item>
                <Item onClick={() => { setPage("2") }}>beta</Item>

            </Wrapper>
        </Container>
    )
}

export default NavBar;