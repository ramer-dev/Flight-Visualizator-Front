import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import React from 'react'
import { ChromePicker, Color, CompactPicker } from 'react-color'
import ColorPicker from './ColorPicker'
interface StyledProp {
  color: string,
}

const Container = styled.div`
  display:flex;
`

const Content = styled.div`
  display:flex;
`



function AreaAdd() {
  const [color, setColor] = React.useState('#fff')
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);
  const [colorError, setColorError] = React.useState(false);
  const colorRef = React.useRef<HTMLInputElement>();
  const open = () => setIsColorPickerOpen(true);
  const close = () => setIsColorPickerOpen(false);

  React.useEffect(() => {
    
  },[color])
  return (
    <Container>
        <Content>
          <TextField label='색상' size="small" inputRef={colorRef}></TextField>
        <ColorPicker selectedColor={color} title={"구역 색상 선택"} open={open} close={close} isOpen={isColorPickerOpen}
        colors={['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']}
        setColor={setColor} />
        </Content>



    </Container>

  )
}

export default AreaAdd