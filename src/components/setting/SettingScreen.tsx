import { contentFormat, setting } from 'common/store/atom';
import { ContentType } from 'common/type/NavBarType';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { FrequencyScreen } from './frequency/FrequencyScreen';
import { SettingState } from './SettingStateType';

const selector = (content: ContentType, settingValue: SettingState) => {
    switch (settingValue) {
        case 'frequency':
            return <FrequencyScreen content={content} />

        default:
            return null;
    }
}

export const SettingScreen = () => {
    const content = useRecoilValue(contentFormat);
    const settingValue = useRecoilValue(setting)
    return (
        <>
            {selector(content, settingValue.current)}
        </>
    )
}
