import { Table as ReactTable, Column, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Divider } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useEffect, useState, HTMLProps } from 'react'
import styled from '@emotion/styled';
import { StyledInputBox } from './InputText';
import { useRecoilValue } from 'recoil';
import { contentViewFormat } from 'common/store/atom';
import { TempData } from './DataCreater';
import TableFilter from './TableFilter';
import DataPagination from './DataPagination';

export interface FlightRow {
    site: string;
    frequency: number;
    txMain?: string;
    rxMain?: string;
    txStby?: string;
    rxStby?: string;
    angle: number;
    distance: number;
    height: number;
    pk?: number,
}

interface TableFlightData extends FlightRow {
    number: number;
}



const SortTableHeader = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
`

const SortTableFooter = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
    margin:25px;
`
function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}


const columnHelper = createColumnHelper<TableFlightData>();

const columns = [
    columnHelper.display({
        id: 'select', header: ({ table }) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }} />
        ),
        cell: ({ row }) => (
            <IndeterminateCheckbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }} />
        )
    }),
    columnHelper.accessor('number', {
        header: () => '순번',
        cell: info => info.row.index + 1,
    }),
    columnHelper.accessor('site', {
        header: () => '표지소',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        minSize: 100,
    }),
    columnHelper.accessor('frequency', {
        header: () => '주파수',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('txMain', {
        header: () => 'TX-M',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('rxMain', {
        header: () => 'RX-M',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('txStby', {
        header: () => 'TX-S',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('rxStby', {
        header: () => 'RX-S',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('angle', {
        header: () => '방위',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('distance', {
        header: () => '거리',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('height', {
        header: () => '고도',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        minSize: 100,
    }),
    columnHelper.accessor('pk', {
        header: () => 'pk',
        cell: info => info.getValue(),
    })

]

type Props = {
    searchVisible?: boolean,
    checkboxVisible?: boolean,
    editable?: boolean,
    deletable?: boolean,
}

function DataViewer({ searchVisible, checkboxVisible, editable, deletable }: Props) { 
    const [data, setData] = useState(() => TempData.map((t, i) => { return { ...t, number: i + 1 } }))
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const contentView = useRecoilValue(contentViewFormat);
    const columnVisibility = { pk: false, select: !!checkboxVisible };
    const onSortingChange = (e: any) => {
        console.log(e)
    }

    useEffect(() => {
        console.info(table.getSelectedRowModel().rows.map(t => t.original));
    }, [rowSelection])

    const table = useReactTable({
        data,
        columns,
        enableRowSelection: true,
        state: {
            rowSelection,
            sorting,
            columnVisibility
        },

        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ minWidth: '730px', height: 'calc(100vh - 203px)' }}>
                    <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                        <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', border: '2px #000 solid' }}>
                            {table.getHeaderGroups().map(headerGroup => (
                                <>
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableCell variant={'head'} key={header.id} sx={{ margin: 0, padding: '16px 0', ":hover": { backgroundColor: '#efefef' } }}>
                                                {header.isPlaceholder ? null :
                                                    (
                                                        <SortTableHeader {...{
                                                            className: header.column.getCanSort()
                                                                ? 'cursor-pointer select-none' : '',
                                                            onClick: header.column.getToggleSortingHandler()

                                                        }}
                                                        >
                                                            {{ asc: <ArrowUpwardIcon fontSize='small' />, desc: <ArrowDownwardIcon /> }[header.column.getIsSorted() as string] ?? null}
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}


                                                        </SortTableHeader>
                                                    )
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    {
                                        contentView !== 'MID'
                                            ? <TableFilter isVisible={searchVisible} table={table} headerGroup={headerGroup} />
                                            : null
                                    }
                                </>
                            ))}
                        </TableHead>
                        <TableBody sx={{ overflowY: 'scroll', whiteSpace: 'nowrap' }}>

                            {table.getRowModel().rows.map(row => (
                                <TableRow hover key={row.id} sx={{ display: 'table-row', cursor: 'pointer' }}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} size={"small"} sx={{ textAlign: 'center', fontWeight:'medium' }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>

                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <SortTableFooter>
                    <DataPagination />

                </SortTableFooter>
            </Box>
        </>
    )
}


export default DataViewer