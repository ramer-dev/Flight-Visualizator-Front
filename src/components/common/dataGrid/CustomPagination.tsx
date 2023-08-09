import React from 'react';
import {
    useGridApiContext,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
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



export default function CustomPagination({ edit, totalCount, totalPage, page, onPageChange, handleCancelEdit, handleSubmit }: Props) {
    const apiRef = useGridApiContext()
    const selected = apiRef.current.getSelectedRows()
    return <FooterContainer>
        <ButtonWrapper>
            {selected.size ? <span >{selected.size}개 행 선택</span> : <span>총 {totalCount}행의 데이터</span>}
        </ButtonWrapper>

        <Pagination variant='outlined' count={totalPage} color='primary' page={page} onChange={(e, page) => { onPageChange(e, page) }} />
        <ButtonWrapper>
            {edit ?
                <>
                    <Button variant='outlined' onClick={handleSubmit} startIcon={<SaveIcon />}>저장</Button>
                    <Button variant='outlined' color={'error'} onClick={handleCancelEdit} startIcon={<ClearIcon />}>취소</Button>
                </>
                :
                <Button variant='outlined' onClick={(e:React.MouseEvent) => {handleCancelEdit(e); console.log('close') }} startIcon={<ClearIcon />}>닫기</Button>
            }

        </ButtonWrapper>

    </FooterContainer>
    // return <Pagination ActionsComponent={Pagination} {...props} />;
}
