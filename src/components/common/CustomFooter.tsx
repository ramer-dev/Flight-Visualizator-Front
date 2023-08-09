import { Box, Button, tablePaginationClasses } from "@mui/material";
import { GridPagination, useGridApiContext } from "@mui/x-data-grid";
import { useMap } from "react-leaflet";
import Pagination from "./Pagination";

export function CustomFooter(props: any) {
    const apiRef = useGridApiContext();
    const map = useMap();

    return (
        <Box>
            {/* <Button variant='outlined' color='primary' onClick={()=> {console.log(apiRef.current.getSelectedRows().forEach((t) => {
                Destination(map, '36/127', t.angle, t.distance, false)
            }))}}>마킹</Button> */}

            <Button variant='outlined' color='error' onClick={()=> {console.log(apiRef.current.getSelectedRows().keys())}}>삭제</Button>
            <GridPagination sx={{
                [`& .${tablePaginationClasses.spacer}`]: {
                    display: 'none'
                },
                [`& .${tablePaginationClasses.toolbar}`]: {
                    justifyContent: 'center'
                },
                [`& .${tablePaginationClasses.toolbar}`] : {
                    flexDirection:'column-reverse'
                }
            }} ActionsComponent={Pagination} {...props} />
        </Box>
        )
}