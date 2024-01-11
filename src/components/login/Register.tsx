import styled from '@emotion/styled'
import { Box, Button, Dialog, Divider, TextField, Typography } from '@mui/material'
import { passwordRegex } from 'common/regex/regex'
import { register, RegisterType, verifyId, verifyName } from 'common/service/loginService'
import useDebounce from 'components/hooks/useDebounce'
import React from 'react'

interface Props {
    isOpen: boolean,
    setIsOpen: (a: boolean) => void,
}

const Title = styled.h1`
    margin:30px 60px 0;
`

function Register({ isOpen, setIsOpen }: Props) {

    const [enable, setEnable] = React.useState(true);
    const [accountData, setAccountData] = React.useState<RegisterType>({
        id: "",
        pw: "",
        pwConfirm: "",
        username: "",
        digit: "",
        digitConfirm: ""
    })

    const [accountError, setAccountError] = React.useState({
        id: false,
        pw: true,
        pwConfirm: true,
        username: false,
        digit: true,
        digitConfirm: true
    })

    const changeSetterData = (e: React.ChangeEvent<HTMLInputElement>, tag: keyof RegisterType) => {
        setAccountData((prevState) => { return { ...prevState, [tag]: e.target.value } })
        let bool = false;
        switch (tag) {
            case 'id':
                bool = e.target.value.length < 5;
                setAccountError((prev) => { return { ...prev, id: bool } })
                break;
            case 'pw':
                bool = !passwordRegex.test(e.target.value)
                setAccountError((prev) => { return { ...prev, pw: bool } })
                break;
            case 'pwConfirm':
                bool = (!passwordRegex.test(e.target.value))
                setAccountError((prev) => { return { ...prev, pwConfirm: bool } })
                break;

            case 'digit':
                bool = e.target.value.length < 6
                setAccountError((prev) => { return { ...prev, digit: bool } })
                break;
            case 'digitConfirm':
                bool = e.target.value.length < 6
                setAccountError((prev) => { return { ...prev, digitConfirm: bool } })
                break;
        }
    }

    const close = () => {
        setIsOpen(false)
    }

    const numericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberRegex = /[^0-9]/g;
        const result = e.target.value.replace(numberRegex, "")
        e.target.value = result
    }

    const clickRegister = async () => {
        register(accountData)
        alert(`${accountData.username}님 가입 완료되었습니다.`)
        close();
    }

    const checkId = async (id: string) => {
        const res = await verifyId(id)
        return res?.data
    }

    const checkName = async (name: string) => {
        const res = await verifyName(name)
        return res?.data;
    }

    React.useEffect(() => {
        const bool = !Object.keys(accountError).map(t => accountError[t as keyof RegisterType]).every(t => !t);
        const pw = accountData.pw !== accountData.pwConfirm
        const digit = accountData.digit !== accountData.digitConfirm

        // 디바운스 적용 필요
        if (accountData.id.length === 5) checkId(accountData.id).then(t => setAccountError((prev) => { return { ...prev, id: t } }))
        checkName(accountData.username).then(t => setAccountError((prev) => { return { ...prev, username: t } }))
        setAccountError((prev) => { return { ...prev, digitConfirm: digit } })
        setAccountError((prev) => { return { ...prev, pwConfirm: pw } })
        setEnable(bool)

    }, [accountData])


    return (
        <Dialog open={isOpen} onClose={close}>
            <Title>회원가입</Title>
            <Typography sx={{ margin: '10px 60px 0' }}>비밀번호는 영어, 특수문자, 숫자 포함하여<br /> 8~16자로 작성해주세요. </Typography>
            <Box sx={{ width: 400, height: 600, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <TextField label="사번" inputProps={{ maxLength: 5 }} error={accountError.id} helperText={(accountData.id.length < 5 && "아이디를 확인해주세요.") || (accountError.id && "중복된 아이디가 있습니다.")} onInput={numericInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSetterData(e, "id")} />
                    <TextField name='pw' label="비밀번호" type="password" error={accountError.pw} helperText={accountError.pw && "비밀번호를 올바른 형식으로 입력해주세요."} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSetterData(e, "pw")} />
                    <TextField name='pw' label="비밀번호 확인" type="password" error={accountError.pwConfirm} helperText={accountError.pwConfirm && "비밀번호를 확인해주세요."} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSetterData(e, "pwConfirm")} />
                    <Divider />
                    <TextField name='nickname' label="닉네임" error={accountError.username} inputProps={{ maxLength: 6 }} helperText={accountError.username && "중복된 닉네임이 있습니다."} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSetterData(e, "username")} />
                    <TextField name='digit' type="password" error={accountError.digit} label="2차 비밀번호 (6자리 숫자)" helperText={accountError.digit && "비밀번호를 6자리 입력해주세요."} onInput={numericInput} inputProps={{ maxLength: 6 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSetterData(e, "digit")} />
                    <TextField name='digit' type="password" error={accountError.digitConfirm} label="2차 비밀번호 확인" helperText={accountError.digitConfirm ? "비밀번호를 확인해주세요." : "비밀번호 찾기에 사용됩니다."} onInput={numericInput} inputProps={{ maxLength: 6 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeSetterData(e, "digitConfirm")} />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button disabled={enable} onClick={clickRegister}>회원가입</Button>
                        <Button color='error' onClick={close}>취소</Button>

                    </Box>
                </Box>
            </Box> 
        </Dialog>
    )
}

export default Register