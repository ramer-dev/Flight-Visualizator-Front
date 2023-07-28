import { GridRowId } from '@mui/x-data-grid';
import React from 'react'
interface Props {
    addFunction: (e: React.MouseEvent) => void;
    delFunction: (i: GridRowId, e: React.MouseEvent) => void;
    idx: GridRowId;
    isLast?: boolean;
}
function CustomEditCell({ addFunction, delFunction, idx, isLast}: Props) {
    return (
        <div>
            {isLast ? <span onClick={addFunction}>+</span> : null}   <span onClick={(e: React.MouseEvent) => delFunction(idx, e)}>-</span>
        </div>
    )
}

export default CustomEditCell