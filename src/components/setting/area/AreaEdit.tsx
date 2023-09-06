import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { deleteArea, patchArea } from 'common/service/areaService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { AreaDTO } from 'dto/areaDTO'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SettingStateType } from '../SettingStateType'
import ColorPicker from './ColorPicker'
const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
`

const Content = styled.div`
  display:flex;
  gap:10px;
  justify-content:end;
`
function AreaEdit() {
  const settingState = useRecoilValue<SettingStateType>(setting)
  const [color, setColor] = React.useState('')
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
  const setContentView = useSetRecoilState(contentViewFormat)
  const setContent = useSetRecoilState(contentFormat)
  const colorRef = React.useRef<HTMLInputElement>();
  const nameRef = React.useRef<HTMLInputElement>();
  const open = () => setIsColorPickerOpen(true);
  const close = () => setIsColorPickerOpen(false);
  const closeScreen = () => {
    setContentView('NONE')
    setContent('NONE')
  }

  const handleSubmit = async () => {
    console.log(color, nameRef)
    if (nameRef.current) {
      const body: AreaDTO = {
        areaColor: color,
        areaName: nameRef.current.value
      }
      await patchArea(body, settingState.data.id);
      closeScreen()
    }
  }

  const handleDelete = async () => {
    await deleteArea(settingState.data.id);
    closeScreen();
  }

  React.useEffect(() => {
    if (nameRef.current && settingState?.data) {
      nameRef.current.value = settingState.data?.label;
      setColor(settingState?.data.color)
    } else {
      closeScreen();
    }
  }, [settingState])
  return (
    <Container>
      <ScreenTitle text={'구역 수정'} />
      <Content>
        <TextField label="구역명" size="small" inputRef={nameRef} fullWidth></TextField>
      </Content>
      <Content>
        <TextField sx={{ position: 'relative'}} fullWidth value={color || ''} disabled InputProps={{
          endAdornment: (<ColorPicker selectedColor={color} title={"구역 색상 선택"} open={open} close={close} isOpen={isColorPickerOpen}
            colors={['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']}
            setColor={setColor} />)
        }} label='색상' size="small" inputRef={colorRef}></TextField>

      </Content>
      <Content>
        <Button color='error' variant='outlined' onClick={handleDelete}>구역 삭제</Button>
        <Button color='error' onClick={closeScreen}>취소</Button>
        <Button onClick={handleSubmit}>확인</Button>
      </Content>

    </Container>
  )
}

export default AreaEdit

