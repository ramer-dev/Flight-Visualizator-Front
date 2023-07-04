import React from 'react'
// import MuiPagination from '@mui/material/Pagination'
import { gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { TablePaginationProps, Pagination as MuiPagination, tablePaginationClasses } from '@mui/material';

function Pagination({ page, onPageChange, className }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) {
    const apiRef = useGridApiContext();
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination  count={pageCount} page={page + 1} onChange={(event, newPage) => {
            onPageChange(event as any, newPage - 1);
        }}
        />
    )
}

export default Pagination