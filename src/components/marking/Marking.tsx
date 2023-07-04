import { ContentType, ContentViewType } from "common/type/NavBarType";
import { StyledInputBox } from "components/common/InputText";
import Title from "components/common/Title";
import styled from "@emotion/styled";
import { borderRadius } from "@mui/system";
import { Divider, InputProps } from "@mui/material";
import { Button } from "@mui/material";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import L, { LatLngExpression, LatLngLiteral } from "leaflet";
import { useContext, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import { useRecoilState, useRecoilValue } from "recoil";
import { globalMap, markingSelectCursor, siteState } from "common/store/atom";
import { Destination } from "module/Destination";

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
    const sites = useRecoilValue(siteState)
    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {

        }
    }
    const [origin, setOrigin] = useState<string | LatLngExpression | null>(null)
    const originRef = useRef<InputProps>(null);
    const range = useRef<number | null>(null)
    const distance = useRef<number | null>(null)
    const [marking, setMarking] = useRecoilState(markingSelectCursor);
    let site: LatLngLiteral | null = null;
    useEffect(() => {
        const filter = sites.filter(t => t.siteName === origin);
        if (filter.length) {
            site = filter[0].siteCoordinate as LatLngLiteral;
        }

        // 사이트 값이 고정되는 버그 있음
        if(!marking.selection && originRef.current) {
            originRef.current.value = marking.coordinate.lat.toFixed(5) + '/' +marking.coordinate.lng.toFixed(5);
        }
    }, [origin, marking])
    // const range = useRef<number|null>(null)

    return (
        <div>
            <Title>마킹</Title>
            <SearchBox>
                <InputWrapper>
                    <FlexBox>
                        <StyledInputBox autoFocus inputRef={originRef} onChange={(e) => { setOrigin(e.target.value) }} label='기준점' fullWidth size='small' />
                        <PinButton onClick={() => {setMarking({selection:true, coordinate: marking.coordinate})}}>Select</PinButton>
                    </FlexBox>
                    </InputWrapper>
                <InputWrapper>
                    <FlexBox>
                        <StyledInputBox sx={{ borderRadius: '15px' }} label='방위' size='small' onChange={(e) => { range.current = +e.target.value }} />
                        <StyledInputBox label='거리' size='small' onChange={(e) => { distance.current = +e.target.value }} />
                    </FlexBox>
                </InputWrapper>
                <InputWrapper>
                    <StyledInputBox label='색상' fullWidth size='small' />
                </InputWrapper>
                <AddButton variant='outlined' sx={{ borderRadius: '16px', width: 100 }} onClick={() => {
                    console.log(origin, site, range, distance)
                    Destination(map, site ? site : origin, range.current, distance.current)
                }}>추가</AddButton>
            </SearchBox>
            <Divider />

            <DragDropContext onDragEnd={onDragEnd}>

            </DragDropContext>
        </div>
    )
} 