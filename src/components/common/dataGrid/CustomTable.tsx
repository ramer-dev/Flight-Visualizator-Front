import React, { useEffect, useRef } from 'react'
import { DataGrid, GridCellEditStartParams, GridCellEditStopParams, GridCellModes, GridCellModesModel, GridCellParams, GridColDef, GridEventListener, GridPreProcessEditCellProps, GridRowId, GridRowModes, GridRowModesModel, GridRowParams, GridRowsProp, GridSortApi, GridValidRowModel, GridValueOptionsParams, GridValueSetterParams, MuiEvent, useGridApiRef } from '@mui/x-data-grid'
import { FlightList, FlightResult } from 'common/type/FlightType'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import CustomToolbar from './CustomToolbar'
import CustomPagination from './CustomPagination'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import LoadingPage from '../LoadingPage'
import CustomEditCell from './CustomEditCell'
import { useSetRecoilState } from 'recoil'
import { contentFormat, contentViewFormat } from 'common/store/atom'
import L, { LatLngLiteral } from 'leaflet'
import { useGetSite } from 'components/hooks/useSite'
import divicon from 'module/NumberIcon'
import { useMap } from 'react-leaflet'
import { Destination } from 'module/Destination'
import { FindMinimumScore } from 'module/ScoreCalculate'
import { frequencyRegex, scoreRegex } from 'common/regex/regex'
import { patchFlightData, postFlightData } from 'common/service/flightService'


declare module '@mui/x-data-grid' {
    interface PaginationPropsOverrides {
        edit:boolean;
        count: number;
        handleAddRow: (e : React.MouseEvent) => void;
        handleDeleteRow: (e : React.MouseEvent) => void;
        handleSubmit: (e : React.MouseEvent) => void;
        handleMarkingBtnClick: (e : React.MouseEvent) => void;
        handleCancelEdit: (e: React.MouseEvent) => void;
    }
    interface ToolbarPropsOverrides {
        title:string;
        edit:boolean;
        handleAddRow: (e : React.MouseEvent) => void;
        handleDeleteRow: (e : React.MouseEvent) => void;
        handleSubmit: (e : React.MouseEvent) => void;
        handleMarkingBtnClick: (e : React.MouseEvent) => void;
    }
}

const Container = styled.div`
    width:100%;
`

const Wrapper = styled(Box)(({ theme }) => ({
    minWidth: 10,
    width: '100%',
    height: 'calc(100vh - 100px)',
    '& .MuiDataGrid-cell--editable': {
        backgroundColor: 'rgba(80,150,255,0.1)',
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell--editable:has(.Mui-error)': {
        backgroundColor: `rgb(126,10,15,0.1)`,
    },
    '& .Mui-error': {
        lineHeight: '52px',
        // backgroundColor: `rgb(126,10,15,0.1)`,
        color: '#ff4343',
    },

    '& .MuiDataGrid-footerContainer': {
        display:'block',
    }
}))


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    transition: '0.2s all ease',
}))

interface Props {
    edit?: boolean,
    idx?: number,
    isLoading: boolean,
}

const formatInput = (input: string) => {
    const numericInput = input.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    const [firstDigit, secondDigit] = [numericInput.charAt(0), numericInput.charAt(1)];
    if (numericInput.length === 1) {
        return `${firstDigit}`
    } else if (numericInput.length >= 2) {
        return `${firstDigit}/${secondDigit}`; // 형식 변환
    } else return '';

};

