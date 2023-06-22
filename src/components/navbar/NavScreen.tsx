import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { contentFormat, contentViewFormat, page } from 'common/store/atom';
import { ContentType, ContentViewType, NavBarType } from 'common/type/NavBarType';
import NavCloseButton from './NavCloseButton';
import { FlightScreen } from '../flight/FlightScreen';

type styleProp = {
    contentView: string | null;
}

const Container = styled.div`
    width:${(props: styleProp) => (props.contentView)};
    transition:all 0.3s ease; 
    overflow:hidden;
    user-select: auto;

`

const widthMap = {
    "NONE": '0',
    "MID": '730px',
    "MIN": '395px',
    "FULLSCREEN": 'calc(100vw - 465px)'
}

const selector = (page_: NavBarType) => {
    switch (page_) {
        case "FLIGHT_RESULT":
            return <FlightScreen />
        case "MARKING":
            return null;
        case "NOTICE":
            return null;
        case "SEARCH":
            return null;
        case "SETTING":
            return null;
        default:
            return null;
    }
}

function NavScreen() {
    const [selectedPage, setPage] = useRecoilState<NavBarType>(page);
    const [contentView, setContentView] = useRecoilState<ContentViewType>(contentViewFormat);
    const [content, setContent] = useRecoilState<ContentType>(contentFormat)
    return (
        <>
            {content &&
                <Container contentView={widthMap[contentView]}>
                    {selector(selectedPage)}
                </Container>
            }
        </>
    );
}

export default NavScreen;