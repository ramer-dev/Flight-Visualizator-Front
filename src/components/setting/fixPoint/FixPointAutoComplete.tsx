import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import ErrorPage from 'components/common/ErrorPage';
import { FixPointAutoCompleteItemType } from 'dto/fixPointDTO';
import { LatLngLiteral } from 'leaflet';
import React from 'react'


interface Props {
    openEditWindow?: () => void;
    changeData?: (e: any) => void;
    options: { label: string, coord: LatLngLiteral, id: number }[];
    isLoading: boolean;
    isError: boolean;
    value?: FixPointAutoCompleteItemType;
    label?: string;
}

function FixPointAutoComplete({ openEditWindow, changeData, label, value, options, isLoading, isError }: Props) {
    return (
        <Autocomplete
        key={label}
        clearOnEscape
            fullWidth
            value={value}
            options={options}
            autoHighlight
            onChange={(e, value) => { openEditWindow && openEditWindow(); changeData && changeData(value) }}
            getOptionLabel={(option) => {return option.label}}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => {
                return <>
                    {isLoading && <CircularProgress size={20} key={'loading'} />}
                    {isError && <ErrorPage key={'error'}/>}
                    {
                        <Box component='li' key={option.id + option.label } {...props} value={`${option.label}`}>
                            {option.label}
                        </Box>
                    }
                </>
            }}
            renderInput={(params) => <TextField {...params} inputProps={{
                ...params.inputProps,
            }} label={label || '픽스점'} />}
        />
    )
}

export default FixPointAutoComplete