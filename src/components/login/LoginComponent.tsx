import { Box, Button, Dialog, Input, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { authState } from 'common/store/auth'
import { AuthType } from 'common/type/AuthType'
import { getLogin } from 'common/service/loginService'
import useModal from 'components/hooks/useModal'
import Portal from 'module/Portal'
import styled from '@emotion/styled'
import CustomModal from 'components/common/CustomModal'
import Register from './Register'
import PWFinder from './PWFinder'
interface Props {
    open: boolean,
    closeLogin: () => void,
}

const TextWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    margin:110px 430px 10px 80px;
    width:350px;
    height:400px;
    gap:20px;
`
const Title = styled.div`
    margin:20px;
`

const Wrapper = styled.div`
    display:flex;
    gap: 10px;
`

function LoginComponent({ open, closeLogin }: Props) {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [loginState, setLoginState] = useRecoilState(authState)
    const [isRegisterOpen, setRegisterOpen] = React.useState(false);
    const [isPWFindOpen, setPWFindOpen] = React.useState(false);
    const [payload, setPayload] = React.useState({ id: '', pw: '' })

    const handleInputChange = (e: any, id: "id" | "pw") => {
        const newItem = { ...payload, [id]: e.target.value }
        setPayload(newItem)
    }

    const loginCheck = async () => {

        const loginResult = await getLogin(payload.id, payload.pw)
        if (loginResult) {
            openModal()
            const item: AuthType = {
                id: payload.id,
                username: payload.id,
                role: loginResult.data.role
            }
            setLoginState(item)
        } else {
            openModal()
            setLoginState({ id: '', username: '', role: 0 })

        }
    }

    const numericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberRegex = /[^0-9]/g;
        const result = e.target.value.replace(numberRegex, "")
        e.target.value = result
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            loginCheck()
        }
    }

    const handleRegisterClick = () => {
        setRegisterOpen(true);
    }

    const handlePWFindClick = () => {
        setPWFindOpen(true);
    }

    return (
        <Dialog sx={{ minWidth: 350, overflow: 'hidden' }} maxWidth={'md'} open={open} onClose={closeLogin} onKeyDown={(e: React.KeyboardEvent) => handleKeyPress(e)} >
            {isModalOpen ? loginState.role ? (
                <Portal>
                    <CustomModal isOpen={isModalOpen} title="로그인 성공" message={`ID:${loginState.id}\n로그인에 성공하였습니다.`} close={() => { closeModal(); closeLogin() }} />
                </Portal>
            ) :
                <Portal>
                    <CustomModal isOpen={isModalOpen} title="로그인 실패" message='ID/비밀번호를 확인해주세요.' close={closeModal} />
                </Portal>
                : null
            }
            { isRegisterOpen && <Register isOpen={isRegisterOpen} setIsOpen={setRegisterOpen} />}
            { isPWFindOpen && <PWFinder isOpen={isPWFindOpen} setIsOpen={setPWFindOpen} />}
            <Box sx={{ width: 900, height: 600 }}>
                <TextWrapper>
                    <Title>로그인</Title>
                    <TextField label="사번" onChange={(e) => { handleInputChange(e, 'id') }} onInput={numericInput} />
                    <TextField label="PW" type="password" onChange={(e) => { handleInputChange(e, 'pw') }} />

                    <Button variant='outlined' onClick={() => { loginCheck() }}>로그인</Button>

                    <Wrapper>
                        <Button onClick={handlePWFindClick}>비밀번호 찾기</Button>
                        <Button onClick={handleRegisterClick}>회원가입</Button>
                    </Wrapper>
                </TextWrapper>

            </Box>

        </Dialog>
    )
}

export default LoginComponent