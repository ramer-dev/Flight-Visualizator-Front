import React, { useEffect, useRef } from 'react'
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridSortApi, useGridApiRef } from '@mui/x-data-grid'
import { FlightList } from 'common/type/FlightType'
import styled from '@emotion/styled'
import { Button } from '@mui/material'
import CustomToolbar from './CustomToolbar'
import CustomPagination from './CustomPagination'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import LoadingPage from '../LoadingPage'

const Container = styled.div`
    height:100vh;
    width:100%;
`

const Wrapper = styled.div`
    width:100%;
    height:80vh;
`

interface Props {
    edit?: boolean,
}

function CustomTable({ data, edit }: { data: FlightList } & Props) {

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 25,
        page: 0,
    });
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const apiRef = useGridApiRef()
    const rows: GridRowsProp = data.data.map((t, i) => ({ ...t, no: i }))
    const columns: GridColDef[] = [
        { field: 'id', editable: false, flex: 1 },
        { field: 'no', editable: false, flex: 1, valueGetter: (params) => ((params.api.getRowIndexRelativeToVisibleRows(params.id) + 1) ? (paginationModel.page * paginationModel.pageSize) + params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 : ''), headerName: 'No' },
        { field: 'siteName', editable: !!edit, flex: 1, headerName: '표지소' },
        { field: 'frequency', editable: !!edit, flex: 1, headerName: '주파수' },
        { field: 'testId', editable: false, flex: 1 },
        { field: 'txmain', editable: !!edit, flex: 1, headerName: 'TX-M' },
        { field: 'rxmain', editable: !!edit, flex: 1, headerName: 'RX-M' },
        { field: 'txstby', editable: !!edit, flex: 1, headerName: 'TX-S' },
        { field: 'rxstby', editable: !!edit, flex: 1, headerName: 'RX-S' },
        { field: 'angle', editable: !!edit, flex: 1, headerName: '각도' },
        { field: 'distance', editable: !!edit, flex: 1, headerName: '거리' },
        { field: 'height', editable: !!edit, flex: 1, headerName: '고도' },
        { field: 'status', editable: false, flex: 1 },
        { field: 'updatedAt', flex: 1 },
        { field: 'deletedAt', flex: 1 },
    ]

    const columnVisibilityModel = {
        'id': false,
        // 'siteName': false,
        // 'frequency': false,
        'testId': false,
        // 'txmain': false,
        // 'rxmain': false,
        // 'txstby': false,
        // 'rxstby': false,
        // 'angle': false,
        // 'distance': false,
        // 'height': false,
        'status': false,
        'updatedAt': false,
        'deletedAt': false,
    }


    useEffect(() => {
        return () => setRowModesModel({});
    }, [data])

    const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
        setRowModesModel((prevModel) => {
            return {
                ...Object.keys(prevModel).reduce(
                    (acc, id) => ({
                        ...acc,
                        [id]: { mode: GridRowModes.View },
                    }),
                    {},
                ),
                [params.id]: { mode: GridRowModes.Edit }
            }
        })
    }


    const handleRowModesModelChange = React.useCallback(
        (newModel: GridRowModesModel) => {
            setRowModesModel(newModel);
        },
        [],
    );

    // const handleAddRow = () => {
    //     const newRow = [{ id: `add-${id++}` }]
    //     apiRef.current.updateRows(newRow);
    // }

    // const handleSubmit = () => {
    //     apiRef.current.setSortModel([]);
    //     console.log(apiRef.current.getSortModel())
    // }

    const handleRowUpdate = () => {
        console.log(rows)
        apiRef.current.setRows(rows?.map((t, i) => ({ ...t, no: i })))
    }
    return (
        <Container>
            <Wrapper>
                <DataGrid apiRef={apiRef} editMode='row' rows={rows} columns={columns}
                    columnVisibilityModel={columnVisibilityModel}
                    slots={{ toolbar: CustomToolbar, pagination: CustomPagination, noRowsOverlay: CustomNoRowsOverlay, loadingOverlay: LoadingPage }}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    processRowUpdate={handleRowUpdate}
                    onRowClick={handleRowClick}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />
            </Wrapper>
            {/* {
                edit ? (
                    <>
                        <Button onClick={handleAddRow}>add Row</Button>
                        <Button onClick={handleSubmit}>submit</Button>
                    </>
                ) : null
            } */}


        </Container>
    )
}

export default CustomTable