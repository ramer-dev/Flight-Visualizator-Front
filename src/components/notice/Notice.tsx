import { Tab, Tabs } from '@mui/material'
import Title from 'components/common/Title'
import NavCloseButton from 'components/navbar/NavCloseButton'
import React from 'react'
import NoticeItem from './NoticeItem';

function Notice() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Title>공지사항</Title>
      <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" value={"전체"} />
          <Tab label="업데이트" value={"업데이트"}/>
          <Tab label="기타" value={"기타"}/>
        </Tabs>


      <NoticeItem title={'제목'} date={'2022-22-22'} content={'내용'} isUpdate/>
      <NoticeItem title={'제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목'} date={'2022-22-22'} content={'내용'} isUpdate/> 

    </>
  )
}

export default Notice