import styled from '@emotion/styled';
import {useState} from 'react';
import {motion} from 'framer-motion';
import {page} from 'common/store/atom';
import {useRecoilValue} from 'recoil';
import {NavBarType} from 'common/type/NavBarType';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

type WrapperStyleType = {
    isChecked: boolean;
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 58px;
  width: 100%;
  gap: 5px;
  transition: 0.2s all ease;
    /* padding: ${(props: WrapperStyleType) => (props.isChecked ? '10px 0' : '0')}; */
  cursor: pointer;
  background: ${(props: WrapperStyleType) =>
          (props.isChecked
                  ? 'linear-gradient(90deg, rgb(43, 111, 214) 0%, rgb(43, 111, 214) 4.9%,rgba(43, 111, 214, 0.28) 5%, rgba(255, 255, 255, 0) 50%)'
                  : null)};

  &:hover {
    background: linear-gradient(90deg, rgb(43, 111, 214) 0%, rgb(43, 111, 214) 4.9%, rgba(43, 111, 214, 0.28) 5%, rgba(255, 255, 255, 0) 50%)
  }

  svg path {
    fill: ${(props: WrapperStyleType) => (props.isChecked ? 'black' : '#9b9b9b')
    }
`

const SubTitle = styled(motion.div)`
  font-size: 12px;
  margin: 0;
`

type NavItemType = {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    title: string;
    onclick?: () => void;
}
// prop : 전달된 id, set ID함수
const NavItem = (props: NavItemType) => {

    const Icon = props.icon;

    const isClicked = props.title === useRecoilValue<NavBarType>(page)
    // const page = props.page;
    return (
        <Wrapper onClick={props.onclick} isChecked={isClicked}>
            {isClicked ?
                <>
                    <Icon/>
                    <SubTitle
                        initial={{opacity: 0, y: -10}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 1, y: -10}}>{props.title}</SubTitle>
                </>
                : <>
                    <Icon/>
                    <SubTitle initial={{opacity: 0, y: -10}}>{props.title}</SubTitle>
                </>
            }
        </Wrapper>
    )
}

export default NavItem;