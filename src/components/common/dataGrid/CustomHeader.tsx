import styled from '@emotion/styled'
import { Button, Divider, TextField, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { MuiFileInput } from 'mui-file-input'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { FlightList, RowType } from 'common/type/FlightType';
import dayjs from 'dayjs';
import { title } from 'process';
import CustomFileInput from '../CustomFileInput';
import { postImage, postRoute } from 'common/service/fileService';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useGridApiContext } from '@mui/x-data-grid';
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
    setSubmitted: (b: boolean) => void;
    rows: RowType[];
    setRows: (rows: RowType[]) => void;
}



function CustomHeader({ rows, setRows, titleData, setTitleData, edit, submitted, setSubmitted }: Props) {

    const [routeFile, setRouteFile] = React.useState<File>();
    const [ocrFile, setOCRFile] = React.useState<File[]>();
    // const [resultFile, setResultFile] = React.useState<File[]>([]);
    const [flightData, setFlightData] = React.useState<FlightList>(titleData)
    const apiRef = useGridApiContext()
    const handleFileChange = (newFile: any) => {
        setRouteFile(newFile);
    }

    const HandleOCRFileChange = (newFile: any) => {
        setOCRFile(newFile);
    }
    const titleRef = React.useRef<HTMLInputElement>();
    const typeRef = React.useRef<HTMLInputElement>();
    const routeRef = React.useRef<HTMLInputElement>();
    const dateRef = React.useRef<HTMLInputElement>(null);
    const ocrRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {

        if (titleData) {
            if (titleRef.current) titleRef.current.value = titleData.testName;
            if (typeRef.current) typeRef.current.value = titleData.testType;
            if (routeRef.current) routeRef.current.accept = 'application/vnd.ms-excel, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    }, [titleData])

    React.useEffect(() => {

        if (ocrFile) {
            let idx = apiRef.current.getRowsCount();
            
            const response = postImage(ocrFile).then(ocrArray => {
                console.log(ocrArray)
                const newRows = ocrArray.map(paper => 
                    paper.ocr.map(item => {idx++; return {  id:`add-${1000+idx}`, ...item, siteName:paper.site, testId:titleData?.id, no:rows.length+idx}})
                ).flat()
                // apiRef.current.updateRows([newRows])
                setRows([...rows, ...newRows])
                
            })

        }
    }, [ocrFile])

    const handleSubmit = async () => {
        if (titleRef.current && typeRef.current && routeRef.current && dateRef.current) {
            if (routeFile) {
                const { filePath } = await postRoute(routeFile);
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

    const handleOCRClick = () => {
        if (ocrRef.current) {
            ocrRef.current.accept = "image/png, image/jpeg"
            ocrRef.current.click();
        }
    }
    return (
        <Container>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <InputWrapper>
                    <TextField inputRef={titleRef} helperText="비행검사명" size='small' disabled={!edit || submitted}></TextField>
                    <TextField inputRef={typeRef} sx={{ width: 128 }} helperText="검사유형" size='small' disabled={!edit || submitted}></TextField>
                    <MuiFileInput label="항적 파일" value={routeFile} onChange={handleFileChange} disabled={!edit || submitted} size='small' helperText='항적 파일' sx={{ width: 256 }} inputRef={routeRef} hideSizeText getInputText={(value: any) => { return value?.size && value.name ? value.name : titleData?.testRoute ? '경로 입력됨' : '' }} />
                    {/* <MuiFileInput value={resultFile} onChange={resultFileChange} size='small' placeholder='결과지 파일' sx={{ width: 256 }} inputRef={resultRef} hideSizeText multiple  /> */}
                    {/* <CustomFileInput id={1}/> */}
                    <DatePicker format="YYYY-MM-DD" inputRef={dateRef} slotProps={{ textField: { size: 'small', helperText: '검사일자' } }} value={titleData?.testDate ? dayjs(titleData.testDate) : null} sx={{ width: 156 }} disabled={!edit || submitted} />
                    {edit && <Tooltip title={<p>반드시 지정 형식으로 스캔한 이미지를 넣어주세요.<br />입력된 데이터는 꼭 검수 후 저장해주세요.</p>}><Button sx={{ height: 40 }} onClick={handleOCRClick} startIcon={<PsychologyIcon fontSize={'large'} />}>OCR</Button></Tooltip>}
                    <MuiFileInput value={ocrFile} multiple onChange={HandleOCRFileChange} sx={{ display: 'none' }} inputRef={ocrRef} />
                    {edit &&
                        <>
                            <Button onClick={handleSubmit} disabled={!edit || submitted} sx={{ height: 40 }}>확인</Button>
                            <Button onClick={handleCancel} color="error" disabled={!edit || !submitted} sx={{ height: 40 }}>취소</Button>
                        </>
                    }
                </InputWrapper>
            </LocalizationProvider>
            <Divider />
        </Container>
    )
}

export default CustomHeader