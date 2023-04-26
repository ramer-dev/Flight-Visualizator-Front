import styled from '@emotion/styled';
import { useState } from 'react';

const Wrapper = styled.div(props => ({
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width:'calc(100% - 3px)',
    gap:'5px',
    transition: '0.3s all ease',
    padding:'17px 0',

    borderLeft : '3px solid #5096ff',
    background: 'linear-gradient(90deg, rgba(43, 111, 214, 0.28) 0%, rgba(255, 255, 255, 0) 50%)'
}))


const SubTitle = styled.p`
    font-size: 12px;
    margin:0;
`
type NavItemType = {
    icon:React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    page:boolean;

}
// prop : 전달된 id, set ID함수
const NavItem = (props : NavItemType) => {
    const Icon = props.icon;
    const page = props.page;
    return (
        <Wrapper >
            <Icon/>
            <SubTitle>zz</SubTitle>
        </Wrapper>
    )
}

export default NavItem;