import { StyledInputBox, StyledSelectBox } from "components/common/InputText";
import Title from "components/common/Title";
import styled from "@emotion/styled";
import { Divider, InputLabel } from "@mui/material";
import { Button } from "@mui/material";
import MarkingCard from "./MarkingCard";
import MarkingDragDrop from "./MarkingDragDrop";

const InputWrapper = styled.div`
    margin: 10px;
`

const FlexBox = styled.div`
    display:flex;
`

const PinButton = styled(Button)`
    
`

const SearchBox = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;
`
const AddButton = styled(Button)`
    margin: 10px auto 25px;
`

const DragDropContext = styled.div`
    height:calc(100vh - 352px);
`

export default function Marking() {
    // const map = useMap();

    return (
        <div>
            <Title>마킹</Title>
            <SearchBox>
                <InputWrapper>
                    <InputLabel id="point-select-label">기준점</InputLabel>
                    <StyledSelectBox labelId="point-select-label" label='기준점' defaultValue={'부안'} fullWidth size='small' >

                    </StyledSelectBox>
                    {/* <PinButton onClick={() => { setMarking({ selection: true, coordinate: marking.coordinate }) }}>Select</PinButton> */}
                </InputWrapper>
                <InputWrapper>
                    <FlexBox>
                        <StyledInputBox sx={{ borderRadius: '15px' }} label='방위' size='small' />
                        <StyledInputBox label='거리' size='small' />
                    </FlexBox>
                </InputWrapper>
                <InputWrapper>
                    <StyledInputBox label='색상' fullWidth size='small' />
                </InputWrapper>
                <AddButton variant='outlined' sx={{ borderRadius: '16px', width: 100 }}
                // onClick={() => {
                // console.log(origin, site, range, distance)
                // Destination(map, site ? site : origin, range.current, distance.current)
                // }}
                >추가</AddButton>
            </SearchBox>
            <Divider />

            <DragDropContext>
                <MarkingDragDrop>
                    <MarkingCard id={'1'} site={"안양"} distance={110} angle={25} index={1} />
                    <MarkingCard id={'2'} site={"안양"} distance={110} angle={25} index={1} />
                    <MarkingCard id={'3'} site={"안양"} distance={111} angle={25} index={1} />
                    <MarkingCard id={'4'} site={"안양"} distance={110} angle={25} index={1} />
                    <MarkingCard id={'5'} site={"안양"} distance={110} angle={25} index={1} />
                    <MarkingCard id={'6'} site={"안양"} distance={110} angle={25} index={1} />
                    <MarkingCard id={'7'} site={"안양"} distance={110} angle={25} index={1} />
                    <div id={'8'}> 테스트 ㅋㅋ</div>
                </MarkingDragDrop>

            </DragDropContext>

        </div >
    )
} 