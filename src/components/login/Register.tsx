import styled from '@emotion/styled'
import { Box, Button, Dialog, Divider, TextField } from '@mui/material'
import React from 'react'

interface Props {
    isOpen: boolean,
    setIsOpen: (a: boolean) => void,
}

const Title = styled.h1`
    margin:20px 80px 0;
`

function Register({ isOpen, setIsOpen }: Props) {
    const close = () => {
        setIsOpen(false)
    }

    const numericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberRegex = /[^0-9]/g;
        const result = e.target.value.replace(numberRegex, "")
        console.log(result)
        e.target.value = result

    }
    return (
        <Dialog open={isOpen} onClose={close}>
            <Title>회원가입</Title>
            <Box sx={{ width: 400, height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <TextField label="사번" inputProps={{ maxLength: 5 }} onInput={numericInput} />
                    <TextField name='pw' label="비밀번호" type="password" />
                    <TextField name='pw' label="비밀번호 확인" type="password" />
                    <Divider />
                    <TextField name='nickname' label="닉네임" />
                    <TextField name='digit' type="password" label="2차 비밀번호 (6자리 숫자)" onInput={numericInput} inputProps={{ maxLength: 6 }} />
                    <TextField name='digit' type="password" label="2차 비밀번호 확인" helperText="비밀번호 찾기에 사용됩니다." onInput={numericInput} inputProps={{ maxLength: 6 }} />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent:'center'}}>
                        <Button>회원가입</Button>
                        <Button color='error' onClick={close}>취소</Button>

                    </Box>
                </Box>


            </Box>
        </Dialog>
    )
}

export default Register