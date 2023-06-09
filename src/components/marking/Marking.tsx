import { ContentType, ContentViewType } from "common/type/NavBarType";
import { StyledInputBox, StyledSelectBox } from "components/common/InputText";
import Title from "components/common/Title";
import styled from "@emotion/styled";
import { borderRadius } from "@mui/system";
import { Divider, InputLabel, InputProps, MenuItem, SelectChangeEvent } from "@mui/material";
import { Button } from "@mui/material";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import L, { LatLngExpression, LatLngLiteral } from "leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { globalMap, markingSelectCursor, siteState } from "common/store/atom";
import { Destination } from "module/Destination";
import MarkingCard from "./MarkingCard";

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



export default function Marking() {
    const map = useMap();

    return (
        <div>
            <Title>마킹</Title>
            <SearchBox>
                <InputWrapper>
                        <InputLabel id="point-select-label">기준점</InputLabel>
                        <StyledSelectBox labelId="point-select-label" label='기준점' fullWidth size='small' >

                        </StyledSelectBox>
                        {/* <PinButton onClick={() => { setMarking({ selection: true, coordinate: marking.coordinate }) }}>Select</PinButton> */}
                </InputWrapper>
                <InputWrapper>
                    <FlexBox>
                        <StyledInputBox sx={{ borderRadius: '15px' }} label='방위' size='small'/>
                        <StyledInputBox label='거리' size='small'/>
                    </FlexBox>
                </InputWrapper>
                <InputWrapper>
                    <StyledInputBox label='색상' fullWidth size='small' />
                </InputWrapper>
                <AddButton variant='outlined' sx={{ borderRadius: '16px', width: 100 }} 
                // onClick={() => {
                //     console.log(origin, site, range, distance)
                //     Destination(map, site ? site : origin, range.current, distance.current)
                // }}
                >추가</AddButton>
            </SearchBox>
            <Divider />

            {/* <DragDropContext>

            </DragDropContext> */}
            <MarkingCard site={"안양"} distance={110} angle={25} index={1} />
            <MarkingCard site={"안양"} distance={110} angle={25} index={1} coord={{lat:126.34, lng:242.44}} />

        </div >
    )
} 