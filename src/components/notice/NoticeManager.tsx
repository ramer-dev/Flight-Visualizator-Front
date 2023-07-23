import styled from '@emotion/styled'
import { Divider } from '@mui/material'
import { deleteNotice } from 'common/service/noticeService'
import { contentFormat, editingNoticeContent } from 'common/store/atom'
import { NoticeContentType } from 'common/type/NoticeType'
import { DeleteButton, ModifyButton } from 'components/common/CustomButton'
import { motion } from 'framer-motion'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import { NoticeContext } from './Notice'

interface Props extends NoticeContentType {
    id?: number,
}

const ButtonWrapper = styled.div`
    display:flex;
    justify-content:center;
`


function NoticeManager({ id, title, date, type, context }: Props) {
    const setContentFormat = useSetRecoilState(contentFormat);
    const storeNoticeContent = useSetRecoilState(editingNoticeContent); 
    const hanlderModifyOnClick = async () => {
        const value : NoticeContentType = {
            id,
            title, 
            date, 
            type, 
            context
        }
        storeNoticeContent(value);
        await setContentFormat('NONE');
        await setContentFormat('EDIT');
        
    } 
    return (
        <NoticeContext.Consumer>
            {(func) =>
                <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <Divider sx={{ margin: '10px 15px' }} />
                    <ButtonWrapper>
                        <ModifyButton onClick={hanlderModifyOnClick}>수정</ModifyButton>
                        <DeleteButton onClick={async () => {
                            if (window.confirm('정말 삭제?') && id) {
                                await func.delete(id);
                                await func.refresh();
                            }
                        }}>삭제</DeleteButton>
                    </ButtonWrapper>
                </motion.div>
            }
        </NoticeContext.Consumer>
    )
}

export default NoticeManager