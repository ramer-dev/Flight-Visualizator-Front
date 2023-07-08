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
    mutateRowData?: (id: number, col: keyof FlightResult, value: number | string) => void;
}

const Cell = styled(TableCell)`
    transition:0.2s all ease;
    line-height:36px;
    padding:0px 5px;
`
const StyledInput = styled.input`
    box-sizing: border-box;
    outline: 2px solid #5096ff;
    border:none;
    border-radius:2px;
    padding: 4px;
    /* width: 100%;
    min-width: 0; */
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
        onInputFocused(e);
        changed.current = true;
        inputValue.current = e.target.value;
    }

    const onInputFocused = (e:any) => {
        if(column === 'siteName') {
            e.target.style.width = e.target.value.length*2 + 1 + 'ch';
        } else {
            e.target.style.width = e.target.value.length + 1 + 'ch';
        }

    }

    const temp = () => {
        if (focused) {
            // return <TableInput defaultValue={inputValue.current} size='small' variant='outlined' label={label} autoFocus onChange={onChangeHandler}></TableInput>
            return <StyledInput defaultValue={inputValue.current} autoFocus onFocus={onInputFocused} onChange={onChangeHandler} />
        } else {
            if (mutateRowData && changed.current) {
                mutateRowData(id, column, inputValue.current);
                changed.current = false
            }
            return inputValue.current;
        }
    }

    return (

        <Cell align={'left'} sx={{ fontWeight: 400, maxWidth: '100px' }} tabIndex={0} onFocus={FocusHandler} onBlur={FocusHandler}>
            {temp()}
        </Cell>


    )
}

export default ViewerColumn