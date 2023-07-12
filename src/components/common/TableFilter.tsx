import { TableRow, TableCell, Divider } from "@mui/material";
import { Table as ReactTable, HeaderGroup, Column } from "@tanstack/react-table";
import React from "react";
import styled from "@emotion/styled";
import { StyledInputBox } from "./InputText";

type Props = {
    isVisible?: boolean
    table: ReactTable<any>
    headerGroup: HeaderGroup<any>
}

const SortTableHeader = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
`

const TableFilter = ({ isVisible, table, headerGroup }: Props) => {
    if(!isVisible) return null;

    return (
        <TableRow sx={{margin: 0 }}>
            {headerGroup.headers.map(header => (
                <TableCell sx={{ padding: '16px 8px', borderBottom: '#5096ff solid 2px'}}>
                    {header.column.id !== 'select' ? <Filter column={header.column} table={table} /> : null}
                </TableCell>
            ))}
            

        </TableRow>
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
        <>
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
        </>
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

export default TableFilter;