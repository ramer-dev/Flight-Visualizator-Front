import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { TempData } from './DataCreater'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'

export const Field: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth:50, maxWidth:100 },
    { field: 'siteName', headerName: '표지소', editable: true, minWidth:50, maxWidth:100},
    { field: 'frequency', headerName: '주파수', editable: true, minWidth:50, maxWidth:100},
    { field: 'txmain', headerName: 'TX-M', editable: true, minWidth:50, maxWidth:100},
    { field: 'rxmain', headerName: 'RX-M', editable: true, minWidth:50, maxWidth:100},
    { field: 'txstby', headerName: 'TX-S', editable: true,minWidth:50, maxWidth:100 },
    { field: 'rxstby', headerName: 'RX-S', editable: true, minWidth:50, maxWidth:100},
    { field: 'angle', headerName: '각도', editable: true, minWidth:50, maxWidth:100},
    { field: 'distance', headerName: '거리', editable: true, minWidth:50, maxWidth:100},
    { field: 'height', headerName: '고도', editable: true, minWidth:50, maxWidth:100},
    {
        field: 'delete', renderCell: () => <Button color="warning" variant='outlined' size='small' >-</Button>,
    }
]

function DataGridViewer() {
    return (
        <Box sx={{width:'100%'}}>
            <DataGrid editMode='row' rows={TempData} columns={Field}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            delete: false,
                        }
                    },
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick />
        </Box>
    )
}

export default React.memo(DataGridViewer)