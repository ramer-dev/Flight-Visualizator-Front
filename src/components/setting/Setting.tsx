import styled from '@emotion/styled'
import Title from 'components/common/Title'
import React from 'react'
import { SettingStateType } from './SettingStateType'

const GridContainer = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap:20px;
`
const Item = styled.div`
  background-color:#ddd;
  width:100px;
  height:100px;
  border-radius:50%;
  line-height:100px;
  text-align:center;
  cursor:pointer;
  &:hover {
    background-color: #5096ff;
    color:white;
  }
`



function Setting() {
  const SettingContext = React.createContext({})
  const [settingState, setSettingState] = React.useState<SettingStateType>({})
  return (
    <SettingContext.Provider value={settingState}>
      <Title>환경설정</Title>
      <GridContainer>
        <Item>표지소</Item>
        <Item>항로</Item>
        <Item>픽스점</Item>
        <Item>주파수</Item>
        <Item>섹터</Item>
        <Item>구역</Item>
      </GridContainer>
      </SettingContext.Provider>
  )
}

export default Setting