import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'

const Wrapper = styled.div`
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
export default function LoadingPage() {
    return (
        <Wrapper>
            <CircularProgress color='primary' size='120px' />
        </Wrapper>
    )
}