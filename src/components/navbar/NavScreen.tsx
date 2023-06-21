import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { contentFormat, contentViewFormat } from 'common/store/atom';
import { ContentType, ContentViewType } from 'common/type/NavBarType';
import NavCloseButton from './NavCloseButton';

type styleProp = {
    contentView: string | null;
}

const Container = styled.div`
    width:${(props: styleProp) => (props.contentView)};
    transition:all 0.3s ease; 
    overflow:hidden;
`

const widthMap = {
    "NONE": '0',
    "MID": '730px',
    "MIN": '395px',
    "FULLSCREEN": 'calc(100vw - 465px)'
}

function NavScreen() {
    const [contentView, setContentView] = useRecoilState<ContentViewType>(contentViewFormat);
    const [content, setContent] = useRecoilState<ContentType>(contentFormat)
    return (
        <>
            {content &&
                <Container contentView={widthMap[contentView]}>
                    hello
                    <NavCloseButton format={['MIN', 'MID']} />

                </Container>
            }
        </>
    );
}

export default NavScreen;