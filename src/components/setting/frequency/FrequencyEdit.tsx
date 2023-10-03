import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { frequencyRegex } from 'common/regex/regex'
import { deleteFrequency, patchFrequnecy } from 'common/service/frequencyService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import CustomModal from 'components/common/CustomModal'
import ScreenTitle from 'components/common/ScreenTitle'
import useModal from 'components/hooks/useModal'
import { useGetSite } from 'components/hooks/useSite'
import NavCloseButton from 'components/navbar/NavCloseButton'
import { frequencyDTO } from 'dto/frequencyDTO'
import Portal from 'module/Portal'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SettingStateType } from '../SettingStateType'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
  overflow-X:hidden;
`

const Content = styled.div`
  display:flex;
  gap:10px;
  justify-content:end;
`

function FrequencyEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const setContentView = useSetRecoilState(contentViewFormat)
    const setContent = useSetRecoilState(contentFormat)

    const { data } = useGetSite();

    const siteData = data.map(t => { return { siteName: t.siteName, siteID: t.siteId } });
    const freq = React.useRef<HTMLInputElement>(null)
    const site = React.useRef<HTMLInputElement>(null)
    const [siteError, setSiteError] = React.useState(false);
    const [freqError, setFreqError] = React.useState(false);
    const [modalContext, setModalContext] = React.useState<{ title: string, message: string, close?: () => void }>({ title: '에러 발생', message: '알 수 없는 오류' });
    const { isModalOpen, openModal, closeModal } = useModal()

    function alertModal(open: () => void, title: string, message: string, close?: () => void) {
        setModalContext({ title, message, close })
        open()
    }

    const frequencyErrorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.match(frequencyRegex)) setFreqError(true)
        else setFreqError(false)
    }

    const siteErrorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!siteData.map(t => t.siteName).includes(e.target.value)) {
            setSiteError(true);
        } else {
            setSiteError(false);
        }
    }

    const closeWindow = () => {
        setContent('NONE')
        setContentView('NONE')
        closeModal();
    }

    const patchData = async () => {
        if (freq.current?.value && site.current?.value && !siteError) {
            const updatedSiteId = siteData.filter(t => t.siteName === site.current!.value)[0].siteID!
            const body: frequencyDTO = {
                frequency: +freq.current.value,
                frequencySiteName: site.current.value,
                frequencySiteId: +updatedSiteId
            }
            try {
                if (body.frequency && body.frequencySiteName && body.frequencySiteId) {
                    await patchFrequnecy(body, settingState.data.id)
                    alertModal(openModal, '주파수 수정 성공', `[ ${body.frequencySiteName} | ${body.frequency} ]\n주파수 수정에 성공하였습니다.`, closeWindow)
                } else {
                    throw new Error('BAD REQUEST');
                }
            } catch (e) {
                alertModal(openModal, '주파수 수정 실패', `주파수 수정에 실패하였습니다.`, closeModal)
            }
        }
    }

    const deleteFreq = () => {
        try {
            deleteFrequency(settingState.data.id);
            alertModal(openModal, '주파수 삭제 성공', `주파수 삭제에 성공하였습니다.`, closeWindow)
        } catch (e) {
            alertModal(openModal, '주파수 삭제 실패', `주파수 삭제에 실패하였습니다.`, closeModal)
        }
    }

    React.useEffect(() => {
        if (site?.current && freq?.current && settingState?.data?.label) {
            freq.current.value = settingState.data.label;
            site.current.value = settingState.data.site;
        }
    }, [settingState])


    return (

        settingState?.data ? <Container>
            < ScreenTitle text={'주파수 수정'} />
            <Portal>
                <CustomModal isOpen={isModalOpen} title={modalContext.title} message={modalContext.message} close={modalContext.close} />
            </Portal>
            <Content>
                <TextField label="주파수" onChange={frequencyErrorHandler} fullWidth size='small' inputRef={freq} defaultValue={settingState.data.label} type="number" error={freqError} />
                <TextField label="표지소" onChange={siteErrorHandler} fullWidth size='small' inputRef={site} defaultValue={settingState.data.site} error={siteError} />
            </Content>
            <Content>
                <Button color='error' variant='outlined' onClick={deleteFreq}>주파수 삭제</Button>
                <Button color='error' onClick={closeWindow}>취소</Button>
                <Button onClick={patchData}>확인</Button>
            </Content>
            <NavCloseButton
                contentSize={['NONE', 'MIN']} />
        </Container> : <>{closeWindow()}</>


    )
}

export default FrequencyEdit
