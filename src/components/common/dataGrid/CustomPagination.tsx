import React from 'react';
import {
    gridPageCountSelector,
    GridPagination,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import { TablePaginationProps } from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
interface Props {
    edit: boolean;
    count: number;
    page: number;
    onPageChange: (e: any, page: number) => void;
    handleAddRow: (e: React.MouseEvent) => void;
    handleDeleteRow: (e: React.MouseEvent) => void;
    handleSubmit: (e: React.MouseEvent) => void;
    handleCancelEdit: (e: React.MouseEvent) => void;
    handleMarkingBtnClick: (e: React.MouseEvent) => void;
}

const FooterContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:100%;
    gap:8px;
    margin:0 8px;
`

const ButtonWrapper = styled.div`
    display:flex;
    gap:8px;
`

const Dummy = styled.div`
    width:200px;
`


export default function CustomPagination({ edit, count, page, onPageChange, handleCancelEdit, handleSubmit }: Props) {
    return <FooterContainer>
        <Dummy />
        <Pagination variant='outlined' count={count} color='primary' page={page} onChange={(e, page) => { onPageChange(e, page) }} />
        <ButtonWrapper>
            {edit ?
                <>
                    <Button variant='outlined' onClick={handleSubmit} startIcon={<SaveIcon />}>저장</Button>
                    <Button variant='outlined' color={'error'} onClick={handleCancelEdit} startIcon={<ClearIcon />}>취소</Button>
                </>
                :
                <Button variant='outlined' onClick={handleCancelEdit} startIcon={<ClearIcon />}>닫기</Button>
            }

        </ButtonWrapper>

    </FooterContainer>
    // return <Pagination ActionsComponent={Pagination} {...props} />;
}
