import React from 'react';
import {
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';

function Pagination({
    page,
    onPageChange,
    count
}: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'count'>) {
    const apiRef = useGridApiContext();
    // const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <MuiPagination
            variant='outlined'
            color="primary"
            count={count}
            page={page + 1}
            onChange={(event, newPage) => {
                onPageChange(event as any, newPage - 1);
            }}
        />
    );
}

export default function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />;
}
