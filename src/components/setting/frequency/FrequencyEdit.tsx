import { TextField } from '@mui/material'
import { frequencyRegex } from 'common/regex/regex'
import { setting } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetSite } from 'components/hooks/useSite'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { SettingStateType } from '../SettingStateType'

function FrequencyEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const { data } = useGetSite();

    const siteData = data.map(t => t.siteName);
    const freq = React.useRef<HTMLInputElement>(null)
    const site = React.useRef<HTMLInputElement>(null)
    const [siteError, setSiteError] = React.useState(false);
    const [freqError, setFreqError] = React.useState(false);


    const frequencyErrorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.value.match(frequencyRegex)) setFreqError(true)
        else setFreqError(false)
    }

    const siteErrorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!siteData.includes(e.target.value)) {
            setSiteError(true);
        } else {
            setSiteError(false);
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
            <TextField label="주파수" onChange={frequencyErrorHandler} inputRef={freq} defaultValue={settingState.data.label} type="number" error={freqError}/>
            <TextField label="표지소" onChange={siteErrorHandler} inputRef={site} defaultValue={settingState.data.site} error={siteError} />
        </>
    )
}

export default FrequencyEdit