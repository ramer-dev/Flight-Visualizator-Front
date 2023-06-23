import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useEffect, useState, HTMLProps } from 'react'
import styled from '@emotion/styled';

type FlightRow = {
    site: string;
    frequency: number;
    txMain?: string;
    rxMain?: string;
    txStby?: string;
    rxStby?: string;
    angle: number;
    distance: number;
    height: number;
}

const defaultData: FlightRow[] = [{
    site: '부안',
    frequency: 121.5,
    txMain: '5/5',
    rxMain: '5/5',
    txStby: '5/5',
    rxStby: '5/5',
    angle: 150,
    distance: 35,
    height: 5500,
},
{
    site: '안양',
    frequency: 121.4,
    txMain: '5/4',
    rxMain: '5/4',
    txStby: '5/3',
    rxStby: '5/6',
    angle: 150,
    distance: 35,
    height: 5500,
}]

const SortTableHeader = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
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


const columnHelper = createColumnHelper<FlightRow>();

const columns = [
    columnHelper.accessor('site', {
        header: () => '표지소',
        cell: info => info.getValue(),
        footer: info => info.column.id,
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
    })

]

function DataViewer() {
    const [data, setData] = useState(() => [...defaultData])
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        debugTable: true,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

    useEffect(() => {
        console.log(table);
    }, [])
    return (
        <>

            <Box sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{ minWidth: '730px' }}>
                    <Table >
                        <TableHead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id} sx={{ borderBottom: '#5096ff solid 2px' }}>
                                    {headerGroup.headers.map(header => (
                                        <TableCell variant={'head'} key={header.id} sx={{ ":hover": { backgroundColor: '#efefef' } }}>
                                            {header.isPlaceholder ? null :
                                                (
                                                    <SortTableHeader {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none' : '',
                                                        onClick: header.column.getToggleSortingHandler()
                                                        
                                                    }}
                                                    >
                                                        {{ asc: <ArrowUpwardIcon fontSize='small'/>, desc: <ArrowDownwardIcon /> }[header.column.getIsSorted() as string] ?? null}
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
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (
                                <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} size={"small"}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Box>
            {/* <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    )
}

export default DataViewer