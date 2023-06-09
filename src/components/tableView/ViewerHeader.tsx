import styled from '@emotion/styled';
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material';
import {visuallyHidden} from '@mui/utils'
import { FlightList, FlightResult } from 'common/type/FlightType';
import React from 'react'
import { headCells, Order, TableEditCellType} from './TableTypes';

// interface Props {
//     data: string[]
// }



interface EnhancedTableProps {
    numSelected: number;
    headCells: object
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof FlightResult) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const RowContainer = styled(TableRow)`
      border: 1px solid #bcbcbc;
  `

const TableHeader = styled(TableCell)`
      border: 1px solid #bcbcbc;
  `


function ViewerHeader({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }: EnhancedTableProps) {

    const createSortHandler =
        (property: keyof FlightResult) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead >
            <RowContainer>
                <TableCell padding='checkbox'>
                    <Checkbox color='primary' indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "전체 선택" }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </RowContainer>
        </TableHead>
    )
}

export default ViewerHeader