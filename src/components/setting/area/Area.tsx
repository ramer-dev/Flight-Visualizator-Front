import styled from "@emotion/styled"
import { Autocomplete, Box, CircularProgress, MenuItem, Select, TextField } from "@mui/material"
import { contentFormat } from "common/store/atom";
import ErrorPage from "components/common/ErrorPage";
import { useGetArea } from "components/hooks/useArea";
import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";

const Container = styled(motion.div)`
    
`
interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
export default function Area({ openEditWindow, changeData }: Props) {
    const { data, refetch, isLoading, isError } = useGetArea(true);
    const options = data.map(t => { return { label: `${t.areaName}`, color: t.areaColor, id: t.areaId } })
    const content = useRecoilValue(contentFormat)

    React.useEffect(() => {
        if (content === 'NONE') refetch()
    }, [content])

    return (
        <Container initial={{y:'-100%', opacity:0}} animate={{y:'0', opacity:1}} transition={{damping:60}}>
            <Autocomplete
                options={options}
                autoHighlight
                onChange={(e, value) => { openEditWindow(); changeData(value) }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => {
                    return <>
                        {isLoading ? <CircularProgress size={20} /> : null}
                        {isError ? <ErrorPage /> : null}
                        {
                            <Box component='li' key={option.id + option.label} {...props} value={`${option.label}`}>
                                {option.label} <span style={{ color: option.color }}>■</span>
                            </Box>
                        }
                    </>
                }}
                renderInput={(params) => <TextField {...params} inputProps={{
                    ...params.inputProps,
                }} label="구역" />}
            />
        </Container>
    )
}  