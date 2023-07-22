import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { contentFormat, contentViewFormat, page } from 'common/store/atom';
import { ContentType, ContentViewType, NavBarType } from 'common/type/NavBarType';
import { FlightScreen } from '../flight/FlightScreen';
import { NoticeScreen } from 'components/notice/NoticeScreen';

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
            return <NoticeScreen/>;
        case "SEARCH":
            return null;
        case "SETTING":
            return null;
        default:
            return null;
    }
}

function NavScreen() {
    const selectedPage = useRecoilValue<NavBarType>(page);
    const contentView = useRecoilValue<ContentViewType>(contentViewFormat);
    const content = useRecoilValue<ContentType>(contentFormat)
    return (
        <div>
            {content &&
                <Container contentView={widthMap[contentView]}>
                    {selector(selectedPage)}
                </Container>
            }
        </div>

    );
}

export default NavScreen;