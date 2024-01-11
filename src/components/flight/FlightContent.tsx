import HorizontalLine from "components/common/HorizontalLine";
import { StyledInputBox } from "components/common/InputText";
import FlightItem from "./FlightItem";
import React, { useState } from "react";
import Title from "components/common/Title";
import { Fab } from '@mui/material';
import styled from "@emotion/styled";
import AddIcon from '@mui/icons-material/Add'
import { contentFormat } from "common/store/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FlightList } from "common/type/FlightType";
import { useEntireFlightList } from "components/hooks/useFlightList";
import { authState } from "common/store/auth";
import useModal from "components/hooks/useModal";
import Portal from "module/Portal";
import CustomModal from "components/common/CustomModal";


const Container = styled.div`
  position:relative;
`

const Wrapper = styled.div`
    height:100%;
`

const Content = styled.div`
    height:calc(100vh - 135px);
    overflow-y:scroll;
    margin-top:15px;
`

const Scroll = styled.div`
    overflow-y:scroll;
`

const StyledFab = styled(Fab)`
    position:absolute;
    bottom:20px;
    right:10px;
`


const FlightContent = () => {
    const setContentView = useSetRecoilState(contentFormat)
    const { data, refetch } = useEntireFlightList();
    // const [list, setList] = useState<FlightList[]>();
    const [value, setValue] = useState('');
    const auth = useRecoilValue(authState);
    const { isModalOpen, openModal, closeModal } = useModal()

    // useEffect(() => {
    //     const flightList = getFlightList();
    //     flightList
    //         .then(t => setList(t))
    //         .catch(e => console.error(e))
    // }, [])

    const AddFlightResultEvent = (e: any) => {
        if (auth.role >= 2) {
            e.stopPropagation();
            setContentView('ADD');
        } else {
            openModal()
        }
    }
    return (
        <Container>
            <Portal>
                <CustomModal isOpen={isModalOpen} title={'권한 에러'} message={'권한이 없습니다.'} close={closeModal} />
            </Portal>
            <Wrapper>
                <Title>비행검사</Title>
                <StyledInputBox onChange={(e) => setValue(e.target.value)} label="비행검사 이름" fullWidth size='small' color="primary"></StyledInputBox>
                <Content>
                    <Scroll>
                        {
                            data?.map((it: FlightList, i: number) => {
                                return it.testName.includes(value) ? <div key={it.id}>
                                    <HorizontalLine />
                                    <FlightItem testName={it.testName} testDate={it.testDate} testType={it.testType} id={it.id} userId={it.userId} refetch={refetch} />
                                </div> : null
                            })
                        }
                    </Scroll>
                </Content>
            </Wrapper>
            <StyledFab color="info" aria-label="add" onClick={AddFlightResultEvent}>
                <AddIcon color="primary" />
            </StyledFab>
        </Container>
    )
}

export default FlightContent;