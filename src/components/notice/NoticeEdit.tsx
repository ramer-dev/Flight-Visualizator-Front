import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { patchNotice } from 'common/service/noticeService'
import { contentViewFormat, editingNoticeContent } from 'common/store/atom'
import { NoticeContentType } from 'common/type/NoticeType'
import NavCloseButton from 'components/navbar/NavCloseButton'
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

  const title = useRef<HTMLInputElement>(null)
  const tag = useRef<HTMLInputElement>(null)
  const content = useRef<HTMLInputElement>(null)

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
    if (body.id) {
      await patchNotice(body, body.id)
      setContentType('NONE');
    } else {
      window.alert('error')
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
    setContentType('NONE');
  }

  return (
    <>
      {/* <Container> */}
      <Wrapper>
        <TextField placeholder='공지사항 제목' size='small' label="제목" inputRef={title} defaultValue={noticeContent.title}></TextField>
        <TextField placeholder='태그 선택' size='small' label="태그" inputRef={tag} defaultValue={noticeContent.type}></TextField>
        <TextField placeholder='공지사항 내용' size='small' label="내용" inputRef={content} multiline minRows={3} defaultValue={noticeContent.context}></TextField>
        <DivButtonFlex>
          <Button sx={{ color: 'white' }} variant='contained' onClick={handlerEditOnClick}>수정</Button>
          <Button variant='outlined' onClick={handlerCancelOnClick}>취소</Button>
        </DivButtonFlex>
      </Wrapper>
      {/* </Container> */}
      <NavCloseButton contentSize={['MIN']} />
    </>

  )
}

export default NoticeEdit