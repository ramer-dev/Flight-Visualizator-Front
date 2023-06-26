import React from 'react'
import styled from "@emotion/styled";
import { useFormControl } from "@mui/material/FormControl"
import OutlinedInput from '@mui/material/OutlinedInput';

export const StyledInputBox = styled(OutlinedInput)`
  border-radius: 5px;
  outline:#8e8e8e;
  
  &  .Mui-focused .MuiInputBase-input {
    outline:"#5096FF"
  }

  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`