import { Button, TextField } from '@mui/material'
import { frequencyRegex } from 'common/regex/regex'
import { patchFrequnecy } from 'common/service/frequencyService'
import { contentFormat, contentViewFormat, setting } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetSite } from 'components/hooks/useSite'
import { frequencyDTO } from 'dto/frequencyDTO'
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SettingStateType } from '../SettingStateType'

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
            console.log(body)
            await patchFrequnecy(body, settingState.data.id)
            closeWindow();
        }
    }
    React.useEffect(() => {
        console.log(settingState);

        if (site?.current && freq?.current && settingState?.data) {
            freq.current.value = settingState.data.label;
            site.current.value = settingState.data.site;
        }
    }, [settingState])




    return (
        <>
            <ScreenTitle text={'주파수'} />
            <TextField label="주파수" onChange={frequencyErrorHandler} inputRef={freq} defaultValue={settingState.data.label} type="number" error={freqError} />
            <TextField label="표지소" onChange={siteErrorHandler} inputRef={site} defaultValue={settingState.data.site} error={siteError} />
            <Button onClick={patchData}>확인</Button>
            <Button onClick={closeWindow}>취소</Button>
        </>
    )
}

export default FrequencyEdit