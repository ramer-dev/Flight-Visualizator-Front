import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import { authState } from 'common/store/auth';
import { NoticeContentType } from 'common/type/NoticeType';
import MarkdownRenderer from 'components/common/MarkdownRenderer';
import { motion } from 'framer-motion';
import React from 'react'
import { useRecoilValue } from 'recoil';
import NoticeManager from './NoticeManager';

interface Props extends NoticeContentType {
    isOpen?: boolean;
    auth?: number; 
}

const Content = styled(motion.div)`
    word-break:break-all;
`

// const ItemContainer = styled.div`
//     /* height: ${({ isOpen }: Props) => isOpen ? '100%' : '0'}; */
//     opacity: ${({ isOpen }: Props) => isOpen ? 1 : 0};
//     transition:0.3s all ease;
// `

function NoticeContent({ id, context, isOpen, type, title, date  }: Props) {
    const authLevel = useRecoilValue(authState);
    return (
        
        <motion.div>
            <Divider sx={{ margin: '10px 15px' }} />
            <Content initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{context}</Content>
            <MarkdownRenderer/>
            {authLevel.role >= 1 ? <NoticeManager id={id} title={title} context={context} type={type} date={date}/> : null}
        </motion.div>
    )
}

export default NoticeContent