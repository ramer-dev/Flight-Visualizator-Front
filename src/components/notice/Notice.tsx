import { Tab, Tabs, Modal } from '@mui/material'
import { NoticeContext } from 'common/type/NoticeType';
import Title from 'components/common/Title'
import React, { useState } from 'react'
import NoticeItem from './NoticeItem';

const dummyData: NoticeContext[] = [
  { id: 0, title: '1', content: '2', date: '2022-02-01' },
  { id: 1, title: '2', content: '3', date: '2022-02-02' },

]

function Notice() {
  const [value, setValue] = useState("전체");
  const [list, setList] = useState<NoticeContext[]>(dummyData);
  const [open, setOpen] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const stateRefresh = () => {
    const result : NoticeContext[] = [];
    setList(result);
  }

  const modalHandleClose =() => {
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
      <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
        <Tab label="전체" value={"전체"} />
        <Tab label="업데이트" value={"업데이트"} />
        <Tab label="기타" value={"기타"} />
      </Tabs>

      {
    list.map(t => {
      return <NoticeItem key={t.id} id={t.id} title={t.title} date={t.date} content={t.content} isUpdate={t.isUpdate} />
    })
  }
    </>
  )
}

export default Notice