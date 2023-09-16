import React, { useEffect, useRef } from 'react'
import { DataGrid, GridCellModes, GridCellModesModel, GridCellParams, GridColDef, GridFilterModel, GridPreProcessEditCellProps, GridRowId, GridSortModel, GridValidRowModel, useGridApiRef } from '@mui/x-data-grid'
import { FlightList, FlightResult, RowType } from 'common/type/FlightType'
import styled from '@emotion/styled'
import { Box } from '@mui/material'
import CustomToolbar from './CustomToolbar'
import CustomPagination from './CustomPagination'
import CustomNoRowsOverlay from './CustomNoRowsOverlay'
import LoadingPage from '../LoadingPage'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { contentFormat, contentViewFormat, flightResultDataID } from 'common/store/atom'
import L, { LatLngLiteral } from 'leaflet'
import { useGetSite } from 'components/hooks/useSite'
import divicon from 'module/NumberIcon'
import { useMap } from 'react-leaflet'
import { Destination } from 'module/Destination'
import { FindMinimumScore } from 'module/ScoreCalculate'
import { frequencyRegex, scoreRegex } from 'common/regex/regex'
import { patchFlightData, patchFlightResultCoords, postFlightList } from 'common/service/flightService'
import { useFlightData } from 'components/hooks/useFlightData'
import { EmptyData } from './EmpryData'
import useModal from 'components/hooks/useModal'
import Portal from 'module/Portal'
import CustomModal from '../CustomModal'
import { FlightListPost } from 'entity/FlightListPost'
import CustomTableTooltip from './CustomTableTooltip'
import { renderToString } from 'react-dom/server'
import { convertToWGS } from 'module/DMS'
import { getRouteFromFile } from 'common/service/fileService'
import { authState } from 'common/store/auth'
import CustomColumnMenu from './CustomColumnMenu'

declare module '@mui/x-data-grid' {
    interface PaginationPropsOverrides {
        edit: boolean;
        totalCount: number;
        totalPage: number;
        handleAddRow: (e: React.MouseEvent) => void;
        handleDeleteRow: (e: React.MouseEvent) => void;
        handleSubmit: (e: React.MouseEvent) => void;
        handleCancelEdit: (e: React.MouseEvent) => void;
        pageSizeChange: (pageSize: number) => void;
    }
    interface ToolbarPropsOverrides {
        titleData: FlightList;
        title: string;
        edit?: boolean;
        search?: boolean;
        submitted?: boolean;
        rows: any[];
        setLoading: (b : boolean) => void;
        setRows: (rows: any[]) => void;
        setSubmitted: (b: boolean) => void;
        setTitleData: (e: FlightList) => void;
        handleAddRow: (e: React.MouseEvent) => void;
        handleDeleteRow: (e: React.MouseEvent) => void;
        handleSubmit: (e: React.MouseEvent) => void;
        handleMarkingBtnClick: (e: React.MouseEvent, filename: string) => void;
    }
}

const Wrapper = styled(Box)(({ theme }) => ({
    minWidth: 10,
    width: '100%',
    height: 'calc(100vh - 230px)',
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
        display: 'block',
    },

    '& .MuiDataGrid-footerContainer > div:first-of-type': {
        display: 'none',
    }
}))


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    transition: '0.2s all ease',
}))

interface Props {
    add?: boolean,
    edit?: boolean,
    search?: boolean,
}

const formatInput = (input: string) => {
    if (typeof input === 'string' && input) {
        const numericInput = input.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        const [firstDigit, secondDigit] = [numericInput.charAt(0), numericInput.charAt(1)];
        if (numericInput.length === 1) {
            return `${firstDigit}`
        } else if (numericInput.length >= 2) {
            return `${firstDigit}/${secondDigit}`; // 형식 변환
        } else return '';
    }
    return ''
};

