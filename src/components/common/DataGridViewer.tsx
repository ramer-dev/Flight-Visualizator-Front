import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid'
import { TempData } from './DataCreater'
import styled from '@emotion/styled'
import { Box, Button, LinearProgress } from '@mui/material'
import { FlightList, FlightResult } from 'common/type/FlightType'
import { CustomFooter } from './CustomFooter'

export const Field: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100 },
    { field: 'no', headerName: 'No'},
    { field: 'siteName', headerName: '표지소', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'frequency', headerName: '주파수', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'txmain', headerName: 'TX-M', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'rxmain', headerName: 'RX-M', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'txstby', headerName: 'TX-S', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'rxstby', headerName: 'RX-S', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'angle', headerName: '각도', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'distance', headerName: '거리', editable: true, minWidth: 50, maxWidth: 100 },
    { field: 'height', headerName: '고도', editable: true, minWidth: 50, maxWidth: 100 },
    {
        field: 'delete', headerName: '삭제', renderCell: () => <Button color="warning" variant='outlined' size='small' >-</Button>,
    }
]

type Props = {
    data?: FlightResult[]
}

function DataGridViewer({data}: Props) {
    const apiRef = useGridApiRef();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        if (data) {
            setLoad(false);
        } else {
            setLoad(true);
        }
    }, [data])
    const row  = data ? data.map((item,idx) => ({no : idx + 1, ...item})) : []
    return (
        <Box sx={{ width: '100%', height: 'calc(100vh - 78px)', overflowY: 'scroll' }}>
            {<DataGrid apiRef={apiRef} editMode='row' rows={row} columns={Field}
                slots={{
                    loadingOverlay: LinearProgress,
                    footer:CustomFooter
                }}
                loading={load}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                            delete: false,
                        }
                    },
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick />
            }
            <Button onClick={() => console.log(apiRef.current.getSelectedRows().keys())}>teest</Button>

        </Box>

    )
}

export default React.memo(DataGridViewer)