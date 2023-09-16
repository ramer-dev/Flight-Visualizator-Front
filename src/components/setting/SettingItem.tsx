import React from 'react'
import RadioIcon from '@mui/icons-material/SettingsInputAntenna';
import styled from '@emotion/styled';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import { SvgIcon, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconComponent } from '@mui/icons-material';
const Item = styled.div`
  background-color:#ddd;
  width:100px;
  height:100px;
  border-radius:50%;
  line-height:100px;
  text-align:center;
  cursor:pointer;
  transition:0.2s all ease;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  &:hover {
    background-color: #5096ff;
    color:white;
  }
`

interface Props {
    onclick : (e:React.MouseEvent) => void;
    text: string | JSX.Element,
    Icon: SvgIconComponent
}

function SettingItem({onclick, text, Icon}: Props) {
    return (
        <Item onClick={onclick}>
            <Icon sx={{margin:1, fontSize:35}}/>
            <Typography>{text}</Typography>
        </Item>
    )
}

export default SettingItem