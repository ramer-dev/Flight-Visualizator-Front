import React from 'react'
import styled from "@emotion/styled";

const InputBox = styled.input`
  border: 3px solid #5096FF;
  border-radius: 5px;
  height:30px;
  font-size:16px;
  color:#8e8e8e;
  padding-left: 10px;
  
`

export default function InputText() {
  return (
    <InputBox type={'text'}>
    </InputBox>
  )
}