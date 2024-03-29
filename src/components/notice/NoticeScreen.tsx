import styled from '@emotion/styled';
import { contentFormat } from 'common/store/atom'
import { ContentType } from 'common/type/NavBarType';
import React from 'react'
import { useRecoilValue } from 'recoil'
import NoticeAdd from './NoticeAdd';
import NoticeEdit from './NoticeEdit';

const selector = (content: ContentType) => {
    switch (content) {
        case 'ADD':
            return <NoticeAdd/>;
        case 'EDIT':
            return <NoticeEdit />;
        // case 'VIEW':
            // return <FlightView />;
        default:
            return null;
    }
}

const Wrapper = styled.div`
  overflow-X:hidden;
`

export const NoticeScreen = () => {
    const content = useRecoilValue(contentFormat);
    return (
        <Wrapper>
            {selector(content)}
        </Wrapper>
    )
}
