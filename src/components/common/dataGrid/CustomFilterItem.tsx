import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { GridColumnMenuItemProps, useGridApiContext } from "@mui/x-data-grid";
import IconFilter from '@mui/icons-material/FilterAlt';
import React from "react";


function CustomFilterItem(props: GridColumnMenuItemProps) {
    const { onClick, colDef } = props;
    const apiRef = useGridApiContext();
    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            apiRef.current.showFilterPanel(colDef.field);
            onClick(event);
        },
        [apiRef, colDef.field, onClick],
    );
    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon>
                <IconFilter fontSize="small" />
            </ListItemIcon>
            <ListItemText>필터</ListItemText>
        </MenuItem>
    );
}
  

export default CustomFilterItem;