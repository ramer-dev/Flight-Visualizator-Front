import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import { frequencyRegex } from 'common/regex/regex'
import { deleteFrequency, patchFrequnecy } from 'common/service/frequencyService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetSite } from 'components/hooks/useSite'
import { frequencyDTO } from 'dto/frequencyDTO'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SettingStateType } from '../SettingStateType'

const Container = styled.div`
  display:flex;
  flex-direction:column;
  gap:15px;
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
    }

    const patchData = async () => {
        if (freq.current?.value && site.current?.value && !siteError) {
            const updatedSiteId = siteData.filter(t => t.siteName === site.current!.value)[0].siteID!
            const body: frequencyDTO = {
                frequency: +freq.current.value,
                frequencySiteName: site.current.value,
                frequencySiteId: +updatedSiteId
            }
            await patchFrequnecy(body, settingState.data.id)
            closeWindow();
        }
    }

    const deleteFreq = () => {
        deleteFrequency(settingState.data.id);
        closeWindow();
    }

    React.useEffect(() => {
        console.log(settingState)
        if (site?.current && freq?.current && settingState?.data?.label) {
            freq.current.value = settingState.data.label;
            site.current.value = settingState.data.site;
        }
    }, [settingState])


    return (

        settingState?.data ? <Container>
            < ScreenTitle text={'주파수 수정'} />

            <Content>
                <TextField label="주파수" onChange={frequencyErrorHandler} fullWidth size='small' inputRef={freq} defaultValue={settingState.data.label} type="number" error={freqError} />
                <TextField label="표지소" onChange={siteErrorHandler} fullWidth size='small' inputRef={site} defaultValue={settingState.data.site} error={siteError} />
            </Content>
            <Content>
                <Button color='error' variant='outlined' onClick={deleteFreq}>주파수 삭제</Button>
                <Button color='error' onClick={closeWindow}>취소</Button>
                <Button onClick={patchData}>확인</Button>
            </Content>
        </Container> : <>{closeWindow()}</>


    )
}

export default FrequencyEdit