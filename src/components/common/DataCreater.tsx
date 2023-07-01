import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FlightResult, FlightResultModel } from "common/type/FlightType";

export const Field: GridColDef[] = [
    { field: 'id', headerName: 'ID' , flex:0.5},
    { field: 'siteName', headerName: '표지소', editable: true, flex:0.75},
    { field: 'frequency', headerName: '주파수', editable: true, flex:1},
    { field: 'txmain', headerName: 'TX-M', editable: true, flex:0.5 },
    { field: 'rxmain', headerName: 'RX-M', editable: true, flex:0.5 },
    { field: 'txstby', headerName: 'TX-S', editable: true, flex:0.5},
    { field: 'rxstby', headerName: 'RX-S', editable: true, flex:0.5},
    { field: 'angle', headerName: '각도', editable: true, flex:0.5 },
    { field: 'distance', headerName: '거리', editable: true, flex:0.5 },
    { field: 'height', headerName: '고도', editable: true, flex:0.5 },
    {
        field: 'delete', renderCell: () => <Button color="warning" variant='outlined' size='small' >-</Button>, flex:0.5
    }
]

export const TempData: FlightResultModel[] = [{
    siteName: '부안',
    frequency: 121.5,
    txmain: '5/5',
    rxmain: '5/5',
    txstby: '5/5',
    rxstby: '5/5',
    angle: 150,
    distance: 35,
    height: 5500,
    id: 1,
},
{
    siteName: '안양',
    frequency: 121.4,
    txmain: '5/4',
    rxmain: '5/4',
    txstby: '5/3',
    rxstby: '5/6',
    angle: 150,
    distance: 35,
    height: 5500,
    id: 2,
}]