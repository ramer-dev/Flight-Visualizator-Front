import React from 'react'
import styled from '@emotion/styled';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';


type WrapperStyleType = {
    isChecked: boolean;
}

const Wrapper = styled.div`
  display: flex;
  height:72px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 58px;
  gap: 5px;
  padding: ${(props: WrapperStyleType) => (props.isChecked ? '10px 0' : 0)};
  cursor: pointer;
  width: 100%;
  color:#9b9b9b;

  &:hover{
    color:black;
    svg path{
        fill:black;
    }
  }
`

const SubTitle = styled.p`
  font-size: 12px;
  margin: 0;
`

type NavItemType = {
    icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
    isClicked: boolean;
    title: string;
    onClick: () => void;
}



export default function NavEtcItem(props: NavItemType) {
    const Icon = props.icon;

    // const page = props.page;
    return (
        <Wrapper onClick={() => {props.onClick()}} isChecked={props.isClicked}>
            <Icon width={24} height={24}/>
            <SubTitle>{props.title}</SubTitle>
                
        </Wrapper>
    )
}