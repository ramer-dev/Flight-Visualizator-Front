import { ContentType, ContentViewType } from "common/type/NavBarType";
import { StyledInputBox } from "components/common/InputText";
import Title from "components/common/Title";
import styled from "@emotion/styled";
import { borderRadius } from "@mui/system";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import L, { LatLngExpression, LatLngLiteral } from "leaflet";
import { useContext, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useRecoilValue } from "recoil";
import { globalMap } from "common/store/atom";

const InputWrapper = styled.div`
    margin: 10px;
`

const FlexBox = styled.div`
    display:flex;
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
    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            
        }
    }
    const origin = useRef<string | LatLngExpression | null>(null)
    const range = useRef<number|null>(null)
    const distance = useRef<number|null>(null)
    // const range = useRef<number|null>(null)

    useEffect(() => {
        console.log(map);
    })
    const handleClick = () => {
        if(!origin.current) return;
        if(!range.current) return;
        if(!distance.current) return;
        if(!map) return;

        if(typeof origin.current === 'string') {
            if(origin.current?.includes('/')){
                let origin_ = origin.current.split('/')
                const point : LatLngLiteral = {lat:+origin_[0], lng:+origin_[1]}
                
                const target = L.GeometryUtil.destination(point, range.current, distance.current * 1852)
                L.polyline([point, target]).addTo(map);
                L.marker(target).addTo(map);

                return
            }
        }
    }
    

    return (
        <div>
            <Title>마킹</Title>
            <SearchBox>
                <InputWrapper>
                    <StyledInputBox onChange={(e) => {origin.current = e.target.value}} label='기준점' fullWidth size='small' />
                </InputWrapper>
                <InputWrapper>
                    <FlexBox>
                        <StyledInputBox sx={{ borderRadius: '15px' }} label='방위' size='small' onChange={(e) => {range.current = +e.target.value}} />
                        <StyledInputBox label='거리' size='small' onChange={(e) => {distance.current = +e.target.value}}/>
                    </FlexBox>
                </InputWrapper>
                <InputWrapper>
                    <StyledInputBox label='색상' fullWidth size='small' />
                </InputWrapper>
                <AddButton variant='outlined' sx={{ borderRadius: '16px', width: 100 }} onClick={handleClick}>추가</AddButton>
            </SearchBox>
            <Divider />

            <DragDropContext onDragEnd={onDragEnd}>

            </DragDropContext>
        </div>
    )
} 