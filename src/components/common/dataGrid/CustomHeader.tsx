import styled from '@emotion/styled'
import { Button, Divider, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { MuiFileInput } from 'mui-file-input'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FlightList } from 'common/type/FlightType';
import dayjs from 'dayjs';
import { title } from 'process';
import CustomFileInput from '../CustomFileInput';
import { postRoute } from 'common/service/fileService';

const Container = styled.div`
    width:100%;
`

const InputWrapper = styled.div`
    display:flex;
    padding:15px 10px;
    gap:10px;
`

interface Props {
    titleData: FlightList;
    setTitleData: (item: FlightList) => void;
    edit?: boolean;
    submitted: boolean;
    setSubmitted: (b : boolean) => void;
}



function CustomHeader({ titleData, setTitleData, edit, submitted, setSubmitted }: Props) {

    const [routeFile, setRouteFile] = React.useState<File>();
    const [resultFile, setResultFile] = React.useState<File[]>([]);
    const [flightData, setFlightData] = React.useState<FlightList>(titleData)
    const handleFileChange = (newFile: any) => {
        setRouteFile(newFile);
    }

    const resultFileChange = (newFile: any) => {
        setResultFile(newFile);
        console.log(newFile)

    }
    const titleRef = React.useRef<HTMLInputElement>();
    const typeRef = React.useRef<HTMLInputElement>();
    const routeRef = React.useRef<HTMLInputElement>();
    const dateRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {

        if (titleData) {
            if (titleRef.current) titleRef.current.value = titleData.testName;
            if (typeRef.current) typeRef.current.value = titleData.testType;
            // if (routeRef.current) routeRef.current.value = 'wtf'
        }
    }, [titleData])

    const handleSubmit = async () => {
        if (titleRef.current && typeRef.current && routeRef.current && dateRef.current) {
            if(routeFile){
                const {filePath} = await postRoute(routeFile);
                setTitleData({ ...titleData, testName: titleRef.current.value, testType: typeRef.current.value, testDate: dateRef.current.value, testRoute: filePath })
            } else {
                setTitleData({ ...titleData, testName: titleRef.current.value, testType: typeRef.current.value, testDate: dateRef.current.value })
            }
            setSubmitted(true);
        }
    }
    const handleCancel = () => {
        setSubmitted(false);
    }
    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputWrapper>
                    <TextField inputRef={titleRef} helperText="비행검사명" size='small' disabled={!edit || submitted}></TextField>
                    <TextField inputRef={typeRef} sx={{ width: 128 }} helperText="검사유형" size='small' disabled={!edit || submitted}></TextField>
                    <MuiFileInput label="항적 파일" value={routeFile} onChange={handleFileChange} disabled={!edit || submitted} size='small' helperText='항적 파일' sx={{ width: 256 }} inputRef={routeRef} hideSizeText getInputText={(value) => { return value?.size && value.name ? value.name : titleData?.testRoute ? '경로 입력됨' : '' }} />
                    {/* <MuiFileInput value={resultFile} onChange={resultFileChange} size='small' placeholder='결과지 파일' sx={{ width: 256 }} inputRef={resultRef} hideSizeText multiple  /> */}
                    {/* <CustomFileInput id={1}/> */}
                    <DatePicker format="YYYY-MM-DD" inputRef={dateRef} slotProps={{ textField: { size: 'small', helperText: '검사일자' } }} value={titleData?.testDate ? dayjs(titleData.testDate) : null} sx={{ width: 156 }} disabled={!edit || submitted} />
                    {edit ?
                        <>
                            <Button onClick={handleSubmit} disabled={!edit || submitted} sx={{height:40}}>확인</Button>
                            <Button onClick={handleCancel} color="error" disabled={!edit || !submitted} sx={{height:40}}>취소</Button>
                        </> : null
                    }
                </InputWrapper>
            </LocalizationProvider>
            <Divider />
        </Container>
    )
}

export default CustomHeader