import { Box, Dialog } from '@mui/material'
import ErrorPage from 'components/common/ErrorPage'
import React, { useEffect } from 'react'

interface Props {
    open: boolean,
    closeLogin: () => void,
}

function LoginComponent({ open, closeLogin }: Props) {

    useEffect(() => {
        console.log(open)
    },[open])

    return (
        <Dialog maxWidth={'md'} open={open} onClose={closeLogin}>
            <Box sx={{width:900, height:600}}>
            <ErrorPage code="NONE" content='로그인 기능 개발중입니다.'/>
                
            </Box>

        </Dialog>
    )
}

export default LoginComponent