import { TextField } from '@mui/material'
import { frequencyRegex } from 'common/regex/regex'
import { setting } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetSite } from 'components/hooks/useSite'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { SettingStateType } from '../SettingStateType'

function FrequencyAdd() {
    // const settingState = useRecoilValue<SettingStateType>(setting)
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

    return (
        <>
            <ScreenTitle text={'주파수'} />
            <TextField label="주파수" onChange={frequencyErrorHandler} inputRef={freq} type="number" error={freqError}/>
            <TextField label="표지소" onChange={siteErrorHandler} inputRef={site} error={siteError} />
        </>
    )
}

export default FrequencyAdd