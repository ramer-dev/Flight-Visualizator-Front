import styled from '@emotion/styled';
import React from 'react'
interface Props {
    colors: string[],
    selectedColor: string,
    setColor: (color: string) => void,
    title?: string,
    close?: () => void;
    open?: () => void;
    isOpen: boolean;
}

interface StyledProp {
    color: string,
}

const Item = styled.div`
    cursor:pointer;
    display:inline-block;
    background-color:${({ color }: StyledProp) => color};
    border:1px solid rgba(0,0,0,0.2);
    border-radius:2px;
    width:15px;
    height:15px;
`

const Grid = styled.div`
    display:grid;
    gap:5px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows:1fr 1fr 1fr;
    margin:10px 0;
`
const SelectedDiv = styled.div`
    position:relative;
`
const SelectedHover = styled.div`
    position:absolute;
    width:15px;
    height:15px;
    top:0;
    border:1px solid rgba(0,0,0,0.2);
    border-radius:2px;
    background:rgba(0,0,0,0.3);
`

const Dot = styled.div`
    position:absolute;
    /* margin: 5px 0 0 5px; */
    top:5px;
    left:5px;
    width:5px;
    height:5px;
    border-radius:50%;
    background-color:#fff;
`


const Container = styled.div`
    position:absolute;
    top:0;
    z-index:2500;
    background-color:#fff;
    width:300px;
    border:1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
    padding: 10px;
`

const PickerButton = styled.div`
  border:2px solid rgba(0,0,0,0.2);
  background-color:${({ color }: StyledProp) => color};
  border-radius:5px;
  width:40px;
  height:20px;
  cursor:pointer;
`

const ColorPicker = ({ colors, setColor, selectedColor, title, close, open, isOpen }: Props) =>
    isOpen ?
        <Container onMouseLeave={() => { close && close() }}>
            {title && <h2>{title}</h2>}
            <Grid>
                {
                    colors.map(t => {
                        return selectedColor === t ? <SelectedDiv key={t}>
                            <Item color={t}  onClick={() => { setColor(t); close && close() }} />
                            <SelectedHover><Dot /></SelectedHover>

                        </SelectedDiv>
                            : <Item key={t} color={t} onClick={() => { setColor(t); close && close() }} />
                    })
                }
            </Grid>


            Color: <Item color={selectedColor} /> {selectedColor}

        </Container>

        : <PickerButton color={selectedColor} onMouseEnter={() => { open && open() }} />




export default ColorPicker