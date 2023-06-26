import { Table as ReactTable, Column, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useEffect, useState, HTMLProps } from 'react'
import styled from '@emotion/styled';
import { StyledInputBox } from './InputText';

interface FlightRow {
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
    pk: 1,
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
},
{
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
},
{
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
},
{
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

function DataViewer() {
    const [data, setData] = useState(() => defaultData.map((t, i) => { return { ...t, number: i + 1 } }))
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const columnVisibility = { pk: false };
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
                <TableContainer component={Paper} sx={{ minWidth: '730px' }}>
                    <Table >
                        <TableHead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <>
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableCell variant={'head'} key={header.id} sx={{ padding: '16px 0' , ":hover": { backgroundColor: '#efefef'} }}>
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
                                    <TableRow sx={{ borderBottom: '#5096ff solid 2px' }}>
                                        {headerGroup.headers.map(header => (
                                            <TableCell sx={{ padding: '16px 8px' }}>
                                                {header.column.id !== 'select' ? <Filter column={header.column} table={table} /> : null}
                                            </TableCell>
                                        ))}
                                    </TableRow></>
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

function Filter({
    column,
    table,
}: {
    column: Column<any, unknown>
    table: ReactTable<any>
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = React.useMemo(
        () =>
            typeof firstValue === 'number'
                ? []
                : Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return typeof firstValue === 'number' ? (
        <div>
            <SortTableHeader >
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[0] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
                        ? `(${column.getFacetedMinMaxValues()?.[0]})`
                        : ''
                        }`}
                    className="w-24 border shadow rounded"
                />
                &nbsp;~&nbsp;
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                    value={(columnFilterValue as [number, number])?.[1] ?? ''}
                    onChange={value =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
                        ? `(${column.getFacetedMinMaxValues()?.[1]})`
                        : ''
                        }`}
                    className="w-24 border shadow rounded"
                />
            </SortTableHeader>
            <div className="h-1" />
        </div>
    ) : (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.slice(0, 5000).map((value: any) => (
                    <option value={value} key={value} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '') as string}
                onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
                className="w-36 border shadow rounded"
                list={column.id + 'list'}
            />
            <div className="h-1" />
        </>
    )
}

// A debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 100,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)
    
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <StyledInputBox sx={{ fontSize: '12px' }} size={'small'} type={props.type} value={value} onChange={e => setValue(e.target.value)} />
    )
}

export default DataViewer