import React, { useEffect, useRef } from 'react'
import { DataGrid, GridCellEditStartParams, GridCellEditStopParams, GridCellModes, GridCellModesModel, GridCellParams, GridColDef, GridEventListener, GridPreProcessEditCellProps, GridRowId, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridSortApi, GridValidRowModel, GridValueOptionsParams, MuiEvent, useGridApiRef } from '@mui/x-data-grid'
import { FlightList, FlightResult } from 'common/type/FlightType'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import CustomToolbar from './CustomToolbar'
import CustomPagination from './CustomPagination'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import LoadingPage from '../LoadingPage'
import CustomEditCell from './CustomEditCell'
import { useSetRecoilState } from 'recoil'
import { contentViewFormat } from 'common/store/atom'
import L, { LatLngLiteral } from 'leaflet'
import { useGetSite } from 'components/hooks/useSite'
import Iterator from 'module/Iterator'
import divicon from 'module/NumberIcon'
import { useMap } from 'react-leaflet'
import { Destination } from 'module/Destination'
import { FindMinimumScore } from 'module/ScoreCalculate'
import { frequencyRegex } from 'common/regex/regex'
import { patchFlightData, postFlightData } from 'common/service/flightService'

const Container = styled.div`
    height:100vh;
    width:100%;
`

const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '80vh',
    '& .Mui-error': {
        color: 'red'
    }
}))


interface Props {
    edit?: boolean,
}



