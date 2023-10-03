import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { postNotice } from 'common/service/noticeService'
import { contentViewFormat, editingNoticeContent } from 'common/store/atom'
import { NoticeContentType } from 'common/type/NoticeType'
import CustomModal from 'components/common/CustomModal'
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
  overflow-X:hidden;
  overflow-Y:scroll;
  height:100vh;
`

const DivButtonFlex = styled.div`
  display:flex;
  gap:20px;
  justify-content:center;
`
function NoticeAdd() {
  const setContentType = useSetRecoilState(contentViewFormat)
  const [noticeContent, setNoticeContent] = useRecoilState(editingNoticeContent)
  const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
  const { isModalOpen, openModal, closeModal } = useModal()

  function alertModal(open: () => void, title: string, message: string, close?: () => void) {
    setModalContext({ title, message, close })
    open()
  }
  const title = useRef<HTMLInputElement>(null)
  const tag = useRef<HTMLInputElement>(null)
  const content = useRef<HTMLInputElement>(null)

  const stateRefresh = () => {
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

  }
  const handlerAddOnClick = async () => {
    const body: NoticeContentType = {
      title: title?.current ? title.current.value : noticeContent.title,
      type: tag?.current ? tag.current.value : noticeContent.type,
      context: content?.current ? content.current.value : noticeContent.context,
      date: new Date().toISOString(),
      version: '',
      user: ''
    }
    try {
      await postNotice(body)
      alertModal(openModal, '공지사항 추가 성공', `[ ${body.title} ]\n공지사항 추가에 성공했습니다.`, handlerCancelOnClick)
      
    } catch (e: any) {
      const code = e.response.status;
      if (+code === 403) {
        alertModal(openModal, '공지사항 추가 에러', '권한이 없습니다.', closeModal)
      } else {
        alertModal(openModal, '공지사항 추가 에러', '네트워크 에러', closeModal)
      }
    }
  }

  const handlerCancelOnClick = async () => {
    stateRefresh()
    closeModal()
    setContentType('NONE');
  }

  return (

    <Wrapper>
      <Portal>
        <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
      </Portal>
      <TextField placeholder='공지사항 제목' size='small' label="제목" inputRef={title} ></TextField>
      <TextField placeholder='태그 선택' size='small' label="태그" inputRef={tag}></TextField>
      <TextField placeholder='공지사항 내용' size='small' label="내용" inputRef={content} multiline minRows={3}></TextField>
      <DivButtonFlex>
        <Button sx={{ color: 'white' }} variant='contained' onClick={handlerAddOnClick}>추가</Button>
        <Button variant='outlined' onClick={handlerCancelOnClick}>취소</Button>
      </DivButtonFlex>
      <NavCloseButton contentSize={['NONE', 'MIN']} />
    </Wrapper>


  )
}

export default NoticeAdd