import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { page } from 'common/store/atom';
import { useRecoilValue } from 'recoil';
import { NavBarType } from 'common/type/NavBarType';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { grey } from '@mui/material/colors';
// import Box from '@mui/material/Box';
// import ButtonBase from '@mui/material/ButtonBase';

type WrapperStyleType = {
  check?: "false" | "true";
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
  cursor: pointer;
  padding: ${(props: WrapperStyleType) => props.check === 'true' ? '15px 0' : '0'};
  background: ${(props: WrapperStyleType) => props.check === 'true'
    ? 'linear-gradient(90deg, rgb(43, 111, 214) 0%, rgb(43, 111, 214) 4.9%,rgba(43, 111, 214, 0.28) 5%, rgba(255, 255, 255, 0) 50%)'
    : null};

  &:hover {
    background: ${(props: WrapperStyleType) => props.check === 'true' ? null : 'linear-gradient(90deg, rgba(43, 111, 214, 0.13) 5%, rgba(255, 255, 255, 0) 50%)'};
    /* & svg path {
    fill: ${(props: WrapperStyleType) => (props.check === 'true' ? 'black' : '#9b9b9b')};
    }  */
  };
  /* & svg path {
    fill: ${(props: WrapperStyleType) => (props.check === 'true' ? 'black' : '#9b9b9b')};
  } */
`

const SubTitle = styled(motion.div)`
  font-size: 12px;
  margin: 0;
`;

const IconWrapper = styled(motion.div)`
`;

type NavItemType = {
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  title: string;
  content: string;
  onclick?: () => void;
};

// prop : 전달된 id, set ID함수
const NavItem = (props: NavItemType) => {

  const Icon = props.icon;

  const isClicked = props.title === useRecoilValue<NavBarType>(page)
  // const page = props.page;
  return (
    <Wrapper onClick={props.onclick} check={isClicked ? 'true' : 'false'}>
      {/* {isClicked ? */}
      <>
        <IconWrapper
          initial={{ y: 0 }} animate={{ y: 0 }} exit={{ y: -10 }}>
          <Icon sx={isClicked ? { color: grey[900] } : { color: grey[500] }} />
        </IconWrapper>
        {isClicked ? <SubTitle
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: -10 }}>{props.content}</SubTitle> : null}
      </>
    </Wrapper>
  )
}

export default NavItem;