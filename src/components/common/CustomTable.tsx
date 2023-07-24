import React, { useEffect, useRef } from 'react'
import { DataGrid, GridColDef, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, useGridApiRef } from '@mui/x-data-grid'
import { FlightList } from 'common/type/FlightType'
import styled from '@emotion/styled'

const Container = styled.div`
    height:100vh;
    width:calc(100vw - 465px);
`

function CustomTable({ data }: { data: FlightList }) {
    const apiRef = useGridApiRef()
    const editingColumnId = useRef<number>(-1)
    const rows: GridRowsProp = data.data
    // .map(t => {
    //     return { id: t.id, 
    //         siteName: t.siteName, 
    //         frequency: t.frequency, 
    //         testId: t.testId, 
    //         txmain: t.txmain, 
    //         rxmain: t.rxmain, 
    //         txstby: t.txstby, 
    //         rxstby: t.rxstby, 
    //         angle: t.angle, 
    //         distance: t.distance, 
    //         height: t.height,
    //         status:t.status,
    //         updatedAt:t.updatedAt,
    //         deletedAt:t.deletedAt }
    // });

    const columns: GridColDef[] = [

        { field: 'id', editable: true },
        { field: 'siteName', editable: true },
        { field: 'frequency', editable: true },
        { field: 'testId', editable: true },
        { field: 'txmain', editable: true },
        { field: 'rxmain', editable: true },
        { field: 'txstby', editable: true },
        { field: 'rxstby', editable: true },
        { field: 'angle', editable: true },
        { field: 'distance', editable: true },
        { field: 'height', editable: true },
        { field: 'status', editable: true },
        { field: 'updatedAt' },
        { field: 'deletedAt' },

    ]

    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    useEffect(() => {
        console.log('rerender')

        return () => setRowModesModel({});
    }, [data])
    // const handleRowDoubleClick = (params: GridCellParams, e:React.MouseEvent) => {
    // if(editingColumnId.current > 0) apiRef.current.stopRowEditMode({id:editingColumnId.current})
    // apiRef.current.startRowEditMode({id:params.id})
    // editingColumnId.current = params.id;
    // }

    const handleRowClick = (params: GridRowParams, event: React.MouseEvent) => {
        console.log(Object.keys(rowModesModel))
        event.stopPropagation()
        //     if (Object.keys(rowModesModel).length) {
        //         setRowModesModel({
        //             // [Object.keys(rowModesModel)[0]]: { mode: GridRowModes.View },
        //             [params.id]: { mode: GridRowModes.Edit }
        //         })
        //     } else {
        //         setRowModesModel({ [params.id]: { mode: GridRowModes.Edit } })
        //     }

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

    const test = () => {
        console.log(rowModesModel);
    }
    return (
        <Container>
            <DataGrid apiRef={apiRef} editMode='row' rows={rows} columns={columns}
                rowModesModel={rowModesModel}
                onRowClick={handleRowClick}
            // onCellClick={test}
            // onRowModesModelChange={handleRowModesModelChange}
            />
        </Container>
    )
}

export default CustomTable