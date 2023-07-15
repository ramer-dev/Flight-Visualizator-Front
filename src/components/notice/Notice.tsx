import styled from '@emotion/styled';
import { Tab, Tabs, Modal } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { getNotice } from 'common/service/noticeService';
import { NoticeContext } from 'common/type/NoticeType';
import Title from 'components/common/Title'
import { useGetNotice } from 'components/hooks/useNotice';
import React, { useEffect, useState } from 'react'
import NoticeItem from './NoticeItem';

const Container = styled.div`
  overflow-y : scroll;
  height:100vh;
`

function Notice() {

  // const data = useGetNotice();
  const [value, setValue] = useState("전체");
  const [list, setList] = useState<NoticeContext[]>();
  const [open, setOpen] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const stateRefresh = async () => {
    const response =  await getNotice();
    setList(response);
  }
  useEffect(() => {
    stateRefresh()
  }, [value])

  const modalOpener = () => {
    setOpen(true);
  }

  const modalHandleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Modal open={open} onClose={modalHandleClose}>
        <div>
          흠..
        </div>
      </Modal>
      <Title>공지사항</Title>
      <Container>
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" value={"전체"} />
          <Tab label="업데이트" value={"업데이트"} />
          <Tab label="기타" value={"기타"} />
        </Tabs>
        {
          list?.filter(t => value === '업데이트' ? t.type === '업데이트' : value === '기타' ? t.type !== '업데이트' : true).map(t => {
            return <NoticeItem key={t.id} id={t.id} title={t.title} date={t.date} context={t.context} type={t.type} />
          })
        }
      </Container>


    </>
  )
}

export default Notice