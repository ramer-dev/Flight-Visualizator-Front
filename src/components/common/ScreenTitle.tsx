import React, { ReactNode } from 'react'
import styled from '@emotion/styled'
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import { useSetRecoilState } from 'recoil';
import { contentFormat } from 'common/store/atom';

const TitleWrapper = styled.div`
    display:flex;
    margin:25px 15px;
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
    const handler = useSetRecoilState(contentFormat)
    return (
        <TitleWrapper>
            <ICWrapper onClick={() => handler(null)}>
                <ICArrowLeft />
            </ICWrapper>
            <TitleText>{prop.text}</TitleText>
        </TitleWrapper>

    )
}

export default ScreenTitle