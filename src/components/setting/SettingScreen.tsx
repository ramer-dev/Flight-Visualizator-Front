import { contentFormat, setting } from 'common/store/atom';
import { ContentType } from 'common/type/NavBarType';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { AreaScreen } from './area/AreaScreen';
import { FixPointScreen } from './fixPoint/FixPointScreen';
import { FrequencyScreen } from './frequency/FrequencyScreen';
import { RouteScreen } from './route/RouteScreen';
import { SettingState } from './SettingStateType';

const selector = (content: ContentType, settingValue: SettingState) => {
    switch (settingValue) {
        case 'frequency':
            return <FrequencyScreen content={content} />
        case 'area':
            return <AreaScreen content={content} />

        case 'fixPoint':
            return <FixPointScreen content={content} />
        case 'route':
            return <RouteScreen content={content} />

        default:
            return null;
    }
}

interface SettingType {
    settings: SettingState
}

export const SettingScreen = ({ settings }: SettingType) => {
    const content = useRecoilValue(contentFormat);
    return (
        <>
            {selector(content, settings)}
        </>
    )
}
