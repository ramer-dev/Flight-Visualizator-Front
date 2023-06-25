import React from 'react'
import styled from "@emotion/styled";
import { TextField } from '@mui/material';
import { useFormControl } from "@mui/material/FormControl"

export const StyledInputBox = styled(TextField)`
  border-radius: 5px;
  font-size:16px;
  outline:#8e8e8e;
  margin:10px 0;
  
  &  .Mui-focused .MuiInputBase-input {
    outline:"#5096FF"
  }
`