function CustomTable({ data, edit }: { data: FlightList } & Props) {
    const setContentView = useSetRecoilState(contentViewFormat)

    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 100,
        page: 0,
    });
    const [checkboxSelection, setCheckboxSelection] = React.useState<Map<GridRowId, GridValidRowModel>>();
    const [rowModesModel, setRowModesModel] = React.useState<GridCellModesModel>({});
    const map = useMap();
    const id = useRef(1);
    const apiRef = useGridApiRef()
    const siteData = useGetSite();
    const rows = useRef(data.data.map((t, i) => ({ ...t, no: i })));
    const layerGroup = useRef(L.layerGroup([], { pane: 'marking' }))
    const columns: GridColDef[] = [
        { field: 'id', editable: false, flex: 1 },
        { field: 'no', editable: false, flex: 1, valueGetter: (params) => ((params.api.getRowIndexRelativeToVisibleRows(params.id) + 1) ? (paginationModel.page * paginationModel.pageSize) + params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 : ''), headerName: 'No' },
        {
            field: 'siteName', editable: !!edit, flex: 1, headerName: '표지소', type: 'string',
            // valueOptions: (params: GridValueOptionsParams) => {

            //     return siteData.data.map(t => {return {value: t.siteId, label:t.siteName}})
            // }
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (params.hasChanged) {
                    const hasError = !siteData.data.map(t => t.siteName).includes(params.props.value)
                    return { ...params.props, error: hasError }
                }
                return { ...params.props }
            }
        },
        {
            field: 'frequency', editable: !!edit, flex: 1, headerName: '주파수', type: 'number',
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (params.hasChanged) {
                    const hasError = String(params.props.value).match(frequencyRegex)
                    const lengthError = String(params.props.value).length > 7

                    console.log(hasError, lengthError)
                    return { ...params.props, error: !hasError || lengthError }

                }
                return { ...params.props }
            }
        },
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
        // {
        //     field: 'action', type: 'actions', editable: false, flex: 1, headerName: '',

        //     renderCell: (params) =>
        //         <CustomEditCell addFunction={handleAddRow} delFunction={handleDeleteRow} idx={params.id} isLast={apiRef.current.getAllRowIds().indexOf(params.id) === apiRef.current.getRowsCount() - 1} />
        //     ,

        // }
    ]

    // const RenderEditCell = React.useMemo(() => , [])

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
        // 'action': !!edit
    }


    useEffect(() => {
        const obj: { [key: string]: GridValidRowModel } = {};
        checkboxSelection?.forEach((value, key) => {
            obj[String(key)] = value;
        })
        const layer = []
        for (let i in obj) {
            const siteCoords = siteData.data.filter(t => t.siteName === obj[i].siteName)[0]?.siteCoordinate;
            const target = Destination(siteCoords, obj[i].angle, obj[i].distance);
            layer.push(L.marker(target as LatLngLiteral, {
                icon: divicon(FindMinimumScore(obj[i].txmain, obj[i].rxmain, obj[i].txstby, obj[i].rxstby),
                    apiRef.current.getRowIndexRelativeToVisibleRows(i))
            }).bindTooltip('text'))
        }
        layerGroup.current.clearLayers()
        for (let i of layer) {
            layerGroup.current.addLayer(i)
        }
        layerGroup.current.addTo(map);

        return () => {
            setRowModesModel({});
            layerGroup.current.clearLayers();
        }

    }, [data, checkboxSelection])




    const handleRowClick = (params: GridCellParams, event: React.MouseEvent) => {
        if (!params.isEditable) {
            return;
        }

        // Ignore portal
        if (!event.currentTarget.contains(event.target as Element)) {
            return;
        }
        setRowModesModel((prevModel) => {
            // return {
            //     ...Object.keys(prevModel).reduce(
            //         (acc, id) => ({
            //             ...acc,
            //             [id]: { mode: GridRowModes.View },
            //         }),
            //         {},
            //     ),
            //     [params.id]: { mode: GridRowModes.Edit }
            // }

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
                    // [params.field]: { mode: GridCellModes.Edit },
                },
            };
        });
    }


    const handleRowModesModelChange = React.useCallback(
        (newModel: GridCellModesModel) => {
            setRowModesModel(newModel);
        },
        [],
    );

    const handleAddRow = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newRow = { id: `add-${id.current++}` }
        apiRef.current.updateRows([newRow]);
        console.log(apiRef.current.getRowsCount())
    }

    const validateInput = (data: FlightResult[]) => {
        for (let item of data) {
            if (!item.siteName) {
                console.log(item, '표지소 입력')
                return true;
            }

            if (!item.frequency) {
                console.log(item, '주파수 입력')
                return true;
            }

            if (!item.angle) {
                console.log(item, '방위각 입력')
                return true;
            }

            if (!item.distance) {
                console.log(item, '거리 입력')
                return true;
            }

            if ((!item.txmain || !item.rxmain) && (!item.txstby || !item.rxstby)) {
                console.log(item, '검사결과 입력')
                return true;
            }

        }
        return false;
    }

    const handleSubmit = () => {
        const rowModel = apiRef.current.getRowModels()
        const editArray: FlightResult[] = [];

        for (const t of rowModel) {
            // 현재 Page를 넘어가는 경우 No가 지정이 안되는 에러가 있음.
            // 에러 하이라이팅시 문제 될 것. 기능에는 지장 없음.
            const item: any = { no: apiRef.current.getRowIndexRelativeToVisibleRows(t[0]), testId: data.id }
            for (const key in t[1]) {
                if (key !== null) {
                    item[key] = t[1][key];
                }
            }

            // 불필요한 속성 명시적으로 삭제
            if (String(item.id).startsWith('add')) {
                delete item.id
                editArray.push(item);
            } else {
                // 신규 추가의 경우 임시 입력된 ID key 삭제
                editArray.push(item)
            }


            if (String(item.id).startsWith('add')) {
            }

            if (validateInput(editArray)) {
                return;
            }

            delete item.no;
            delete item.status;
            delete item.deletedAt;
            delete item.updatedAt;

        }
        
        patchFlightData(editArray)
        console.log(editArray)

    }

    const handleRowUpdate = () => {
        console.log(rows)
        apiRef.current.setRows(rows.current?.map((t, i) => ({ ...t, no: i })))
    }

    const handleDeleteRow = (e: React.MouseEvent) => {
        e.stopPropagation()
        // console.log(apiRef.current.getAllRowIds().indexOf(lastIndexdata.id),  apiRef.current.getRowsCount() - 2)
        if (checkboxSelection) {
            for (const item of checkboxSelection) {
                console.log(item)
                apiRef.current.updateRows([{ id: item[0], _action: 'delete' }])
            }

        }
        // apiRef.current.updateRows([{ ...lastIndexdata, action: [<CustomEditCell addFunction={handleAddRow} delFunction={handleDeleteRow} idx={lastIndexdata.id} isLast={true} />] }])

    };

    const testMarking = () => {
        // for (const [rowId, rowData] of apiRef.current.getSelectedRows()) {
        //     console.log(rowId, rowData);
        // }
        setCheckboxSelection(apiRef.current.getSelectedRows());
        shrinkWindow()
    }

    const shrinkWindow = () => {
        setContentView('MID');
    }

    const handlerCellEditStart = (params: GridCellEditStartParams, event: MuiEvent) => {
        // console.log('start', params)
    }

    const handlerCellEditEnd = (params: GridCellEditStopParams, event: MuiEvent) => {
        // const edit = apiRef.current.getCellValue(params.id, params.field)
        // console.log('end', params.value, edit)


    }
    return (
        <Container>
            <Wrapper>
                <DataGrid apiRef={apiRef} editMode='cell' rows={rows.current} columns={columns}
                    columnVisibilityModel={columnVisibilityModel}
                    slots={{ toolbar: CustomToolbar, pagination: CustomPagination, noRowsOverlay: CustomNoRowsOverlay, loadingOverlay: LoadingPage }}
                    cellModesModel={rowModesModel}
                    // onRowModesModelChange={handleRowModesModelChange}
                    onCellModesModelChange={handleRowModesModelChange}
                    // onCellClick={handleRowClick}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    checkboxSelection
                    onRowSelectionModelChange={testMarking}
                    disableRowSelectionOnClick
                    onCellEditStart={(params: GridCellEditStartParams, event: MuiEvent) => { handlerCellEditStart(params, event) }}
                    onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => { handlerCellEditEnd(params, event) }}
                // onRowEditStart={(params:GridCellEditStopParams, event: MuiEvent) => handlerCellEditStart(params, event)}
                // onRowEditStop={handlerCellEditEnd}
                />
            </Wrapper>
            {
                edit ? (
                    <>
                        <Button onClick={handleAddRow}>add Row</Button>
                        <Button onClick={handleDeleteRow}>삭제 ㅅㄱ</Button>
                        <Button onClick={handleSubmit}>submit</Button>
                        <Button onClick={testMarking}>마킹 테슽으</Button>

                    </>
                ) : null
            }


        </Container>
    )
}

export default CustomTable