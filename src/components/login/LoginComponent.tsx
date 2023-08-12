import { Box, Button, Dialog, Input } from '@mui/material'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { authState } from 'common/store/auth'
import { AuthType } from 'common/type/AuthType'
import sha256 from 'crypto-js/sha256'
import { getLogin, getTestCookie } from 'components/hooks/useLogin'
interface Props {
    open: boolean,
    closeLogin: () => void,
}

function LoginComponent({ open, closeLogin }: Props) {
    const setLogin = useSetRecoilState(authState)

    const [payload, setPayload] = React.useState({ id: '', pw: '' })

    const handleInputChange = (e: any, id: "id" | "pw") => {
        const newItem = { ...payload, [id]: e.target.value }
        setPayload(newItem)
    }

    const testCookie = async () => {
        const result = await getTestCookie();
        console.log(result);
    }

    const loginCheck = async () => {
        // const loginValue: AuthType = {
        //     id: 'test',
        //     username: 'test',
        //     role: 1
        // }
        // setLogin(loginValue)
        const password = payload.pw + 'c0mtr2'

        // hash.update('admin')
        const hash = sha256(password).toString();
        const loginResult = await getLogin(payload.id, hash)
        if (loginResult) {
            console.log(`${payload.id} 로그인 성공`)
            const item: AuthType = {
                id: payload.id,
                username: payload.id,
                role: loginResult.data.role
            }
            setLogin(item)
        } else {
            console.log(`${payload.id} 로그인 실패`)
        }
    }

    return (
        <Dialog maxWidth={'md'} open={open} onClose={closeLogin}>
            <Box sx={{ width: 900, height: 600 }}>
                <Input onChange={(e) => { handleInputChange(e, 'id') }} />
                <Input type="password" onChange={(e) => { handleInputChange(e, 'pw') }} />

            </Box>
            <Button onClick={() => { loginCheck() }}>testLogin</Button>
            <Button onClick={testCookie}>test Cookie</Button>

        </Dialog>
    )
}

export default LoginComponent