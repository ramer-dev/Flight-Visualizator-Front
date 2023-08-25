import { TextField } from '@mui/material'
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
            <TextField label="주파수" inputRef={freq} defaultValue={settingState.data.label} type="number" />
            <TextField label="표지소" inputRef={site} defaultValue={settingState.data.site} error={site?.current ? !siteData.includes(site.current.value) : false} />
        </>
    )
}

export default FrequencyEdit