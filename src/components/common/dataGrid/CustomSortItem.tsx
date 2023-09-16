import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { GridColumnMenuItemProps, useGridApiContext } from "@mui/x-data-grid";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React from "react";


function CustomSortItem(props: GridColumnMenuItemProps) {
    const { onClick, colDef } = props;
    const apiRef = useGridApiContext();

    const handleClickSortASC = (e : React.MouseEvent<HTMLElement>) => {
        apiRef.current.sortColumn(colDef, 'asc')
        onClick(e);
    }

    const handleClickSortDESC = (e : React.MouseEvent<HTMLElement>) => {
        apiRef.current.sortColumn(colDef, 'desc')
        onClick(e);
    }
    return (
        <>
            <MenuItem onClick={handleClickSortASC}>
                <ListItemIcon>
                    <ArrowUpwardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>오름차순 정렬</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClickSortDESC}>
                <ListItemIcon>
                    <ArrowDownwardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>내림차순 정렬</ListItemText>
            </MenuItem>
        </>
    );
}


export default CustomSortItem;