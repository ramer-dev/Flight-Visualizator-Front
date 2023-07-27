import React, { useEffect, useRef } from 'react'
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, useGridApiRef } from '@mui/x-data-grid'
import { FlightList } from 'common/type/FlightType'
import styled from '@emotion/styled'

const Container = styled.div`
    height:100vh;
    width:100%;
`

function CustomTable({ data }: { data: FlightList }) {
    const apiRef = useGridApiRef()
    const rows: GridRowsProp = data.data

    const columns: GridColDef[] = [

        { field: 'id', editable: true, flex: 1 },
        { field: 'siteName', editable: true, flex: 1 },
        { field: 'frequency', editable: true, flex: 1 },
        { field: 'testId', editable: true, flex: 1 },
        { field: 'txmain', editable: true, flex: 1 },
        { field: 'rxmain', editable: true, flex: 1 },
        { field: 'txstby', editable: true, flex: 1 },
        { field: 'rxstby', editable: true, flex: 1 },
        { field: 'angle', editable: true, flex: 1 },
        { field: 'distance', editable: true, flex: 1 },
        { field: 'height', editable: true, flex: 1 },
        { field: 'status', editable: true, flex: 1 },
        { field: 'updatedAt', flex: 1 },
        { field: 'deletedAt', flex: 1 },

    ]

    const columnVisibilityModel = {
        'id': false,
        // 'siteName': false,
        // 'frequency': false,
        // 'testId': false,
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

    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    useEffect(() => {
        console.log('rerender')

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
    return (
        <Container>
            <DataGrid apiRef={apiRef} editMode='row' rows={rows} columns={columns}
                columnVisibilityModel={columnVisibilityModel}

                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowClick={handleRowClick}
            />
        </Container>
    )
}

export default CustomTable