import { contentFormat, contentViewFormat } from 'common/store/atom';
import { ContentType } from 'common/type/NavBarType';
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AreaScreen } from './area/AreaScreen';
import { FixPointScreen } from './fixPoint/FixPointScreen';
import { FrequencyScreen } from './frequency/FrequencyScreen';
import { RouteScreen } from './route/RouteScreen';
import { SectorScreen } from './sector/SectorScreen';
import { SettingState } from './SettingStateType';
import { SiteScreen } from './site/SiteScreen';

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
        case 'site':
            return <SiteScreen content={content} />
        case 'sector':
            return <SectorScreen content={content} />
        default:
            return null;
    }
}

interface SettingType {
    settings: SettingState
}

export const SettingScreen = ({ settings }: SettingType) => {
    const [content, setContent] = useRecoilState(contentFormat);
    const setContentView = useSetRecoilState(contentViewFormat);
    React.useEffect(() => {
        setContentView('NONE')
        setContent('NONE')
    }, [settings])
    
    return (
        <>
            {selector(content, settings)}
        </>
    )
}
