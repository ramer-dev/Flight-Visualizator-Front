import styled from '@emotion/styled'
import { Divider } from '@mui/material'
import { NoticeContext } from 'common/type/NoticeType'
import { DeleteButton, ModifyButton } from 'components/common/CustomButton'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
    id:number,
    removeFunc : (id: number) => void;
    modifyFunc : (item : NoticeContext) => void;
}

const ButtonWrapper = styled.div`
    display:flex;
    justify-content:center;
`

function NoticeManager({id, removeFunc, modifyFunc} : Props) {
    return (
        <motion.div initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}}>
            <Divider sx={{margin:'10px 15px'}}/>
            <ButtonWrapper>
                <ModifyButton >수정</ModifyButton>
                <DeleteButton onClick={() => removeFunc(id)}>삭제</DeleteButton>
            </ButtonWrapper>
        </motion.div>
    )
}

export default NoticeManager