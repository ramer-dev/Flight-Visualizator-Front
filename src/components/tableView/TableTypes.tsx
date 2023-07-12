import { FlightResult } from "common/type/FlightType";

export interface TableEditCellType extends FlightResult {
    no: number,
    action: any
    isNew: boolean;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof FlightResult;
    label: string;
    numeric: boolean;
}



export const headCells: readonly HeadCell[] = [
    { id: 'id', label:'No', numeric: true, disablePadding: false },
    // { id: 'no', numeric: true, disablePadding: true },
    { id: 'siteName',label:'표지소', numeric: false, disablePadding: true },
    { id: 'frequency',label:'주파수', numeric: true, disablePadding: true },
    { id: 'txmain',label:'TX-M', numeric: false, disablePadding: true },
    { id: 'rxmain', label:'RX-M',numeric: false, disablePadding: true },
    { id: 'txstby',label:'TX-S', numeric: false, disablePadding: true },
    { id: 'rxstby', label:'RX-S',numeric: false, disablePadding: true },
    { id: 'angle',label:'각도', numeric: true, disablePadding: true },
    { id: 'distance', label:'거리',numeric: true, disablePadding: true },
    { id: 'height', label:'고도',numeric: true, disablePadding: true },
    // { id: 'action', numeric: true, disablePadding: false }
]

export type Order = 'asc' | 'desc';