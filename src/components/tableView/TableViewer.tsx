import { FlightList, FlightResult } from 'common/type/FlightType'
import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import ViewerHeader from './ViewerHeader'
import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material'
import { headCells, Order, TableHeaderCellType } from './TableTypes'
import ViewerColumn from './ViewerCell'

const ViewerContainer = styled(TableContainer)`
    width:100%;
`

// 호환 테이블 정렬 기능
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// 내림차순 비교 함수
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  // a: { [key in Key]: number | string  },
  // b: { [key in Key]: number | string },
  a: any,
  b: any,
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface Props {
  data: FlightList | null;
}


function TableViewer({ data }: Props) {
  // const [tableData, setTableData] = useState(data ? data : null);
  const [defInfo, setDefInfo] = useState(data);
  const [dataRow, setDataRow] = useState(data?.data ? data.data : []);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof FlightResult>('id');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const mutateRowData = (id: number, col: string, value: any) => {

    const updatedData = dataRow.map(row => {
      if (row.id === id) {
        return { ...row, [col]: value };
      }
      return row;
    })

    setDataRow(updatedData);
  };

  const stateRefresh = () => {
    setDataRow([]);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof FlightResult,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && dataRow?.length) {
      const newSelected = dataRow?.map((n) => (n.id).toString());
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 && data?.data ? Math.max(0, (1 + page) * rowsPerPage - data?.data?.length) : 0;

  const visibleRows = useMemo(
    () => {
      return dataRow ? stableSort(dataRow, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ) : null
    },
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box>
      <ViewerContainer>
        <Table size={'small'}>
          <ViewerHeader numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={dataRow?.length ? dataRow.length : 0} headCells={headCells} />


          <TableBody>
            {visibleRows?.map((row, index) => {
              const isItemSelected = isSelected(row.id.toString());
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox"
                    onClick={(e) => handleClick(e, row.id.toString())}
                  >
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align='center'
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {(page) * rowsPerPage + index + 1}
                  </TableCell>
                  <ViewerColumn column='siteName' id={row.id} label="표지소" mutateRowData={mutateRowData}>{row.siteName}</ViewerColumn>
                  <ViewerColumn column='frequency' id={row.id} label="주파수" mutateRowData={mutateRowData}>{row.frequency}</ViewerColumn>
                  <ViewerColumn column='txmain' id={row.id} label="TX-M" mutateRowData={mutateRowData}>{row.txmain}</ViewerColumn>
                  <ViewerColumn column='rxmain' id={row.id} label="RX-M" mutateRowData={mutateRowData}>{row.rxmain}</ViewerColumn>
                  <ViewerColumn column='txstby' id={row.id} label="TX-S" mutateRowData={mutateRowData}>{row.txstby}</ViewerColumn>
                  <ViewerColumn column='rxstby' id={row.id} label="RX-S" mutateRowData={mutateRowData}>{row.rxstby}</ViewerColumn>
                  <ViewerColumn column='angle' id={row.id} label="각도" mutateRowData={mutateRowData}>{row.angle}</ViewerColumn>
                  <ViewerColumn column='distance' id={row.id} label="거리" mutateRowData={mutateRowData}>{row.distance}</ViewerColumn>
                  <ViewerColumn column='height' id={row.id} label="고도" mutateRowData={mutateRowData}>{row.height}</ViewerColumn>

                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </ViewerContainer>
      <TablePagination
        rowsPerPageOptions={[25, 100, 200]}
        component="div"
        count={dataRow ? dataRow.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default TableViewer