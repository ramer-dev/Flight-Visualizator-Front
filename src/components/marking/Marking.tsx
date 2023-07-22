import { StyledInputBox, StyledSelectBox } from "components/common/InputText";
import Title from "components/common/Title";
import styled from "@emotion/styled";
import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Button } from "@mui/material";
import MarkingCard, { MarkingCardProps } from "./MarkingCard";
import MarkingDragDrop from "./MarkingDragDrop";
import { useGetSite } from "components/hooks/useSite";
import { useEffect, useRef, useState } from "react";
import { Destination } from "module/Destination";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { useMap } from "react-leaflet";
import { SiteType } from "common/type/SiteType";
import React from "react";
import { useRecoilState } from "recoil";
import { markingCards } from "common/store/atom";

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
    const map = useMap();
    const { data } = useGetSite();
    const [site, setSite] = useState('')
    const [siteMenuOpen, setSiteMenuOpen] = useState(false);
    const [list, setList] = useRecoilState<MarkingCardProps[]>(markingCards);
    const origin = useRef<LatLngExpression>({ lat: 0, lng: 0 });
    const range = useRef(0);
    const distance = useRef(0);

    useEffect(() => {
        console.log(list)
    })
    const handleSiteChange = (e: any) => {
        const it = e.target.value as string
        setSite(it)
        changeOrigin(it)
        // handleSiteClickClose();
    }

    const handleSiteClickOpen = (e: any) => {
        e.stopPropagation();
        setSiteMenuOpen(true);
    }

    const handleSiteClickClose = (e: any) => {
        e.stopPropagation();
        setSiteMenuOpen(false);
    }

    const changeOrigin = (it: string) => {
        const coordinate = data?.filter(t => t.siteName === it)[0].siteCoordinate!
        origin.current = coordinate;
    }

    const changeRange = (e: any) => {
        range.current = e.target.value as number;
    }

    const changeDistance = (e: any) => {
        distance.current = e.target.value as number;
    }
    const AddElement = (origin_: LatLngExpression, site_: string, angle_: number, distance_: number) => {
        const item : MarkingCardProps = {
            id: list.length.toString(),
            site: site_,
            distance: distance_,
            angle: angle_,
            index: list.length
        }
        const arr = [...list, item]
        setList(arr);
    }

    return (
        <div>
            <Title>마킹</Title>
            <SearchBox>
                <FormControl>
                    <InputWrapper>
                        <InputLabel id='site-label'>기준점</InputLabel>
                        <Select MenuProps={{ sx: { maxHeight: '400px' } }} labelId='site-label' open={siteMenuOpen} label='기준점' value={site} fullWidth size='small'
                            onClick={handleSiteClickOpen}
                            onClose={handleSiteClickClose}
                            onChange={handleSiteChange}>
                            {data?.map(t => {
                                return <MenuItem onClick={handleSiteClickClose} key={t.siteId} value={t.siteName}>{t.siteName}</MenuItem>
                            })}
                        </Select>
                        {/* <PinButton onClick={() => { setMarking({ selection: true, coordinate: marking.coordinate }) }}>Select</PinButton> */}
                    </InputWrapper>
                    <InputWrapper>
                        <FlexBox>
                            <StyledInputBox onChange={changeRange} type={'number'} sx={{ borderRadius: '15px' }} label='방위' size='small' />
                            <StyledInputBox onChange={changeDistance} type={'number'} label='거리' size='small' />
                        </FlexBox>
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInputBox label='색상' fullWidth size='small' />
                    </InputWrapper>
                    <AddButton variant='outlined' sx={{ borderRadius: '16px', width: 100 }}
                        onClick={() => {
                            console.log(origin.current, site, range.current, distance.current)
                            Destination(map, origin.current, range.current * (180/Math.PI), distance.current, 5, list.length)
                            AddElement(origin.current, site, range.current, distance.current)
                        }}
                    >추가</AddButton>
                </FormControl>
            </SearchBox>
            <Divider />

            <DragDropContext>
                <MarkingDragDrop/>

            </DragDropContext>

        </div >
    )
} 