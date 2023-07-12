import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRowModel, useGridApiRef, GridCellModesModel, GridCellParams, GridCellModes } from '@mui/x-data-grid'
import { TempData } from '../DataCreater'
import styled from '@emotion/styled'
import { Box, Button, LinearProgress } from '@mui/material'
import { FlightList, FlightResult } from 'common/type/FlightType'
import { CustomFooter } from '../CustomFooter'
import { useRecoilValue } from 'recoil'
import { siteState } from 'common/store/atom'

export const Field: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 50, maxWidth: 100, flex:1},
    { field: 'no', headerName: 'No',  minWidth: 50, maxWidth: 100,},
    { field: 'siteName', headerName: '표지소', type: 'singleSelect', editable: true, minWidth: 50, maxWidth: 100, valueOptions: ['부안', '안양'], flex:1 },
    { field: 'frequency', headerName: '주파수', editable: true, minWidth: 100, maxWidth: 100, flex:1 },
    { field: 'txmain', headerName: 'TX-M', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    { field: 'rxmain', headerName: 'RX-M', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    { field: 'txstby', headerName: 'TX-S', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    { field: 'rxstby', headerName: 'RX-S', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    { field: 'angle', headerName: '각도', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    { field: 'distance', headerName: '거리', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    { field: 'height', headerName: '고도', editable: true, minWidth: 50, maxWidth: 100, flex:1 },
    {
        field: 'delete', headerName: '삭제', renderCell: () => <Button color="warning" variant='outlined' size='small' >-</Button>,
    }
]

type Props = {
    data?: FlightResult[]
}

const callServer = (updatedRow: GridRowModel) => {
    console.log(updatedRow)
    return;
}

function DataGridViewer({ data }: Props) {
    const apiRef = useGridApiRef();
    const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});
    const [load, setLoad] = useState(true);
    const sites = useRecoilValue(siteState)
    useEffect(() => {
        if (data) {
            setLoad(false);
        } else {
            setLoad(true);
        }
    }, [data])
    const row = data ? data.map((item, idx) => ({ no: idx + 1, ...item })) : []

    const handleCellClick = useCallback(
        (params: GridCellParams, event: React.MouseEvent) => {
            if (!params.isEditable) {
                return;
            }

            // Ignore portal
            if (!event.currentTarget.contains(event.target as Element)) {
                return;
            }

            setCellModesModel((prevModel) => {
                return {
                    // Revert the mode of the other cells from other rows
                    ...Object.keys(prevModel).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: Object.keys(prevModel[id]).reduce(
                                (acc2, field) => ({
                                    ...acc2,
                                    [field]: { mode: GridCellModes.View },
                                }),
                                {},
                            ),
                        }),
                        {},
                    ),
                    [params.id]: {
                        // Revert the mode of other cells in the same row
                        ...Object.keys(prevModel[params.id] || {}).reduce(
                            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
                            {},
                        ),
                        [params.field]: { mode: GridCellModes.Edit },
                    },
                };
            });
        },
        [],
    );

    const handleCellModesModelChange = useCallback(
        (newModel: GridCellModesModel) => {
            setCellModesModel(newModel);
        },
        [],
    );

    return (
        <Box sx={{ width: '100%', height: 'calc(100vh - 78px)', overflowY: 'scroll' }}>
            {<DataGrid
                sx={{
                    '& .MuiDataGrid-cell:hover': {
                        color: '#ff4444',
                    },
                    '& .MuiDataGrid-row--editing': {
                        backgroundColor: 'rgba(96, 125, 255, 0.4)'
                    },
                    '& .MuiDataGrid-cell--editing': {
                        background: 'none'
                    },
                }}

                apiRef={apiRef} editMode='row' rows={row} columns={Field}
                processRowUpdate={(updatedRow, originalRow) => callServer(updatedRow)}
                onCellModesModelChange={handleCellModesModelChange}
                onCellClick={handleCellClick}
                onProcessRowUpdateError={callServer}
                slots={{
                    loadingOverlay: LinearProgress,
                    footer: CustomFooter
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
                            pageSize: 5,
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