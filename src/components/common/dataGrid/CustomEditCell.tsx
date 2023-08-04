import { GridRowId } from '@mui/x-data-grid';
import React, { useState } from 'react'
interface Props {
    addFunction: (e: React.MouseEvent) => void;
    delFunction: (e: React.MouseEvent) => void;
    idx: GridRowId;
    isLast?: boolean;
}
function CustomEditCell({ addFunction, delFunction, idx, isLast}: Props) {
    const [last, setLast] = useState(isLast);
    const handlerFocus = (e: any) => {
        addFunction(e)
        setLast(false);
    }
    return (
        <div>
            {/* {last ? <span  onFocus={handlerFocus} tabIndex={0}>+</span> : null}   <span onClick={(e: React.MouseEvent) => delFunction(idx, e)}>-</span> */}
            <span onClick={(e: React.MouseEvent) => delFunction( e)}>-</span>
        </div>
    )
}

export default CustomEditCell