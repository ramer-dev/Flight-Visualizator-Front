import styled from '@emotion/styled';
import { useState } from 'react';

type WrapperStyleType = {
    isChecked: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 58px;
  gap: 5px;
  transition: 0.2s all ease;
  padding: ${(props: WrapperStyleType) => (props.isChecked ? '10px 0' : 0)};
  cursor: pointer;

  width: 100%;
  background: ${(props: WrapperStyleType) =>
    (props.isChecked
        ? 'linear-gradient(90deg, rgb(43, 111, 214) 0%, rgb(43, 111, 214) 4.9%,rgba(43, 111, 214, 0.28) 5%, rgba(255, 255, 255, 0) 50%)'
        : null)};
`

const SubTitle = styled.p`
  font-size: 12px;
  margin: 0;
`
type NavItemType = {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    isClicked: boolean;
    title: string;
    onclick?: () => void;
}
// prop : 전달된 id, set ID함수
const NavItem = (props: NavItemType) => {
    const Icon = props.icon;
    // const page = props.page;
    return (
        <Wrapper onClick={props.onclick} isChecked={props.isClicked}>
            <Icon />
            {props.isClicked ?
                <SubTitle>{props.title}</SubTitle>
                : null}
        </Wrapper>
    )
}

export default NavItem;