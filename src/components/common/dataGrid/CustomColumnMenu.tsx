import { GridColumnMenu, GridColumnMenuProps } from '@mui/x-data-grid'
import React from 'react'
import CustomFilterItem from './CustomFilterItem'
import CustomSortItem from './CustomSortItem'

function CustomColumnMenu(props: GridColumnMenuProps) {
  return (
    <GridColumnMenu
        {...props}
        slots={{
            columnMenuColumnsItem: null,
            columnMenuFilterItem: CustomFilterItem,
            columnMenuSortItem: CustomSortItem,
        }}
    />
  )
}

export default CustomColumnMenu