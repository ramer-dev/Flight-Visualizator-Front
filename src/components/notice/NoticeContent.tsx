import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import { auth } from 'common/store/auth';
import { NoticeContext } from 'common/type/NoticeType';
import { motion } from 'framer-motion';
import React from 'react'
import { useRecoilValue } from 'recoil';
import NoticeManager from './NoticeManager';

interface Props {
    id: number,
    content?: string;
    isOpen?: boolean;
    auth?: number;
    removeFunc: (id: number) => void;
    modifyFunc: (item: NoticeContext) => void;
}

const ItemContainer = styled.div`
    /* height: ${({ isOpen }: Props) => isOpen ? '100%' : '0'}; */
    opacity: ${({ isOpen }: Props) => isOpen ? 1 : 0};
    transition:0.3s all ease;
`

function NoticeContent({ id, content, isOpen, removeFunc, modifyFunc }: Props) {
    const authLevel = useRecoilValue(auth);
    return (
        <motion.div>
            <Divider sx={{ margin: '10px 15px' }} />
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{content}</motion.div>
            {authLevel ? <NoticeManager id={id} removeFunc={removeFunc} modifyFunc={modifyFunc} /> : null}
        </motion.div>
    )
}

export default NoticeContent