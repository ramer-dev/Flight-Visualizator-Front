import styled from '@emotion/styled';
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import { contentViewFormat } from 'common/store/atom';
import { ContentViewType } from 'common/type/NavBarType';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

type CloseButtonType = {
    fullScreen?: ContentViewType;
    contentSize: ContentViewType[];
    children?: ReactNode;
}

const CloseButton = styled.div`
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  position: absolute;
  right: ${({contentSize, fullScreen}: CloseButtonType) => contentSize.indexOf(fullScreen!) === contentSize.length - 1 ? '0' : '-25px'};
  top: calc(50% - 25px);
  width: 25px;
  height: 50px;
  border-width: 1px 1px 1px 0 ;
  border-style: solid;
  border-color: #DDDDDD;
  cursor: pointer;
  transform: ${({contentSize, fullScreen}: CloseButtonType) => contentSize.indexOf(fullScreen!) === contentSize.length - 1 ? 'rotateZ(180deg)' : 'rotateZ(0deg)'}; 
  z-index:2300;
  &:hover {

  }
`

const CloseArrow = styled.div`
    transform: rotateZ(180deg);
      margin: 13px 7px;
`

const NavCloseButton = ({fullScreen, contentSize, children}: CloseButtonType) => {
    const [contentView, setContentView] = useRecoilState<ContentViewType>(contentViewFormat)
    const switchView = () => {
        if (contentSize.length) {
            const idx = contentSize.indexOf(contentView);
            if (contentSize.length - 1 >= idx + 1) {
                setContentView(contentSize[idx + 1])
            } else {
                setContentView(contentSize[0])
            }
        }
    }

    useEffect(() => {
        setContentView(contentSize.length ? contentSize.at(-1)! : 'NONE')
    }, [])
    
    return (
        <>
            {contentSize.length <= 1 ? null :
                <CloseButton contentSize={contentSize} onClick={switchView}
                    fullScreen={contentView}>
                    <CloseArrow>
                        <ICArrowLeft />
                    </CloseArrow>
                </CloseButton>
            }
        </>
    )
}

export default NavCloseButton