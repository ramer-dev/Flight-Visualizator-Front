import { TextField } from '@mui/material'
import { setting } from 'common/store/atom'
import ScreenTitle from 'components/common/ScreenTitle'
import { useGetSite } from 'components/hooks/useSite'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { SettingStateType } from '../SettingStateType'

function FrequencyEdit() {
    const settingState = useRecoilValue<SettingStateType>(setting)
    const {data} = useGetSite();

    const siteData = data.map(t => t.siteName);
    const freq = React.useRef<string>(settingState.data.label)
    const site = React.useRef<string>(settingState.data.site)

    return (
        <>
            <ScreenTitle text={'주파수'} />
            <TextField label="주파수" value={freq.current} type="number"/>
            <TextField label="표지소" value={site.current} error={!siteData.includes(site.current)}/>
        </>
    )
}

export default FrequencyEdit