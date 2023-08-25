import styled from "@emotion/styled"
import { MenuItem, Autocomplete, TextField, Box, CircularProgress } from "@mui/material"
import ErrorPage from "components/common/ErrorPage"
import { useGetFrequency } from "components/hooks/useFrequency"
import React from "react"

interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
const Container = styled.div`
    
`


const handleValue = (e: any, value: any) => {
    console.log(e, value)
}

const handleHighlightValue = (e: any) => {
    console.log(e)
}
export default function Frequency({ openEditWindow, changeData }: Props) {
    const { data, refetch, isLoading, isError } = useGetFrequency()
    // const options = [{label:'test'}, {label:'test2'}]
    const options = data.map(t => { return { label: `${t.frequency}`, site: t.frequencySiteName, id: t.frequencyId } }).sort((a, b) => a.site.localeCompare(b.site))
    return (
        <Container>
            <Autocomplete
                options={options}
                autoHighlight
                groupBy={(option) => option.site}
                onChange={(e, value) => {openEditWindow(); changeData(value)}}
                getOptionLabel={(option) => option.label}
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