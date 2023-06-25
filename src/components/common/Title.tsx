import styled from "@emotion/styled";
import { ReactComponent as ICArrowLeft } from 'atom/icon/icon_arrow_left.svg';
import { page } from "common/store/atom";
import { NavBarType } from "common/type/NavBarType";
import { useSetRecoilState } from "recoil";
const TitleText = styled.h1`
  margin: 25px 0;
`

const Wrapper = styled.div`
  display:flex;
  align-items: center;
  gap:5px;
`
const ICWrapper = styled.div`
  cursor:pointer;
  padding:4px 8px;
`

type WrapperProps = {
  children: React.ReactNode;
}

const Title = ({ children }: WrapperProps) => {

  const setPage = useSetRecoilState<NavBarType>(page);

  return (
    <Wrapper>
      <ICWrapper onClick={() => setPage(null)}>
        <ICArrowLeft />
      </ICWrapper>
      <TitleText>
        {children}
      </TitleText>
    </Wrapper>);
}

export default Title;