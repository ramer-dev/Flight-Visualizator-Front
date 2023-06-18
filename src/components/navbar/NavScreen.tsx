import { NavBarType, SubPageType } from 'common/type/NavBarType';
import React from 'react';
import styled from '@emotion/styled';

type propType = {
    setPage: (a: NavBarType) => void;
    selectedPage: NavBarType | null;
    subPage:SubPageType;
    setSubPage:(a:SubPageType) => void
}

const Container = styled.div`
    width:calc(100vw - 414px);
    height:100vh;
`

function NavScreen(prop: propType) {
    return (
        <>
            <Container>a</Container>
        </>
    );
}

export default NavScreen;