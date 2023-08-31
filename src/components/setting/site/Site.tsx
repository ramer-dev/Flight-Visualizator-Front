import styled from "@emotion/styled"
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { contentFormat } from "common/store/atom";
import ErrorPage from "components/common/ErrorPage";
import { useGetSite } from "components/hooks/useSite";
import React from "react";
import { useRecoilValue } from "recoil";
interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
const Container = styled.div`

`

export default function Site({ openEditWindow, changeData }: Props) {
    const { data, refetch, isLoading, isError } = useGetSite();
    const options = data.map(t => { return { label: `${t.siteName}`, coord: t.siteCoordinate, siteType: t.siteType, id: t.siteId } })
    const content = useRecoilValue(contentFormat)

    React.useEffect(() => {
        if (content === 'NONE') refetch()
    }, [content])

    return (
        <Container>
            <Autocomplete clearOnEscape
                fullWidth
                options={options}
                autoHighlight
                groupBy={(param) => param.siteType}
                onChange={(e, value) => { openEditWindow && openEditWindow(); changeData && changeData(value) }}
                getOptionLabel={(option) => { return option.label }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => {
                    return <>
                        {isLoading && <CircularProgress size={20} />}
                        {isError && <ErrorPage />}
                        {
                            <Box component='li' key={option.id + option.label} {...props} value={`${option.label}`}>
                                {option.label}
                            </Box>
                        }
                    </>
                }}
                renderInput={(params) => <TextField {...params} inputProps={{
                    ...params.inputProps,
                }} label={'표지소'} />}
            />

        </Container>
    )
}  