function CustomTable({ edit, search, add }: Props) {
    const [flightDataId, setFlightDataId] = useRecoilState(flightResultDataID);
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat);
    const auth = useRecoilValue(authState);
    const [loading, setLoading] = React.useState(false);
    const [titleData, setTitleData] = React.useState<FlightList>()
    const [checkboxSelection, setCheckboxSelection] = React.useState<Map<GridRowId, GridValidRowModel>>();
    const [cellModesModel, setCellModesModel] = React.useState<GridCellModesModel>({});
    const [submitted, setSubmitted] = React.useState(false);
    const [sortModel, setSortModel] = React.useState<GridSortModel>([])
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({ items: [] })
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 100,
        page: 0,
    });

    const map = useMap();
    const id = useRef(1);
    const hoverPolyline = useRef<L.Polyline>();
    const layerGroup = useRef(L.layerGroup([]))
    const routePolyline = useRef<L.Polyline>();
    const apiRef = useGridApiRef()

    const siteData = useGetSite();
    const { data, refetch, isLoading } = useFlightData(paginationModel.pageSize, 0, flightDataId)

    const [rows, setRows] = React.useState(data?.data?.items ? data.data.items.map((t, i) => ({ ...t })) : []);
    const { isModalOpen, openModal, closeModal } = useModal()

    const scoreValidate = (params: GridPreProcessEditCellProps) => {
        const validated = scoreRegex.test(String(params.props.value));
        return { ...params.props, error: !validated }
    }
    const stateRefresh = () => {
        if (search || add) {
            setFlightDataId(undefined)
        }

        if (add && data?.data) {
            data.id = -1
            data.testType = '';
            data.testDate = '';
            data.testName = '';
            data.data = EmptyData(paginationModel.pageSize).data;
        }

        if (!add) {
            refetch();
        }
        setPaginationModel({ page: 0, pageSize: paginationModel.pageSize })


        if (data?.data?.items) {
            setRows(data.data.items.map((t) => ({ ...t })));
            if (auth.role >= 2) {
                const layer = data.data.items.filter(t => t.point === null)
                for (let item of layer) {
                    const it = { ...item };
                    const siteCoord = siteData.data.filter(t => t.siteName === it.siteName).map(t => t.siteCoordinate);
                    const coord = Destination(siteCoord[0], it.angle, it.distance)
                    delete it.deletedAt;
                    delete it.updatedAt;
                    delete it.status;
                    patchFlightResultCoords({ ...it, point: coord }, it.id!)
                }
            }
        }

    }

    const columns: GridColDef[] = [
        { field: 'id', editable: false, flex: .5 },
        { field: 'no', disableExport: true, editable: false, flex: .5, type: 'number', sortable: false, valueGetter: (params) => apiRef.current.getRowIndexRelativeToVisibleRows(params.id) + 1 || apiRef.current.getAllRowIds().indexOf(params.id) + 1, headerName: 'No' },
        {
            field: 'siteName', editable: !!edit, flex: 1, headerName: '표지소', type: 'string',
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
                if (params.hasChanged) {
                    const hasError = !siteData.data.map(t => t.siteName).includes(params.props.value)
                    return { ...params.props, error: hasError }
                }
                return { ...params.props }
            },
        },
        {
            field: 'frequency', editable: !!edit, flex: 1, headerName: '주파수', type: 'number', align: 'left', headerAlign: 'left',
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
        { field: 'angle', editable: !!edit, flex: .5, type: 'number', headerName: '각도',align:'left', headerAlign:'left' },
        { field: 'distance', editable: !!edit, flex: .5, type: 'number', headerName: '거리(NM)',align:'left', headerAlign:'left' },
        { field: 'height', editable: !!edit, flex: 1, type: 'number', headerName: '고도(ft)', align:'left', headerAlign:'left' },
        { field: 'status', editable: false, flex: 1 },
        { field: 'updatedAt', flex: 1 },
        { field: 'deletedAt', flex: 1 },
        { field: 'point', editable: false }
    ]


    const columnVisibilityModel = {
        'id': false,
        'testId': false,
        'status': false,
        'updatedAt': false,
        'deletedAt': false,
        'point': false,
        // 'action': !!edit
    }
    useEffect(() => {
        stateRefresh()
        if (data) {
            const excludesPoint = data.data?.items.filter(t => !t.point)
            setTitleData({ ...data, data: undefined })
        }
    }, [data, flightDataId])


    useEffect(() => {
        const obj: { [key: string]: GridValidRowModel } = {};
        const layer: L.Marker[] = []
        const instance = layerGroup.current;

        checkboxSelection?.forEach((value, key) => {
            obj[String(key)] = value;
        });

        Object.keys(obj).map((i, idx) => {
            if (!isNaN(obj[i].angle) && !isNaN(obj[i].distance) && obj[i].siteName) {
                const angle = parseFloat(obj[i].angle) && obj[i].angle;
                const distance = parseFloat(obj[i].angle) && obj[i].distance;
                const siteCoords = siteData.data.filter(t => t.siteName === obj[i].siteName)[0]?.siteCoordinate as LatLngLiteral;
                const target = Destination(siteCoords, angle, distance);
                layer.push(L.marker(target as LatLngLiteral, {
                    pane: 'pin',
                    icon: divicon(FindMinimumScore(obj[i].txmain, obj[i].rxmain, obj[i].txstby, obj[i].rxstby), idx + 1)
                }).on('mouseover', () => {
                    hoverPolyline.current = L.polyline([[convertToWGS(siteCoords.lat), convertToWGS(siteCoords.lng)], target!], { pane: 'pin', color: 'red' }).addTo(map);
                }).on('mouseout', () => {
                    if (hoverPolyline.current) {
                        hoverPolyline.current.remove();
                    }
                })
                    .bindTooltip(CustomTableTooltip({ siteName: obj[i].siteName, distance, angle: angle, index: idx + 1 }))
                )
            }

        })

        instance.clearLayers()

        for (let i of layer) {
            instance.addLayer(i)
        }

        instance.addTo(map);

        return () => {
            setCellModesModel({});
            instance.clearLayers();
            if (routePolyline.current) routePolyline.current.remove();
        }

    }, [checkboxSelection, map, siteData.data])

    const handleCellClick = (params: GridCellParams, event: React.MouseEvent) => {

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
    }

    const handleRowModesModelChange = React.useCallback(
        (newModel: GridCellModesModel) => {
            setCellModesModel(newModel);
        },
        [],
    );

    const handleAddRow = (e: React.MouseEvent) => {
        if (titleData) {
            const newRow = { id: `add-${id.current}`, siteName: '', frequency: 0, testId: titleData.id!, angle: 0, distance: 0, height: 0 }
            apiRef.current.updateRows([newRow]);
            setRows((prevRow) => [...prevRow, newRow])
            id.current++;
        }
    }

    const validateInput = (data: FlightResult[]) => {
        for (let i in data) {

            if (!data[i].siteName) {
                window.alert(`${+i + 1}행의 표지소를 정확하게 입력해주세요.`)
                return true;
            }
            if (!data[i].frequency || !data[i].frequency.toString().match(frequencyRegex)) {
                window.alert(`${+i + 1}행의 주파수를 정확하게 입력해주세요.\n','(콤마)가 입력되어 있을 수 있습니다.`)

                return true;
            }

            if (!data[i].angle || data[i].angle >= 360 || data[i].angle < 0) {
                window.alert(`${+i + 1}행의 각도를 정확하게 입력해주세요.`)
                return true;
            }

            if (!data[i].distance || data[i].distance >= 400 || data[i].angle < 0) {
                window.alert(`${+i + 1}행의 거리를 정확하게 입력해주세요.`)
                return true;
            }

            if (!data[i].height || data[i].height >= 60000 || data[i].height < 0) {
                window.alert(`${+i + 1}행의 고도를 정확하게 입력해주세요.`)
                return true;
            }

            if ((!data[i].txmain || !data[i].rxmain) && (!data[i].txstby || !data[i].rxstby)) {
                window.alert(`${+i + 1}행의 검사결과를 정확하게 입력해주세요.`)
                return true;
            }



        }
        return false;

    }

    const handleSubmit = () => {
        if (!data) return;
        if (!submitted) {
            openModal()
            return
        };

        const rowModel = apiRef.current.getRowModels()
        const editArray: FlightResult[] = [];

        for (const t of rowModel) {
            const item: any = { testId: add ? null : data.id }
            for (const key in t[1]) {
                if (key !== null) {
                    item[key] = t[1][key];
                }
            }

            // 불필요한 속성 명시적으로 삭제
            // Mode가 (추가)인 경우, 모든 item의 id를 삭제하여 DB에서 Auto Increment된 값 부여하도록 설정
            if (String(item.id).startsWith('add')) {
                delete item.id
            }
            editArray.push(item)

            if (validateInput(editArray)) {
                return;
            }

            delete item.no;
            delete item.status;
            delete item.deletedAt;
            delete item.updatedAt;

        }
        if (titleData) {
            const fetchData: FlightListPost = { ...titleData, data: editArray }
            delete fetchData.deletedAt;
            delete fetchData.updatedAt;
            if (add) {
                delete fetchData.id;
                postFlightList(fetchData);
            } else if (titleData?.id) {
                patchFlightData(fetchData, titleData.id)
            }
        }
        stateRefresh()
    }

    const handleDeleteRow = (e: React.MouseEvent) => {
        e.stopPropagation()
        const idList: string[] = []
        if (checkboxSelection && window.confirm(`${checkboxSelection.size}개의 행을 삭제할까요?`)) {
            for (const item of checkboxSelection) {
                idList.push(item[0] as string)
                apiRef.current.updateRows([{ id: item[0], _action: 'delete' }])
            }
            setRows(rows.filter(t => !idList.includes(t.id!)))

        }
    };

    const handleMarking = () => {
        setCheckboxSelection(apiRef.current.getSelectedRows());
    }

    const handleMarkingBtnClick = async (filename?: string) => {
        setCheckboxSelection(apiRef.current.getSelectedRows());
        if (filename) {
            const result = await getRouteFromFile(filename)
            const coords = result.route.map(t => t.coords)

            routePolyline.current = L.polyline(coords, { pane: 'pin', color: 'red' }).addTo(map);
        }
        shrinkWindow()
    }

    const handleCancelEdit = (e: React.MouseEvent) => {
        setContentView('NONE')
        setContent('NONE')
    }
    const shrinkWindow = () => {
        setContentView('MID');
    }

    const handlePaginationModelChange = (e: any) => {
    }

    return (
        <Wrapper>
            <Portal>
                <CustomModal isOpen={isModalOpen} title="비행검사 입력 에러" message='비행검사 기본 정보 입력 후 확인버튼을 눌러주세요.' close={closeModal} />
            </Portal>
            <StyledDataGrid apiRef={apiRef} editMode='cell' rows={rows} columns={columns}
                loading={isLoading || loading}
                columnVisibilityModel={columnVisibilityModel}
                slots={{ toolbar: CustomToolbar, pagination: CustomPagination, noRowsOverlay: CustomNoRowsOverlay, loadingOverlay: LoadingPage, columnMenu: CustomColumnMenu }}
                slotProps={{
                    pagination: {
                        count: data?.data?.totalPage ? rows.length : 0,
                        totalCount: data?.data?.totalCount ? data.data.totalCount : 0,
                        totalPage: data?.data?.totalPage ? data.data.totalPage : 0,
                        edit: edit,
                        page: paginationModel.page + 1,
                        onPageChange(event, page) {
                            setPaginationModel({ pageSize: paginationModel.pageSize, page: page - 1 })
                            apiRef.current.setPage(page - 1)
                        },
                        pageSizeChange(pageSize) {
                            setPaginationModel({ pageSize, page: 0 })
                            apiRef.current.setPageSize(pageSize);
                        },
                        handleAddRow,
                        handleDeleteRow,
                        handleSubmit,
                        handleCancelEdit
                    },
                    toolbar: {
                        count: data?.data?.totalCount,
                        title: data?.testName,
                        edit: edit,
                        search: search,
                        submitted: submitted,
                        rows,
                        setLoading,
                        setRows,
                        setSubmitted,
                        handleAddRow,
                        handleDeleteRow,
                        handleSubmit,
                        handleMarkingBtnClick: () => handleMarkingBtnClick(titleData?.testRoute),
                        titleData,
                        setTitleData,
                    }
                }}
                cellModesModel={cellModesModel}
                onCellModesModelChange={handleRowModesModelChange}
                onCellClick={handleCellClick}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
                filterModel={filterModel}
                onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                checkboxSelection
                onRowSelectionModelChange={handleMarking}
                disableRowSelectionOnClick
            // getRowId={(row) => row }
            />
        </Wrapper>
    )
}

export default CustomTable