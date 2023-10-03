import styled from '@emotion/styled'
import Title from 'components/common/Title'
import React from 'react'
import { SettingState, SettingStateType } from './SettingStateType'
import { Divider, Fab, Typography } from '@mui/material'
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
import SettingItem from './SettingItem'
import SiteIcon from '@mui/icons-material/SettingsInputAntenna';
import RouteIcon from '@mui/icons-material/Timeline';
import SectorIcon from '@mui/icons-material/Place';
import FixPointIcon from '@mui/icons-material/RadioButtonChecked';
import FrequencyIcon from '@mui/icons-material/WifiTethering';
import AreaIcon from '@mui/icons-material/Map';
import { AnimatePresence, motion } from 'framer-motion'
const GridContainer = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap:20px;
`

const StyledFab = styled(Fab)`
    position:absolute;
    bottom:20px;
    right:10px;
`

const Wrapper = styled.div`
  background:#fff;
  z-index:2210;
`
const Typo = styled(motion(Typography))`
  margin: 30px 0;
  text-align:center;
  font-weight: 300;
  color:#999;
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
    setContentView('NONE')
  }

  const changeState = (str: SettingState) => {
    setSettingState({ ...settingState, current: str });
  }

  const changeData = (data: any) => {
    setSettingState({ ...settingState, data: data })
  }

  React.useEffect(() => {
    closeWindow();
    changeData(null)
  }, [settingState.current])

  const selector = React.useCallback(() => {
    switch (settingState.current) {
      case "frequency":
        return <Frequency openEditWindow={openEditWindow} changeData={changeData} />
      case "route":
        return <Route openEditWindow={openEditWindow} changeData={changeData} />
      case "fixPoint":
        return <FixPoint openEditWindow={openEditWindow} changeData={changeData} />
      case "area":
        return <Area openEditWindow={openEditWindow} changeData={changeData} />
      case "site":
        return <Site openEditWindow={openEditWindow} changeData={changeData} />
      case "sector":
        return <Sector openEditWindow={openEditWindow} changeData={changeData} />
      default:
        break;
    }
  }, [settingState.current])

  return (
    <>
      <Title>환경설정</Title>
      {auth.role > 2 ?
        <>
          <GridContainer>
            <SettingItem onclick={() => { changeState("site") }} text={'표지소'} Icon={SiteIcon} />
            <SettingItem onclick={() => { changeState("route") }} text={'항로'} Icon={RouteIcon} />
            <SettingItem onclick={() => { changeState("fixPoint") }} text={'픽스점'} Icon={FixPointIcon} />
            <SettingItem onclick={() => { changeState("frequency") }} text={'주파수'} Icon={FrequencyIcon} />
            <SettingItem onclick={() => { changeState("sector") }} text={'섹터'} Icon={SectorIcon} />
            <SettingItem onclick={() => { changeState("area") }} text={'구역'} Icon={AreaIcon} />
          </GridContainer>
          <Divider sx={{ margin: '30px 0' }} />
          <AnimatePresence>
          <div>
            {selector()}
          </div>
          
            {(settingState.current && !['route','area','frequency'].includes(settingState.current)) &&
              <Typo initial={{ opacity: 0, y:-50 }} animate={{ opacity: 1, y:0 }} exit={{ opacity: 0, y:-50 }} transition={{damping:60}}>좌표는 도분초(DD.MMSS)형식으로 입력해주세요.</Typo>}
          </AnimatePresence>
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