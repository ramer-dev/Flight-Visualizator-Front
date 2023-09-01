import { Box, Button, tablePaginationClasses } from "@mui/material";
import { GridPagination, useGridApiContext } from "@mui/x-data-grid";
import { useMap } from "react-leaflet";
import Pagination from "./Pagination";

export function CustomFooter(props: any) {
    const apiRef = useGridApiContext();
    const map = useMap();

    return (
        <Box>
            <Button variant='outlined' color='error'>삭제</Button>
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