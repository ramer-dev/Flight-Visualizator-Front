import styled from "@emotion/styled"
import { Autocomplete, Box, CircularProgress, MenuItem, Select, TextField } from "@mui/material"
import { contentFormat } from "common/store/atom";
import ErrorPage from "components/common/ErrorPage";
import { useGetRoute } from "components/hooks/useRoute";
import React from "react";
import { useRecoilValue } from "recoil";
interface Props {
    openEditWindow: () => void;
    changeData: (e: any) => void;
}
const Container = styled.div`

`

export default function Route({ openEditWindow, changeData } : Props) {
    const { data, refetch, isLoading, isError } = useGetRoute();
    const options = data.map(t => { return { label: `${t.routeName}`, coords: t.routeData, id: t.routeId } })
    const content = useRecoilValue(contentFormat)

    React.useEffect(() => {
        if (content === 'NONE') refetch()
    }, [content])

    return (
        <Container>
            <Autocomplete
                options={options}
                autoHighlight
                onChange={(e, value) => { openEditWindow(); changeData(value) }}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => {
                    return <>
                        {isLoading && <CircularProgress size={20} /> }
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
                }} label="항로" />}
            />
        </Container>
    )
}  
