import styled from '@emotion/styled';
import { Tab, Tabs, Modal, Fab } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { deleteNotice, getNotice } from 'common/service/noticeService';
import { NoticeContentType, NoticeContextType } from 'common/type/NoticeType';
import AddIcon from '@mui/icons-material/Add'
import Title from 'components/common/Title'
import { useGetNotice } from 'components/hooks/useNotice';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react'
import NoticeItem from './NoticeItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { contentFormat, contentViewFormat } from 'common/store/atom';

const Container = styled.div`
  overflow-y : scroll;
  height:calc(100vh - 128px);
`

const CustomFAB = styled(Fab)`
  position:absolute;
  right:10px;
  bottom:20px;
`


export const NoticeContext = createContext<NoticeContextType>({
  refresh: function (): void {
    throw new Error('Function not implemented.');
  },
  delete: function (id: number): void {
    throw new Error('Function not implemented.');
  },
  openModal: function (): void {
    throw new Error('Function not implemented.');
  },
  closeModal: function (): void {
    throw new Error('Function not implemented.');
  },
  id: undefined,
  changeID: function (i: number): void {
    throw new Error('Function not implemented.');
  }
});

function Notice() {

  // const data = useGetNotice();
  const [value, setValue] = useState("전체");
  const id = useRef<number>(-1);
  const contentView = useRecoilValue(contentViewFormat);
  const [list, setList] = useState<NoticeContentType[]>();
  const [open, setOpen] = useState(true);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const stateRefresh = async () => {
    const response = await getNotice();
    setList(response);

    console.log(response)
  }

  const deleteItemFunction = async (id: number) => {
    await deleteNotice(id);
  }

  useEffect(() => {
    stateRefresh()
    console.log('notice refreshed')
  }, [value, contentView])

  const modalOpener = () => {
    setOpen(true);
  }

  const modalHandleClose = () => {
    setOpen(false);
  }

  const changeID = (i: number) => {
    id.current = i;
  }

  const setContentFormat = useSetRecoilState(contentFormat)

  const hanlderAddOnClick = () => {
    setContentFormat('ADD');

  }

  const ContextItem = {
    refresh: stateRefresh,
    delete: deleteItemFunction,
    openModal: modalOpener,
    closeModal: modalHandleClose,
    id,
    changeID
  }
  return (
    <NoticeContext.Provider value={ContextItem}>
      <>
        {/* <CustomModal open={open} onClose={modalHandleClose} title={'우ㅡ아'} content={'수액수으'}/> */}
        <Title>공지사항</Title>
        <CustomFAB color="info" onClick={hanlderAddOnClick}>
          <AddIcon color='primary' />
        </CustomFAB>
        <Tabs value={value} variant="fullWidth" onChange={handleChange} aria-label="basic tabs example">
          <Tab label="전체" value={"전체"} />
          <Tab label="업데이트" value={"업데이트"} />
          <Tab label="기타" value={"기타"} />
        </Tabs>
        <Container>

          {
            list?.filter(t => value === '업데이트' ? t.type === '업데이트' : value === '기타' ? t.type !== '업데이트' : true).map(t => {
              return <NoticeItem key={t.id} id={t.id} title={t.title} date={t.date} context={t.context} type={t.type} />
            })
          }
        </Container>

      </>
    </NoticeContext.Provider>
  )
}

export default Notice