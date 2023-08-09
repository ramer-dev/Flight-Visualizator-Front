import styled from '@emotion/styled'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Typography } from '@mui/material';

const Wrapper = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
` 

export default function CustomNoRowsOverlay() {
    return (
        <Wrapper>
            <ErrorOutlineOutlinedIcon color='disabled' sx={{ fontSize: '120px' }} />
            <Typography>{'데이터가 존재하지 않습니다.'}</Typography>
        </Wrapper>
    )
}