import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { postArea } from 'common/service/areaService'
import { contentFormat, contentViewFormat } from 'common/store/atom'
import CustomModal from 'components/common/CustomModal'
import ScreenTitle from 'components/common/ScreenTitle'
import useModal from 'components/hooks/useModal'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { AreaDTO } from 'dto/areaDTO'
import Portal from 'module/Portal'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import ColorPicker from './ColorPicker'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  overflow-X:hidden;
`

const Content = styled.div`
  display:flex;
  gap:10px;
  justify-content:end;
`



function AreaAdd() {
  const [color, setColor] = React.useState('')
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
  const setContentView = useSetRecoilState(contentViewFormat)
  const setContent = useSetRecoilState(contentFormat)
  const colorRef = React.useRef<HTMLInputElement>();
  const nameRef = React.useRef<HTMLInputElement>();
  const open = () => setIsColorPickerOpen(true);
  const close = () => setIsColorPickerOpen(false);
  const [modalContext, setModalContext] = React.useState<{ title:string, message:string, close?:()=>void }>({ title: '에러 발생', message: '알 수 없는 오류' });
  const { isModalOpen, openModal, closeModal } = useModal()

  function alertModal(open: () => void, title:string, message:string, close?:()=>void) {
    setModalContext({ title, message, close })
    open()
  }

  React.useEffect(() => {
    if (colorRef.current) {
      colorRef.current.value = color;
    }
  }, [color])

  const closeScreen = () => {
    setContentView('NONE')
    setContent('NONE')
    closeModal();
  }

  const handleSubmit = async () => {
    if (nameRef.current) {
      const body: AreaDTO = {
        areaColor: color,
        areaName: nameRef.current.value
      }
      try {
        await postArea(body);
        alertModal(openModal, '구역 추가 성공', `[ ${body.areaName} ]\n구역 추가에 성공하였습니다.`, closeScreen)
      } catch (e) {
        alertModal(openModal, '구역 추가 성공', `구역 추가에 실패했습니다.`, closeModal)
      } 
    }
  }
  return (
    <Container>
      <Portal>
        <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
      </Portal>
      <ScreenTitle text={'구역 추가'} />
      <Content>
        <TextField label="구역명" size="small" inputRef={nameRef} fullWidth></TextField>
      </Content>
      <Content>
        <TextField sx={{ position: 'relative' }} value={color || ''} fullWidth disabled InputProps={{
          endAdornment: (<ColorPicker selectedColor={color} title={"구역 색상 선택"} open={open} close={close} isOpen={isColorPickerOpen}
            colors={['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']}
            setColor={setColor} />)
        }} label='색상' size="small" inputRef={colorRef}></TextField>

      </Content>
      <Content>
        <Button color='error' onClick={closeScreen}>취소</Button>
        <Button onClick={handleSubmit}>확인</Button>
      </Content>
      <NavCloseButton contentSize={['NONE', 'MIN']} />

    </Container>

  )
}

export default AreaAdd