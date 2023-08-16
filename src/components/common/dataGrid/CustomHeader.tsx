import styled from '@emotion/styled'
import { Button, Divider, TextField } from '@mui/material'
import React from 'react'
import { MuiFileInput } from 'mui-file-input'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FlightList } from 'common/type/FlightType';
import dayjs from 'dayjs';
import { title } from 'process';
import CustomFileInput from '../CustomFileInput';

const Container = styled.div`
    width:100%;
`

const InputWrapper = styled.div`
    display:flex;
    padding:15px 10px;
    flex-wrap:wrap;
    gap:10px;
`

interface Props {
    titleData: FlightList;
    setTitleData : (item : FlightList) => void;
    edit?: boolean;
}



function CustomHeader({ titleData, setTitleData, edit }: Props) {


    const [routeFile, setRouteFile] = React.useState(null);
    const [resultFile, setResultFile] = React.useState<File[]>([]);
    const [flightData, setFlightData] = React.useState<FlightList>(titleData)
    const handleFileChange = (newFile: any) => {
        setRouteFile(newFile);
        console.log(newFile)
    }

    const resultFileChange = (newFile: any) => {
        setResultFile(newFile);
        console.log(newFile)

    }
    const titleRef = React.useRef<HTMLInputElement>();
    const typeRef = React.useRef<HTMLInputElement>();
    const routeRef = React.useRef<HTMLInputElement>();
    const resultRef = React.useRef<HTMLInputElement>();

    React.useEffect(() => {
        // if (data) setFlightData(data)
        if (routeRef.current)
            console.log(routeRef.current.files)
        if (titleData) {
            if (titleRef.current) titleRef.current.value = titleData.testName;
            if (typeRef.current) typeRef.current.value = titleData.testType;
            // if (routeRef.current) routeRef.current.value = 'wtf'
        }
    }, [titleData])

    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputWrapper>
                    <TextField inputRef={titleRef} helperText="비행검사명" size='small' disabled={!edit}></TextField>
                    <TextField inputRef={typeRef} sx={{width:128}} helperText="검사유형" size='small' disabled={!edit}></TextField>
                    <MuiFileInput label="항적 파일" value={routeFile} onChange={handleFileChange} disabled={!edit} size='small' helperText='항적 파일' sx={{ width: 256 }} inputRef={routeRef} hideSizeText getInputText={(value) => {console.log(value); return value?.size && value.name ? value.name : titleData?.testRoute ? '경로 입력됨' : ''}}/>
                    {/* <MuiFileInput value={resultFile} onChange={resultFileChange} size='small' placeholder='결과지 파일' sx={{ width: 256 }} inputRef={resultRef} hideSizeText multiple  /> */}
                    {/* <CustomFileInput id={1}/> */}
                    <DatePicker format="YYYY-MM-DD" slotProps={{ textField: { size: 'small', helperText:'검사일자' } }} value={titleData?.testDate ? dayjs(titleData.testDate) : null} sx={{ width: 156 }} disabled={!edit}/>
                    <Button>Submit</Button>
                </InputWrapper>
            </LocalizationProvider>
            <Divider />
        </Container>
    )
}

export default CustomHeader