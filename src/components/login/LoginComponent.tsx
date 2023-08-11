import { Box, Button, Dialog } from '@mui/material'
import ErrorPage from 'components/common/ErrorPage'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from 'common/store/auth'
import { AuthType } from 'common/type/AuthType'
import sha256 from 'crypto-js/sha256'
interface Props {
    open: boolean,
    closeLogin: () => void,
}

function LoginComponent({ open, closeLogin }: Props) {
    const setLogin = useSetRecoilState(authState)
    useEffect(() => {
        console.log(open)
    }, [open])

    const loginCheck = () => {
        const loginValue: AuthType = {
            id: 'test',
            username: 'test',
            role: 2
        }
        setLogin(loginValue)
        const password = 'vccs'
        // hash.update('admin')
        const hash = sha256(password).toString();
        console.log(hash)
        
        console.log('로그인 성공')
    }

    return (
        <Dialog maxWidth={'md'} open={open} onClose={closeLogin}>
            <Box sx={{ width: 900, height: 600 }}>
                <ErrorPage code="NONE" content='로그인 기능 개발중입니다.' />

            </Box>
            <Button onClick={() => { loginCheck() }}>testLogin</Button>

        </Dialog>
    )
}

export default LoginComponent