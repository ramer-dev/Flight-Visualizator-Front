import styled from '@emotion/styled'
import { Divider } from '@mui/material'
import { contentFormat, editingNoticeContent } from 'common/store/atom'
import { ModalStateType } from 'common/type/ModalStateType'
import { NoticeContentType, NoticeContextType } from 'common/type/NoticeType'
import { DeleteButton, ModifyButton } from 'components/common/CustomButton'
import CustomConfirm from 'components/common/CustomConfirm'
import CustomModal from 'components/common/CustomModal'
import useConfirm from 'components/hooks/useConfirm'
import useModal from 'components/hooks/useModal'
import { motion } from 'framer-motion'
import Portal from 'module/Portal'
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
    const { isConfirmOpen, closeConfirm, openConfirm } = useConfirm();
    const setContentFormat = useSetRecoilState(contentFormat);
    const storeNoticeContent = useSetRecoilState(editingNoticeContent);

    const [modalState, setModalState] = React.useState<ModalStateType>({ isError: false })
    const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
    const { isModalOpen, openModal, closeModal } = useModal()

    function alertModal(open: () => void, title: string, message: string, close?: () => void) {
        setModalContext({ title, message, close })
        open()
    }

    const closeScreen = async () => {
        closeModal()
        await setContentFormat('NONE');
        // await setContentFormat('EDIT');
    }

    const hanlderModifyOnClick = async () => {
        const value: NoticeContentType = {
            id,
            title,
            date,
            type,
            context
        }
        storeNoticeContent(value);
        await setContentFormat('EDIT');
    }

    const handleClickDelete = async (func: NoticeContextType) => {
        try {
            if (id) {
                await func.delete(id);
                await func.refresh();

            }
        } catch (e: any) {
            const code = e.response.status;
            if (+code === 403) {
                alertModal(openModal, '공지사항 삭제 실패', `삭제 권한이 없습니다.`, closeModal)
            } else {
                alertModal(openModal, '공지사항 삭제 실패', `공지사항 삭제에 실패했습니다.`, closeModal)
            }
        }
    }

    const confirmOpenDelete = () => {
        openConfirm();
    }

    return (
        <NoticeContext.Consumer>
            {(func) =>

                <>
                    <Portal>
                        {isConfirmOpen &&
                            <CustomConfirm isOpen={isConfirmOpen} title="공지사항 삭제" message={`공지사항을 삭제합니다.\n제목: ${title}\n내용: ${context}`}
                                confirm={() => { handleClickDelete(func) }} close={closeConfirm} />
                        }
                        <Portal>
                            <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
                        </Portal>
                    </Portal>

                    <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <Divider sx={{ margin: '10px 15px' }} />
                        <ButtonWrapper>
                            <ModifyButton onClick={hanlderModifyOnClick}>수정</ModifyButton>
                            <DeleteButton onClick={() => { confirmOpenDelete() }}>삭제</DeleteButton>
                        </ButtonWrapper>
                    </motion.div>
                </>

            }
        </NoticeContext.Consumer>
    )
}

export default NoticeManager