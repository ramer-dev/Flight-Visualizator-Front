import { StyledInputBox } from "components/common/InputText";
import Title from "components/common/Title";
import styled from "@emotion/styled";
import { Divider, FormControl, FormHelperText, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { Button } from "@mui/material";
import MarkingCard, { MarkingCardProps } from "./MarkingCard";
import MarkingDragDrop from "./MarkingDragDrop";
import { useGetSite } from "components/hooks/useSite";
import { useEffect, useRef, useState } from "react";
import { Destination } from "module/Destination";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { useMap } from "react-leaflet";
import React from "react";
import { useRecoilState } from "recoil";
import { markingCards } from "common/store/atom";
import divicon from "module/NumberIcon";
import L from "leaflet";
import { blue, green, orange, pink, red, yellow } from "@mui/material/colors";
import MarkingTooltip from "./MarkingTooltip";


const InputWrapper = styled.div`
    margin: 10px 10px 0px;
`

const FlexBox = styled.div`
    display:flex;
    justify-content:center;
    align-content:center;
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
    const [color, setColor] = useState<string>('5');
    // const [error, setError] = useState<boolean[]>([false, false, false]);
    const origin = useRef<LatLngExpression>({ lat: 0, lng: 0 });
    const angle = useRef<HTMLInputElement>(null);
    const distance = useRef<HTMLInputElement>(null);
    const layerGroup = useRef(L.layerGroup([], { pane: 'marking' }))

    useEffect(() => {
        console.log(list);
        const layer = list.map((t: MarkingCardProps, index: number) => L.marker(t.coord!, { icon: divicon(t.level, index), pane: 'marking' })
            .bindTooltip(MarkingTooltip(t)))


        layerGroup.current.clearLayers()
        for (let i of layer) {
            layerGroup.current.addLayer(i)
        }
        layerGroup.current.addTo(map);

    }, [list])
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

    const Validation = () => {
        const arr = [false, false, false];

        site === ''
            ? arr[0] = true
            : arr[0] = false;

        if (angle.current && distance.current) {
            angle.current.value === ''
                ? arr[1] = true
                : arr[1] = false;

            distance.current.value === ''
                ? arr[2] = true
                : arr[2] = false;
        }

        // setError(arr);
        if (arr.includes(true)) return true;
        return false;
    }

    const AddElement = (origin_: LatLngExpression, site_: string) => {
        if (angle.current && distance.current) {

            // if (Validation()) return;

            const item: MarkingCardProps = {
                id: list.length.toString(),
                site: site_,
                distance: +distance.current.value,
                angle: +angle.current.value,
                index: list.length,
                level: +color,
                coord: Destination(map, origin_, +angle.current.value, +distance.current.value, +color, list.length)
            }
            const arr = [...list, item]
            setList(arr);

            angle.current.value = '';
            distance.current.value = '';
            angle.current.focus();
        }
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const controlProps = (item: string) => ({
        checked: color === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <div>
            <Title>마킹</Title>
            <SearchBox>
                <FormControl>
                    <InputWrapper>
                        <h6>기준점</h6>
                        <Select MenuProps={{ sx: { maxHeight: '400px' } }} open={siteMenuOpen} value={site} fullWidth size='small'
                            onClick={handleSiteClickOpen}
                            onClose={handleSiteClickClose}
                            onChange={handleSiteChange}>
                            {data?.map(t => {
                                return <MenuItem onClick={handleSiteClickClose} key={t.siteId} value={t.siteName}>{t.siteName}</MenuItem>
                            })}
                        </Select>
                        {/* {<FormHelperText error={error[0]}>{error[0] ? '기준점을 선택해주세요.' : ' '}</FormHelperText>} */}
                        {/* <PinButton onClick={() => { setMarking({ selection: true, coordinate: marking.coordinate }) }}>Select</PinButton> */}
                    </InputWrapper>
                    <InputWrapper>
                        <FlexBox>
                            <StyledInputBox inputRef={angle} type={'number'} sx={{ borderRadius: '15px' }} label='방위' size='small' />
                            <StyledInputBox inputRef={distance} type={'number'} label='거리' size='small' />
                        </FlexBox>
                    </InputWrapper>
                    <InputWrapper>
                        <FlexBox>
                            <Radio {...controlProps('5')} sx={{
                                color: blue[500],
                                '&.Mui-checked': {
                                    color: blue[500],
                                }
                            }} />
                            <Radio {...controlProps('4')} sx={{
                                color: green[500],
                                '&.Mui-checked': {
                                    color: green[500],
                                }
                            }} />
                            <Radio {...controlProps('3')} sx={{
                                color: yellow[600],
                                '&.Mui-checked': {
                                    color: yellow[600],
                                }
                            }} />
                            <Radio {...controlProps('2')} sx={{
                                color: orange[400],
                                '&.Mui-checked': {
                                    color: orange[400],
                                }
                            }} />
                            <Radio
                                {...controlProps('1')}
                                sx={{
                                    color: red[800],
                                    '&.Mui-checked': {
                                        color: red[600],
                                    },
                                }}
                            />
                            <Radio {...controlProps('0')} sx={{
                                color: "black",
                                '&.Mui-checked': {
                                    color: "black",
                                }
                            }} />
                        </FlexBox>
                    </InputWrapper>
                    <AddButton variant='outlined' sx={{ borderRadius: '16px', width: 100 }}
                        onClick={() => {
                            AddElement(origin.current, site)
                        }}
                    >추가</AddButton>
                </FormControl>
            </SearchBox>
            <Divider />

            <DragDropContext>
                <MarkingDragDrop />

            </DragDropContext>

        </div >
    )
} 