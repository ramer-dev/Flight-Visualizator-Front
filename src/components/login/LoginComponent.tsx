import { Box, Button, Dialog, Input } from '@mui/material'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authState } from 'common/store/auth'
import { AuthType } from 'common/type/AuthType'
import sha256 from 'crypto-js/sha256'
import { getLogin, getTestCookie } from 'components/hooks/useLogin'
import useModal from 'components/hooks/useModal'
import Portal from 'module/Portal'
import CustomModal from 'components/common/CustomModal'
interface Props {
    open: boolean,
    closeLogin: () => void,
}

function LoginComponent({ open, closeLogin }: Props) {
    const { isOpen, openModal, closeModal } = useModal();
    const [loginState, setLoginState] = useRecoilState(authState)

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
        // console.log(loginResult)
        if (loginResult) {
            console.log(`${payload.id} 로그인 성공`)
            openModal()
            const item: AuthType = {
                id: payload.id,
                username: payload.id,
                role: loginResult.data.role
            }
            setLoginState(item)
        } else {
            openModal()
            console.log(`${payload.id} 로그인 실패`)
            setLoginState({ id: '', username: '', role: 0 })

        }
    }

    return (
        <Dialog maxWidth={'md'} open={open} onClose={closeLogin}>
            {isOpen ? loginState.role ? (
                <Portal>
                    <CustomModal isOpen={isOpen} title="로그인 성공" message='로그인에 성공하였습니다.' close={() => { closeModal(); closeLogin() }} />
                </Portal>
            ) :
                <Portal>
                    <CustomModal isOpen={isOpen} title="로그인 실패" message='ID/비밀번호를 확인해주세요.' close={closeModal} />
                </Portal>
                : null
            }
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