import React from 'react';
import {
    useGridApiContext,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import styled from '@emotion/styled';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
interface Props {
    edit: boolean;
    totalPage: number;
    totalCount: number;
    page: number;
    onPageChange: (e: any, page: number) => void;
    handleAddRow: (e: React.MouseEvent) => void;
    handleDeleteRow: (e: React.MouseEvent) => void;
    handleSubmit: (e: React.MouseEvent) => void;
    handleCancelEdit: (e: React.MouseEvent) => void;
    handleMarkingBtnClick: (e: React.MouseEvent) => void;
    pageSizeChange: (pageSize: number) => void;
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

export default function CustomPagination({ edit, page, onPageChange, handleCancelEdit, handleSubmit, pageSizeChange }: Props) {
    const apiRef = useGridApiContext()
    const selected = apiRef.current.getSelectedRows()
    const [pageSize, setPageSize] = React.useState(100)
    const [menuOpen, setMenuOpen] = React.useState(false);
    const handleSiteClickOpen = (e: any) => {
        e.stopPropagation();
        setMenuOpen(true);
    }

    const handleSiteClickClose = (e: any) => {
        e.stopPropagation();
        setMenuOpen(false);
    }

    const handleValueChange = (e: any) => {
        const it = e.target.value as number
        setPageSize(it)
        // handleSiteClickClose();
        pageSizeChange(it)

    }

    return <FooterContainer>
        <ButtonWrapper>
            {selected.size ? <span >{selected.size}개 행 선택</span> : <span>총 {apiRef.current.getRowsCount()}행의 데이터</span>}
        </ButtonWrapper>
        <Pagination variant='outlined' count={Math.ceil(apiRef.current.getRowsCount() / pageSize)} color='primary' page={page} onChange={(e, page) => { onPageChange(e, page) }} />

        <ButtonWrapper>
            <FormControl>
                <InputLabel sx={{ backgroundColor: 'white', transform: 'translate(4px, -9px)', fontSize: 14 }} id='rowsPerPage'>개수</InputLabel>
                <Select labelId='rowsPerPage' open={menuOpen} value={pageSize} onClick={handleSiteClickOpen} size="small"
                    onClose={handleSiteClickClose} onChange={handleValueChange}>

                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
            {edit ?
                <>
                    <Button variant='outlined' onClick={handleSubmit} startIcon={<SaveIcon />}>저장</Button>
                    <Button variant='outlined' color={'error'} onClick={handleCancelEdit} startIcon={<ClearIcon />}>취소</Button>
                </>
                :
                <Button variant='outlined' onClick={(e: React.MouseEvent) => { handleCancelEdit(e) }} startIcon={<ClearIcon />}>닫기</Button>
            }

        </ButtonWrapper>

    </FooterContainer>
    // return <Pagination ActionsComponent={Pagination} {...props} />;
}
