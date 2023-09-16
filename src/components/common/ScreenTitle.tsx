import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import { useSetRecoilState } from 'recoil';
import { contentFormat, contentViewFormat } from 'common/store/atom';

const TitleWrapper = styled.div`
    display:flex;
    margin:25px 0;
    align-items:center;
    gap:5px;
`

const TitleText = styled.h1`
    
`

const ICWrapper = styled.div`
  cursor:pointer;
  padding:4px 8px;
`

type Props = {
    text: string | ReactNode
}


function ScreenTitle(prop: Props) {
    const setContent = useSetRecoilState(contentFormat)
    const setContentView = useSetRecoilState(contentViewFormat)

    const handler = React.useCallback(() => {
        setContentView('NONE')
        setContent('NONE')
    }, [])

    return (
        <TitleWrapper>
            <ICWrapper onClick={handler}>
                <ICArrowLeft />
            </ICWrapper>
            <TitleText>{prop.text}</TitleText>
        </TitleWrapper>

    )
}

export default ScreenTitle