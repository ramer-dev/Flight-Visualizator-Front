import styled from '@emotion/styled'
import Title from 'components/common/Title'
import React from 'react'
import { SettingState, SettingStateType } from './SettingStateType'
import { Divider } from '@mui/material'
import Frequency from './frequency/Frequency'
import Route from './route/Route'
import FixPoint from './fixPoint/FixPoint'
import Area from './area/Area'
import Site from './site/Site'
import Sector from './sector/Sector'

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
  const [settingState, setSettingState] = React.useState<SettingStateType>({ current: null })
  const changeState = (str: SettingState) => {
    setSettingState({ current: str });
  }

  React.useEffect(() => {
    console.log(settingState.current);
  }, [settingState])
  const selector = React.useCallback(() => {
    switch (settingState.current) {
      case "frequency":
        return <Frequency />
      case "route":
        return <Route />
      case "fixPoint":
        return <FixPoint />
      case "area":
        return <Area />
      case "site":
        return <Site />
      case "sector":
        return <Sector />
      default:
        break;
    }
  }, [settingState])
  return (
    <SettingContext.Provider value={settingState}>
      <Title>환경설정</Title>
      <GridContainer>
        <Item onClick={() => { changeState("site") }}>표지소</Item>
        <Item onClick={() => { changeState("route") }}>항로</Item>
        <Item onClick={() => { changeState("fixPoint") }}>픽스점</Item>
        <Item onClick={() => { changeState("frequency") }}>주파수</Item>
        <Item onClick={() => { changeState("sector") }}>섹터</Item>
        <Item onClick={() => { changeState("area") }}>구역</Item>
      </GridContainer>
      <Divider sx={{ margin: '10px 0' }} />
      <div>
        {selector()}
      </div>
    </SettingContext.Provider>
  )
}

export default Setting