import {  GridToolbarContainer, GridToolbarExport  } from '@mui/x-data-grid'
import React from 'react'

function CustomToolbar() {
  return (
    <GridToolbarContainer>

      <GridToolbarExport csvOptions={{ fileName: 'test' }} printOptions={{ hideToolbar: true, hideFooter: true, }} />
    </GridToolbarContainer>
  )
}

export default CustomToolbar