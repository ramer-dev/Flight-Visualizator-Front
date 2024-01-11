import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { patchNotice } from 'common/service/noticeService'
import { contentViewFormat, editingNoticeContent } from 'common/store/atom'
import { ModalStateType } from 'common/type/ModalStateType'
import { NoticeContentType } from 'common/type/NoticeType'
import CustomConfirm from 'components/common/CustomConfirm'
import CustomModal from 'components/common/CustomModal'
import useConfirm from 'components/hooks/useConfirm'
import useModal from 'components/hooks/useModal'
import NavCloseButton from 'components/navbar/NavCloseButton'
import Portal from 'module/Portal'
import React, { useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  margin:75px 10px 10px;
  padding: 10px;
  gap:10px;
  overflow-Y:scroll;
  height:100vh;
`

const DivButtonFlex = styled.div`
  display:flex;
  gap:20px;
  justify-content:center;
`

function NoticeEdit() {
  const setContentType = useSetRecoilState(contentViewFormat)
  const [noticeContent, setNoticeContent] = useRecoilState(editingNoticeContent)
  const { isConfirmOpen, closeConfirm, openConfirm } = useConfirm();

  const [modalState, setModalState] = React.useState<ModalStateType>({ isError: false })
  const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
  const { isModalOpen, openModal, closeModal } = useModal()

  function alertModal(open: () => void, title: string, message: string, close?: () => void) {
    setModalContext({ title, message, close })
    open()
  }

  const title = useRef<HTMLInputElement>(null)
  const tag = useRef<HTMLInputElement>(null)
  const content = useRef<HTMLInputElement>(null)

  const closeScreen = () => {
    closeModal()
    setContentType('NONE')
  }

  const handlerEditOnClick = async () => {
    const body: NoticeContentType = {
      id: noticeContent.id,
      title: title?.current ? title.current.value : noticeContent.title,
      type: tag?.current ? tag.current.value : noticeContent.type,
      context: content?.current ? content.current.value : noticeContent.context,
      date: noticeContent.date,
      version: '',
      user: ''
    }

    try {
      if (body.id) {
        await patchNotice(body, body.id)
        alertModal(openModal, '공지사항 수정 성공', `[ ${body.title} ]\n공지사항 수정에 성공했습니다.`, handlerCancelOnClick)

        // setModalState({ isError: false, isSuccess: true, code: 200, message: '공지사항 수정을 완료했습니다.' })
      }
    } catch (e: any) {
      const code = e.response.status;
      if (+code === 403) {
        alertModal(openModal, '공지사항 수정 실패', `권한이 없습니다.`, closeModal)
      } else {
        alertModal(openModal, '공지사항 수정 실패', `네트워크 에러가 발생했습니다.`, closeModal)
      }
    }
  }

  const handlerCancelOnClick = async () => {
    const body: NoticeContentType = {
      id: noticeContent.id,
      title: '',
      type: '',
      context: '',
      date: '',
      version: '',
      user: ''
    }
    setNoticeContent(body)
    closeScreen();
  }

  const handleModalOpen = () => {
    openConfirm()
  }

  return (
    <>
      {/* <Container> */}
      {
        isConfirmOpen &&
        <Portal>
          <CustomConfirm isOpen={isConfirmOpen} title="공지사항 수정" message={`공지사항을 수정합니다.\n제목: ${noticeContent.title}\n내용: ${noticeContent.context}`}
            confirm={handlerEditOnClick} close={closeConfirm} />
        </Portal>
      }
      <Portal>
        <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
      </Portal>
      <Wrapper>
        <TextField placeholder='공지사항 제목' size='small' label="제목" inputRef={title} defaultValue={noticeContent.title}></TextField>
        <TextField placeholder='태그 선택' size='small' label="태그" inputRef={tag} defaultValue={noticeContent.type}></TextField>
        <TextField placeholder='공지사항 내용' size='small' label="내용" inputRef={content} multiline minRows={3} defaultValue={noticeContent.context}></TextField>
        <DivButtonFlex>
          <Button sx={{ color: 'white' }} variant='contained' onClick={handleModalOpen}>수정</Button>
          <Button variant='outlined' onClick={handlerCancelOnClick}>취소</Button>
        </DivButtonFlex>
      </Wrapper>
      {/* </Container> */}
      <NavCloseButton contentSize={['NONE', 'MIN']} />
    </>

  )
}

export default NoticeEdit