function CustomTable({ data, edit, isLoading }: { data?: FlightList } & Props) {
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)
    console.log(data)
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 100,
        page: 0,
    });
    const [checkboxSelection, setCheckboxSelection] = React.useState<Map<GridRowId, GridValidRowModel>>();
    const [cellModesModel, setCellModesModel] = React.useState<GridCellModesModel>({});
    const map = useMap();
    const id = useRef(1);
    const apiRef = useGridApiRef()
    const siteData = useGetSite();
    const [rows, setRows] = React.useState(data?.data?.items ? data.data.items.map((t, i) => ({ ...t, no: i })) : []);
    const layerGroup = useRef(L.layerGroup([], { pane: 'marking' }))

    const scoreValidate = (params: GridPreProcessEditCellProps) => {
        const validated = scoreRegex.test(String(params.props.value));
        console.log(validated);
        return { ...params.props, error: !validated }
    }

    const stateRefresh = () => {
        setRows(data?.data ? data.data.items.map((t, i) => ({ ...t, no: i })) : []);
        setPaginationModel({page:0, pageSize:100})
    }

    const columns: GridColDef[] = [
        { field: 'id', editable: false, flex: .5 },
        // { field: 'no', editable: false, flex: 1, valueGetter: (params) => ((params.api.getRowIndexRelativeToVisibleRows(params.id) + 1) ? (paginationModel.page * paginationModel.pageSize) + params.api.getRowIndexRelativeToVisibleRows(params.id) + 1 : ''), headerName: 'No' },
        { field: 'no', editable: false, flex: .5, valueGetter: (params) => (apiRef.current.getAllRowIds().indexOf(params.id) + 1), headerName: 'No' },

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
            },
        },
        {
            field: 'frequency', editable: !!edit, flex: 1, headerName: '주파수', type: 'number',
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (params.hasChanged) {
                    const hasError = String(params.props.value).match(frequencyRegex)
                    const lengthError = String(params.props.value).length > 7

                    return { ...params.props, error: !hasError || lengthError }

                }
                return { ...params.props }
            }
        },
        { field: 'testId', editable: false, flex: 1 },
        {
            field: 'txmain', editable: !!edit, flex: .75, headerName: 'TX-M',
            preProcessEditCellProps: scoreValidate,
            valueParser: (value: any) => {
                return formatInput(value);
            }
        },
        {
            field: 'rxmain', editable: !!edit, flex: .75, headerName: 'RX-M',
            preProcessEditCellProps: scoreValidate,
            valueParser: (value: any) => {
                return formatInput(value);
            }
        },
        {
            field: 'txstby', editable: !!edit, flex: .75, headerName: 'TX-S',
            preProcessEditCellProps: scoreValidate,
            valueParser: (value: any) => {
                return formatInput(value);
            }
        },
        {
            field: 'rxstby', editable: !!edit, flex: .75, headerName: 'RX-S',
            preProcessEditCellProps: scoreValidate,
            valueParser: (value: any) => {
                return formatInput(value);
            }
        },
        { field: 'angle', editable: !!edit, flex: .5, type: 'number', headerName: '각도' },
        { field: 'distance', editable: !!edit, flex: .5, type: 'number', headerName: '거리' },
        { field: 'height', editable: !!edit, flex: 1, type: 'number', headerName: '고도' },
        { field: 'status', editable: false, flex: 1 },
        { field: 'updatedAt', flex: 1 },
        { field: 'deletedAt', flex: 1 },
    ]


    const columnVisibilityModel = {
        'id': false,
        'testId': false,
        'status': false,
        'updatedAt': false,
        'deletedAt': false,
        // 'action': !!edit
    }
    useEffect(() => {
        stateRefresh()
    }, [data])

    useEffect(() => {
        const obj: { [key: string]: GridValidRowModel } = {};
        const layer = []

        checkboxSelection?.forEach((value, key) => {
            obj[String(key)] = value;
        });

        for (let i in obj) {
            if (!isNaN(obj[i].angle) || !isNaN(obj[i].distance) || obj[i].siteName) {
                const siteCoords = siteData.data.filter(t => t.siteName === obj[i].siteName)[0]?.siteCoordinate;
                const target = Destination(siteCoords, obj[i].angle, obj[i].distance);
                layer.push(L.marker(target as LatLngLiteral, {
                    icon: divicon(FindMinimumScore(obj[i].txmain, obj[i].rxmain, obj[i].txstby, obj[i].rxstby),
                        obj[i].no)
                }).bindTooltip('text'))
            }
        }

        layerGroup.current.clearLayers()

        for (let i of layer) {
            layerGroup.current.addLayer(i)
        }

        layerGroup.current.addTo(map);

        return () => {
            setCellModesModel({});
            layerGroup.current.clearLayers();
        }

    }, [checkboxSelection])

    const handleCellClick = (params: GridCellParams, event: React.MouseEvent) => {
        if (!params.isEditable) {
            return;
        }

        // Ignore portal
        if (!event.currentTarget.contains(event.target as Element)) {
            return;
        }

        setCellModesModel((prevModel) => {
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
                    [params.field]: { mode: GridCellModes.Edit },
                },
            };
        });
    }


    const handleRowModesModelChange = React.useCallback(
        (newModel: GridCellModesModel) => {
            setCellModesModel(newModel);
        },
        [],
    );

    const handleAddRow = (e: React.MouseEvent) => {
        e.stopPropagation()
        const newRow = { id: `add-${id.current++}` }
        apiRef.current.updateRows([newRow]);
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
        if (!data) return;

        const rowModel = apiRef.current.getRowModels()
        const editArray: FlightResult[] = [];
        for (const t of rowModel) {
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

    const handleDeleteRow = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (checkboxSelection && window.confirm(`${checkboxSelection.size}개의 행을 삭제할까요?`)) {           
            for (const item of checkboxSelection) {
                console.log(item)
                apiRef.current.updateRows([{ id: item[0], _action: 'delete' }])
            }

        }
    };

    const handleMarking = () => {
        // for (const [rowId, rowData] of apiRef.current.getSelectedRows()) {
        //     console.log(rowId, rowData);
        // }
        setCheckboxSelection(apiRef.current.getSelectedRows());
    }

    const handleMarkingBtnClick = () => {
        setCheckboxSelection(apiRef.current.getSelectedRows());
        shrinkWindow()
    }

    const handlerCancelEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        setContent('NONE')
    }
    const shrinkWindow = () => {
        setContentView('MID');
    }

    return (
        <Container>
            <Wrapper>
                <StyledDataGrid apiRef={apiRef} editMode='cell' rows={rows} columns={columns}
                    loading={isLoading}
                    columnVisibilityModel={columnVisibilityModel}
                    slots={{ toolbar: CustomToolbar, pagination: CustomPagination, noRowsOverlay: CustomNoRowsOverlay, loadingOverlay: LoadingPage }}
                    slotProps={{
                        pagination: {
                            count: data?.data?.totalPage ? data.data.totalPage : 0,
                            edit : edit,
                            page:paginationModel.page + 1,
                            onPageChange(event, page) {
                                setPaginationModel({pageSize:100, page:page-1})
                                apiRef.current.setPage(page-1)
                            },
                            handleAddRow,
                            handleDeleteRow,
                            handleSubmit,
                            handleMarkingBtnClick,
                        },
                        toolbar: {
                            count: data?.data?.totalCount,
                            title : data?.testName,
                            edit : edit,
                            handleAddRow,
                            handleDeleteRow,
                            handleSubmit,
                            handleMarkingBtnClick,
                            handlerCancelEdit
                        }
                    }}
                    cellModesModel={cellModesModel}
                    onCellModesModelChange={handleRowModesModelChange}
                    onCellClick={handleCellClick}
                    paginationModel={paginationModel}
                    checkboxSelection
                    onRowSelectionModelChange={handleMarking}
                    disableRowSelectionOnClick
                // onRowEditStart={(params:GridCellEditStopParams, event: MuiEvent) => handlerCellEditStart(params, event)}
                // onRowEditStop={handlerCellEditEnd}
                />
            </Wrapper>
        </Container>
    )
}

export default CustomTable