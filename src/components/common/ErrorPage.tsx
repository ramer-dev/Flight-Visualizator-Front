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
interface Props {
    code?: string;
}

export default function ErrorPage({ code }: Props) {
    return (
        <Wrapper>
            <ErrorOutlineOutlinedIcon color='disabled' sx={{ fontSize: '120px' }} />
            <Typography>에러가 발생했습니다.</Typography>
            <Typography>code : {code}</Typography>
        </Wrapper>
    )
}