import React, { useRef, useState } from 'react'
import styled from '@emotion/styled'
import { TableCell, TextField } from '@mui/material'
import { Input } from '@mui/base'
import { FlightResult } from 'common/type/FlightType';
interface ColumnType {
    id: number,
    column: keyof FlightResult,
    label?: string,
    auth?: number,
    children: any;
    mutateRowData?: (id: number, col: keyof FlightResult, value: number|string) => void;
}

const Cell = styled(TableCell)`
`

const TableInput = styled(TextField)`
    & .MuiInputBase-root {
        border: 1px solid #bcbcbc;
        font-size:14px;
        margin: 0;
        width: 75px;
        font-weight: 400
    }
`


function ViewerColumn({ id, column, label, auth, children, mutateRowData }: ColumnType) {
    const [focused, setFocused] = useState(false);
    const changed = useRef(false);
    const inputValue = useRef(children);
    const FocusHandler = (e: any) => {
        // if (auth) { 
        if (e.type === 'focus') { setFocused(true) }
        else if (e.type === 'blur') { setFocused(false) }
        // }
    }

    const onChangeHandler = (e: any) => {
        changed.current = true;
        inputValue.current = e.target.value;
    }

    const temp = () => {
        if (focused) {
            return <TableInput defaultValue={inputValue.current} size='small' variant='outlined' label={label} autoFocus onChange={onChangeHandler}></TableInput>
        } else {
            if (mutateRowData && changed.current) {
                mutateRowData(id, column, inputValue.current);
                changed.current = false
            }
            return inputValue.current;
        }
    }

    return (

        <Cell sx={{ fontWeight: 400, maxWidth: '100px' }} tabIndex={0} onFocus={FocusHandler} onBlur={FocusHandler}>
            {temp()}
        </Cell>


    )
}

export default ViewerColumn