import styled from '@emotion/styled'
import Title from 'components/common/Title'
import React from 'react'
import { SettingState, SettingStateType } from './SettingStateType'
import { Divider, Fab } from '@mui/material'
import Frequency from './frequency/Frequency'
import Route from './route/Route'
import FixPoint from './fixPoint/FixPoint'
import Area from './area/Area'
import Site from './site/Site'
import Sector from './sector/Sector'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authState } from 'common/store/auth'
import ErrorPage from 'components/common/ErrorPage'
import AddIcon from '@mui/icons-material/Add'
import { contentViewFormat, contentFormat, setting } from 'common/store/atom'

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
const StyledFab = styled(Fab)`
    position:absolute;
    bottom:20px;
    right:10px;
`

function Setting() {
  const SettingContext = React.createContext({})
  const [settingState, setSettingState] = useRecoilState<SettingStateType>(setting)
  const [content, setContent] = useRecoilState(contentFormat)
  const [contentView, setContentView] = useRecoilState(contentViewFormat)
  const auth = useRecoilValue(authState);

  const handlerAddButtnClick = React.useCallback(() => {
    if (settingState.current !== null) {
      setContent('ADD')
      setContentView('MIN')
    }
  }, [settingState.current])

  const openEditWindow = () => {
    if (settingState !== null) {
      setContentView('MIN')
      setContent('EDIT')
    }
  }

  const closeWindow = () => {
    setContent('NONE')
  }

  const changeState = (str: SettingState) => {
    setSettingState({...settingState, current:str});
  }
  
  const changeData = (data: any) => {
    setSettingState({...settingState, data:data})
  }

  React.useEffect(() => {
    console.log(settingState.current);
    closeWindow();
    changeData(null)
  }, [settingState.current])

  const selector = React.useCallback(() => {
    switch (settingState.current) {
      case "frequency":
        return <Frequency openEditWindow={openEditWindow} changeData={changeData}/>
      case "route":
        return <Route />
      case "fixPoint":
        return <FixPoint />
      case "area":
        return <Area openEditWindow={openEditWindow} changeData={changeData}/>
      case "site":
        return <Site />
      case "sector":
        return <Sector />
      default:
        break;
    }
  }, [settingState.current])

  return (
    <>
      <Title>환경설정</Title>
      {auth.role > 1 ?
        <>
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
          <StyledFab color="info" aria-label="add" onClick={handlerAddButtnClick}>
            <AddIcon color="primary" />
          </StyledFab>
        </>
        : <ErrorPage code='403' content="권한이 필요합니다." />
      }
    </>
  )
}

export default Setting