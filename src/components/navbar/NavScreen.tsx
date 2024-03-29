import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentFormat, contentViewFormat, page, setting } from 'common/store/atom';
import { ContentType, ContentViewType, NavBarType } from 'common/type/NavBarType';
import { FlightScreen } from '../flight/FlightScreen';
import { NoticeScreen } from 'components/notice/NoticeScreen';
import Search from 'components/search/Search';
import { SettingScreen } from 'components/setting/SettingScreen';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { SettingState } from 'components/setting/SettingStateType';

type styleProp = {
    contentview: string | null;
}

const Container = styled(motion.div)`
    height:100vh;
    padding: ${({ contentview }: styleProp) => contentview === '0' || contentview?.charAt(0) === 'c' ? 0 : '10px 25px'};
    user-select: auto;
    z-index:2100;
`

const widthMap = {
    "NONE": '0',
    "MID": '680px',
    "MIN": '345px',
    "FULLSCREEN": 'calc(100vw - 465px)',
    'ENTIRE': 'calc(100vw - 64px)'
}

const selector = (page_: NavBarType, settingState?: SettingState) => {
    switch (page_) {
        case "FLIGHT_RESULT":
            return <FlightScreen />
        case "MARKING":
            return null;
        case "NOTICE":
            return <NoticeScreen />;
        case "SEARCH":
            return <Search />;
        case "SETTING":
            return settingState && <SettingScreen settings={settingState} />
        default:
            return null;
    }
}

function NavScreen() {
    const selectedPage = useRecoilValue<NavBarType>(page);
    const [contentView, setContentView] = useRecoilState<ContentViewType>(contentViewFormat);
    const settingValue = useRecoilValue(setting)
    const [content, setContent] = useRecoilState<ContentType>(contentFormat)
    const controls = useAnimation();

    const menuHandlerStyles = {
        active: {
            x: 0,
        },
        inactive: {
            x: '100%'
        }
    };

    useEffect(() => {
        // if (selectedPage !== 'SEARCH') {
        //     setContentView('NONE')
        //     setContent('NONE')
        // } else {
        //     setContentView('ENTIRE')
        // }

        // if (content !== 'NONE' || selectedPage === 'SEARCH') {
        //     controls.start('active')
        // } else {
        //     controls.start('inactive')
        // }
        if (selectedPage !== 'SEARCH') {
            setContentView('NONE');
            setContent('NONE');
            controls.start('inactive');
        } else {
            setContentView('ENTIRE');
            if (content !== 'NONE') {
                controls.start('active');
            } else {
                controls.start('inactive');
            }
        }
    }, [selectedPage, setContent, setContentView])
    
    return (
        <AnimatePresence mode='wait'>
            <motion.div variants={menuHandlerStyles}>
                <Container contentview={widthMap[contentView]} initial={{ x: '-100%' }} animate={{ x: 0, width: widthMap[contentView] }}>
                    {selector(selectedPage, settingValue.current)}
                </Container>
            </motion.div>


        </AnimatePresence>


    );
}

export default NavScreen;