import React from 'react'
import styled from '@emotion/styled';
import { NavBarType } from 'common/type/NavBarType';
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';


type propType = {
    setPage: (a: NavBarType) => void;
    selectedPage: NavBarType | null;
    fold: boolean;
    setFold: (b: boolean) => void;
}

type folderType = {
    fold: boolean;
}

const CloseButton = styled.div`
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  position: absolute;
  right: -25px;
  top: calc(50% - 25px);
  width: 25px;
  height: 50px;
  border-width: 1px 1px 1px 0;
  border-style: solid;
  border-color: #DDDDDD;
  transition: 0.1s ease;
  cursor: pointer;
`

const CloseArrow = styled(ICArrowLeft)`
    transform: ${(props: folderType) => (!props.fold ? 'rotateZ(180deg)' : 'rotateZ(0deg)')};
    margin: 17px 7px;
`

function NavCloseButton(prop: propType) {
    return (
        <CloseButton onClick={() => {
            prop.setFold(!prop.fold)
        }}>
            <CloseArrow fold={prop.fold} />
        </CloseButton>
    )
}

export default NavCloseButton