import styled from "@emotion/styled"
import { MenuItem, Autocomplete, TextField, Box, CircularProgress } from "@mui/material"
import { contentFormat } from "common/store/atom"
import ErrorPage from "components/common/ErrorPage"
import { useGetFrequency } from "components/hooks/useFrequency"
import { motion } from "framer-motion"
import React from "react"
import { useRecoilValue } from "recoil"

interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
const Container = styled(motion.div)`
    
`

export default function Frequency({ openEditWindow, changeData }: Props) {
    const { data, refetch, isLoading, isError } = useGetFrequency()
    const content = useRecoilValue(contentFormat)

    React.useEffect(() => {
        if (content === 'NONE') refetch()
    }, [content])
    // const options = [{label:'test'}, {label:'test2'}]
    const options = data.map(t => { return { label: `${t.frequency}`, site: t.frequencySiteName, id: t.frequencyId, siteId: t.frequencySiteId } }).sort((a, b) => a.site.localeCompare(b.site))
    return (
        <Container initial={{y:'-100%', opacity:0}} animate={{y:'0', opacity:1}} transition={{damping:60}}>
            <Autocomplete
                options={options}
                autoHighlight
                groupBy={(option) => option.site}
                onChange={(e, value) => { openEditWindow(); changeData(value) }}
                getOptionLabel={(option) => {return (`${option.site} | ${option.label}`)}}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => {
                    return <>
                        {isLoading ? <CircularProgress size={20} /> : null}
                        {isError ? <ErrorPage /> : null}
                        {
                            <Box component='li' key={option.site + option.id} {...props} value={`${option.site} ${option.label}`}>
                                {option.label} ㎒
                            </Box>
                        }
                    </>
                }}
                renderInput={(params) => <TextField {...params} inputProps={{
                    ...params.inputProps,
                }} label="주파수" />}
            />
        </Container>
    )
}  