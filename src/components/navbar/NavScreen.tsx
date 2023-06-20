import React from 'react';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { contentViewFormat } from 'common/store/atom';

type styleProp = {
    contentView: boolean | null;
}

const Container = styled.div`
    width:${(props: styleProp) => (props.contentView ? 'calc(100vw - 420px)' : '300px')};
`

function NavScreen() {
    const [contentView, setContentView] = useRecoilState<boolean>(contentViewFormat);

    return (
        <Container contentView={contentView}>
            hello
        </Container>
    );
}

export default NavScreen;