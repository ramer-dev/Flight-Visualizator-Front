import React from 'react'
import styled from "@emotion/styled";
import { useFormControl } from "@mui/material/FormControl"
import { Select, TextField } from '@mui/material';
// import OutlinedInput from '@mui/material/OutlinedInput';

export const StyledInputBox = styled(TextField)`
  outline:#8e8e8e;
  
  &  .Mui-focused .MuiInputBase-input {
    outline:#5096FF
  }

  /* input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  } */
`

export const StyledSelectBox = styled(Select)`
    outline:#8e8e8e;
  
  &  .Mui-focused .MuiInputBase-input {
    outline:#5096FF
  }
`