import styled from '@emotion/styled';
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import { contentViewFormat } from 'common/store/atom';
import { ContentViewType } from 'common/type/NavBarType';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

type CloseButtonType = {
    fullScreen?: ContentViewType;
    format: ContentViewType[];
    children?:ReactNode;
}

const CloseButton = styled.div`
  border-radius: 0 5px 5px 0;
  background-color: #fff;
  position: absolute;
  right: ${(props: CloseButtonType) => props.format.indexOf(props.fullScreen!) === props.format.length - 1 ? '0' : '-25px'};
  top: calc(50% - 25px);
  width: 25px;
  height: 50px;
  border-width: 1px 1px 1px 0 ;
  border-style: solid;
  border-color: #DDDDDD;
  cursor: pointer;
  transform: ${(props: CloseButtonType) => props.format.indexOf(props.fullScreen!) === props.format.length - 1? 'rotateZ(180deg)' : 'rotateZ(0deg)'}; 
  &:hover {

  }
`

const CloseArrow = styled.div`
    transform: rotateZ(180deg);
      margin: 13px 7px;
`

const NavCloseButton = (prop: CloseButtonType) => {
    const [contentView, setContentView] = useRecoilState<ContentViewType>(contentViewFormat)
    const switchView = () => {
        if (prop.format?.length) {
            const idx = prop.format.indexOf(contentView);
            if(prop.format.length-1 >= idx + 1){
                setContentView(prop.format[idx+1])
            } else {
                setContentView(prop.format[0])
            }
        }
    }

    useEffect(() => {
        setContentView(prop.format[0])
    }, [])

    useEffect(() => {
        console.log(contentView)
    }, [contentView])
    return (
        <CloseButton format={prop.format} onClick={switchView}
            fullScreen={contentView}>
            <CloseArrow>
                <ICArrowLeft />
            </CloseArrow>
        </CloseButton>
    )
}

export default NavCloseButton