import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentFormat, contentViewFormat, page } from 'common/store/atom';
import { ContentType, ContentViewType, NavBarType } from 'common/type/NavBarType';
import { FlightScreen } from '../flight/FlightScreen';
import { NoticeScreen } from 'components/notice/NoticeScreen';
import Search from 'components/search/Search';

type styleProp = {
    contentView: string | null;
}

const Container = styled.div`
    width:${(props: styleProp) => (props.contentView)};
    height:100vh;
    transition:all 0.3s ease; 
    overflow:hidden;
    user-select: auto;

`

const widthMap = {
    "NONE": '0',
    "MID": '730px',
    "MIN": '395px',
    "FULLSCREEN": 'calc(100vw - 465px)',
    'ENTIRE': 'calc(100vw - 64px)'
}

const selector = (page_: NavBarType) => {
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
            return null;
        default:
            return null;
    }
}

function NavScreen() {
    const selectedPage = useRecoilValue<NavBarType>(page);
    const [contentView, setContentView] = useRecoilState<ContentViewType>(contentViewFormat);
    const [content, setContent] = useRecoilState<ContentType>(contentFormat)

    useEffect(() => {
        if (selectedPage !== 'SEARCH') {
            setContentView('NONE')
            setContent('NONE')
        } else {
            setContentView('ENTIRE')
        }
    }, [selectedPage, setContent, setContentView])
    return (
        <div>
            {(content !== 'NONE' || selectedPage === 'SEARCH' ) &&
                <Container contentView={widthMap[contentView]}>
                    {selector(selectedPage)}
                </Container>
            }
        </div>

    );
}

export default NavScreen;