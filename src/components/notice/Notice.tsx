import styled from '@emotion/styled';
import { Tab, Tabs, Fab } from '@mui/material'
import { deleteNotice } from 'common/service/noticeService';
import { NoticeContextType } from 'common/type/NoticeType';
import AddIcon from '@mui/icons-material/Add'
import Title from 'components/common/Title'
import { useGetNotice } from 'components/hooks/useNotice';
import React, { createContext, useEffect, useRef, useState } from 'react'
import NoticeItem from './NoticeItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { contentFormat, contentViewFormat } from 'common/store/atom';
import ErrorPage from 'components/common/ErrorPage';
import LoadingPage from 'components/common/LoadingPage';
import { authState } from 'common/store/auth';
import Portal from 'module/Portal';
import useModal from 'components/hooks/useModal';
import CustomModal from 'components/common/CustomModal';

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

  const [value, setValue] = useState("전체");
  const id = useRef<number>(-1);
  const { data, isLoading, isError, refetch } = useGetNotice();
  const auth = useRecoilValue(authState);
  const contentView = useRecoilValue(contentViewFormat);
  const [open, setOpen] = useState(true);
  const { isModalOpen, openModal, closeModal } = useModal()
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const stateRefresh = React.useCallback(async () => {
    refetch()
  }, [refetch]
  )

  const deleteItemFunction = async (id: number) => {
    await deleteNotice(id);
  }

  useEffect(() => {
    if (contentView === "NONE") {
      stateRefresh()
    }
  }, [value, contentView, stateRefresh])

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
    if (auth.role >= 2) {
      setContentFormat('ADD');
    } else {
      openModal()
    }
  }

  const ContextItem = {
    refresh: stateRefresh,
    delete: deleteItemFunction,
    openModal: modalOpener,
    closeModal: modalHandleClose,
    open: open,
    id,
    changeID
  }
  return (
    <NoticeContext.Provider value={ContextItem}>
      <>
        <Portal>
          <CustomModal isOpen={isModalOpen} title={'권한 에러'} message={'권한이 없습니다.'} close={closeModal} />
        </Portal>

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
          {/* <NoticeItem key={'-1'} id={-1} title={'테스트'} date={'2023-07-17'} context={'테스트'} type={'테스트'} /> */}
          {
            isLoading
              ? <LoadingPage />
              : isError
                ? <ErrorPage code='NOT-01' />
                : data?.filter(t => value === '업데이트' ? t.type === '업데이트' : value === '기타' ? t.type !== '업데이트' : true).map(t => {
                  return <NoticeItem key={t.id} id={t.id} title={t.title} date={t.date} context={t.context} type={t.type} />
                })

          }

        </Container>

      </>
    </NoticeContext.Provider>
  )
}

export default Notice