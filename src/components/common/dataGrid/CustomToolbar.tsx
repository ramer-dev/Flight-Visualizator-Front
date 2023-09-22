import { Button, Tooltip } from '@mui/material';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid'
import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Delete'
import GPSIcon from '@mui/icons-material/Room'
import React from 'react'
import PrintIcon from '@mui/icons-material/Print';
import PrintDisabledIcon from '@mui/icons-material/PrintDisabled';
import AddchartIcon from '@mui/icons-material/Addchart';
import CustomHeader from './CustomHeader';
import { FlightList, RowFlightResultType } from 'common/type/FlightType';

interface Props {
  titleData: FlightList;
  title: string;
  count: number;
  edit?: boolean;
  search?: boolean;
  submitted: boolean;
  rows: RowFlightResultType[]; 
  loading: boolean;
  setLoading: (b: boolean) => void;
  setRows: (rows: RowFlightResultType[]) => void;
  setSubmitted: (item: boolean) => void;
  setTitleData: (item: FlightList) => void;
  handleAddRow: (e: React.MouseEvent) => void;
  handleDeleteRow: (e: React.MouseEvent) => void;
  handleSubmit: (e: React.MouseEvent) => void;
  handleMarkingBtnClick: (e: React.MouseEvent) => void;
}


const printOptions = { hideToolbar: true, hideFooter: true }

function CustomToolbar({ titleData, count, search, edit, submitted, rows, setRows, setTitleData, handleAddRow, handleDeleteRow, setSubmitted, handleMarkingBtnClick, setLoading }: Props) {
  const apiRef = useGridApiContext()
  const disabled = !apiRef.current.getRowsCount();
  const selected = apiRef.current.getSelectedRows()


  const csvOptions = React.useRef({
    fileName: ''
  })

  React.useEffect(() => {
    if (titleData) csvOptions.current.fileName = titleData.testName
  }, [titleData])

  return (
    <>
      <GridToolbarContainer>
        {!search ? <CustomHeader rows={rows} setRows={setRows} titleData={titleData} setTitleData={setTitleData} submitted={submitted} setSubmitted={setSubmitted} edit={edit} setLoading={setLoading} /> : null}

        {edit ?
          <>
            <Button variant='outlined' onClick={handleAddRow} startIcon={<PlusIcon />}>행추가</Button>
            <Button variant='outlined' onClick={handleDeleteRow} disabled={!selected.size} color={'error'} startIcon={<MinusIcon />}>행삭제</Button>
          </>
          : null
        }
        <Button variant='outlined' onClick={handleMarkingBtnClick} disabled={!selected.size} startIcon={<GPSIcon />}>마킹</Button>
        <Button variant='outlined' onClick={() => { apiRef.current.exportDataAsCsv(csvOptions.current) }} disabled={disabled} startIcon={<AddchartIcon />}>CSV 저장</Button>
        <Tooltip title={disabled || count > 100 ?
          <div>전체 행의 갯수가 100개가 넘는 경우에는 인쇄가 제한됩니다.
            <br /> 필터를 사용해 개수를 줄여 인쇄할 수 있습니다.
          </div> : null}>
          <span>
            <Button variant='outlined' onClick={() => { apiRef.current.exportDataAsPrint(printOptions) }} disabled={disabled || count > 100} startIcon={disabled || count > 100 ? <PrintDisabledIcon /> : <PrintIcon />}>인쇄</Button>
          </span>
        </Tooltip>
      </GridToolbarContainer>
    </>
  )
}

export default CustomToolbar