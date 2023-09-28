import styled from '@emotion/styled';
import { Box, Button, Dialog, Divider, TextField, Typography } from '@mui/material'
import { passwordRegex } from 'common/regex/regex';
import { FinderDataType, findPW, setNewPW, SetterDataType } from 'common/service/loginService';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
interface Props {
    isOpen: boolean,
    setIsOpen: (a: boolean) => void,
}

const Title = styled.h1`
    margin:30px 60px 0;
`

const FindContainer = styled(motion(Box))`
   width: 400px;
   height: 300px; 
   display: flex;
   justify-content: center; 
   align-items: center; 
`

function PWFinder({ isOpen, setIsOpen }: Props) {
    const [verified, setVerified] = React.useState(false)
    const [finderData, setFinderData] = React.useState<FinderDataType>({ id: '', digit: '', verifyDigit: '' })
    const [setterData, setSetterData] = React.useState<SetterDataType>({ pw: '', confirm: '' })
    const [error, setError] = React.useState(false);
    const [enabled, setEnabled] = React.useState(false);
    const [pwEnabled, setPwEnabled] = React.useState(false);
    const [pwError, setPwError] = React.useState({ pw: false, confirm: false })
    const close = () => {
        setIsOpen(false);
        setVerified(false);
    }

    const numericInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberRegex = /[^0-9]/g;
        const result = e.target.value.replace(numberRegex, "")
        e.target.value = result
    }

    const changeData = (e: React.ChangeEvent<HTMLInputElement>, tag: keyof FinderDataType) => {
        setFinderData((prevState) => { return { ...prevState, [tag]: e.target.value } })
    }

    const changeSetterData = (e: React.ChangeEvent<HTMLInputElement>, tag: keyof SetterDataType) => {
        setSetterData((prevState) => { return { ...prevState, [tag]: e.target.value } })

    }

    const changeContext = async () => {
        if (enabled) {
            const res = await findPW(finderData);
            if (res?.data) setVerified(true)
            else alert('회원정보를 찾을 수 없습니다.')
        }
    }

    const chnageNewPW = async () => {
        if (pwEnabled && verified && !pwError.confirm && !pwError.pw) { 
            const result = await setNewPW(finderData.id, setterData.pw)
            if(result?.data) {
                alert('비밀번호 변경에 성공했습니다.')
                close()
            } 
         }
    }

    React.useEffect(() => {
        const samePassword = finderData.digit === finderData.verifyDigit;
        if (!samePassword) setError(true)
        else setError(false)

        if (finderData.digit.length === 6 && finderData.verifyDigit.length === 6 && finderData.id.length === 5 && samePassword) {
            setEnabled(true)
        } else setEnabled(false)

    }, [finderData])


    const isPasswordValid = (password : string) => passwordRegex.test(password);

    React.useEffect(() => {
        const confirmMatchesPassword = setterData.confirm === setterData.pw;
        setPwEnabled(isPasswordValid(setterData.pw) && confirmMatchesPassword);
        setPwError((prev) => ({
            ...prev,
            confirm: (!confirmMatchesPassword && !isPasswordValid(setterData.confirm)),
            pw: !isPasswordValid(setterData.pw),
          }));


    }, [setterData])
    return (
        <Dialog open={isOpen} onClose={close}>
            <Title>비밀번호 찾기</Title>
            <AnimatePresence>
                {!verified ? <FindContainer animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ ease: "easeOut" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField key={'finder_id'} label="사번" inputProps={{ maxLength: 5 }} onInput={numericInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeData(e, 'id') }} />
                        <TextField key={'finder_digit'} name='digit' type="password" label="2차 비밀번호 (6자리 숫자)" onInput={numericInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeData(e, 'digit') }} inputProps={{ maxLength: 6 }} />
                        <TextField key={'finder_digit_confirm'} name='digit' type="password" label="2차 비밀번호 확인" onInput={numericInput} error={error} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeData(e, 'verifyDigit') }} inputProps={{ maxLength: 6 }} />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Button onClick={changeContext} disabled={!enabled}>확인</Button>
                            <Button color='error' onClick={close}>취소</Button>

                        </Box>
                    </Box>
                </FindContainer> :
                    <>
                        <Typography sx={{ margin: '10px 60px 0' }}>비밀번호는 영어, 특수문자, 숫자 포함하여<br /> 8~16자로 작성해주세요. </Typography>
                        <FindContainer initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ ease: "easeOut" }}>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField key={'finder_newPW'} label="신규 비밀번호 입력" type="password" error={pwError.pw} helperText={pwError.pw && '입력 형식이 맞지 않습니다.'} inputProps={{ maxLength: 15 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeSetterData(e, 'pw') }} />
                                <TextField key={'finder_newPW_confirm'} label="비밀번호 확인" type="password" error={pwError.confirm} helperText={pwError.confirm && '비밀번호를 확인해주세요.'} inputProps={{ maxLength: 15 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { changeSetterData(e, 'confirm') }} />
                                <Button onClick={chnageNewPW} disabled={!pwEnabled}>확인</Button>
                                <Button color='error' onClick={close}>취소</Button>
                            </Box>
                        </FindContainer>
                    </>}
            </AnimatePresence>

        </Dialog>
    )
}

export default PWFinder