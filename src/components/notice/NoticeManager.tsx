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

    const { isModalOpen, closeModal, openModal } = useModal()
    const [modalState, setModalState] = React.useState<ModalStateType>({ isError: false })

    const hanlderModifyOnClick = async () => {
        const value: NoticeContentType = {
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

    const handleClickDelete = async (func: NoticeContextType) => {
        try {
            if (id) {
                await func.delete(id);
                await func.refresh();
                setModalState({ isError: false, isSuccess: true, code: 200, message: '삭제를 완료했습니다.' })
            }
        } catch (e: any) {
            const code = e.response.status;
            if (+code === 403) {
                setModalState({ isError: true, code, message: '삭제 권한이 없습니다.' })
            } else {
                setModalState({ isError: true, code, message: '네트워크 에러가 발생했습니다.' })
            }
        } finally {
            openModal()
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
                        {
                            isModalOpen &&
                            <CustomModal isOpen={isModalOpen} title={modalState.isSuccess ? "삭제 완료" : "에러"} message={modalState.message} close={closeModal} />
                        }
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