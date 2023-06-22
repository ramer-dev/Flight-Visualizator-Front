import { createColumnHelper, flexRender, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import React, { useEffect, useState, HTMLProps } from 'react'

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
}]


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

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), debugTable: true });

    useEffect(() => {
        console.log(table);
    }, [])
    return (
        <>

            <Box sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{minWidth:'730px'}}>
                    <Table >
                        <TableHead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableCell key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
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