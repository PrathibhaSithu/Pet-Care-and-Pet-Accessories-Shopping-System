import React from 'react'

import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import './customDataGrid.scss'

const customTheme = createTheme({
    palette: {
      primary: {
        main: "#9980FA"
      }
    }
});

function CustomDataGrid({data, columns, searchBar, report}) {

  const getRowId = (row) => {
    return row._id; // Return a unique identifier for each row
  }

  return (
    <ThemeProvider theme={customTheme}>
        <DataGrid
            className="customDataGrid"
            rows={data}
            columns={columns}
            getRowId={getRowId}
            pageSize={10}
            checkboxSelection
            components={{
                Toolbar: (props) => (
                    <CustomToolbar {...props} searchBar={searchBar} report={report} />)
            }}
            getRowClassName={() => "grid-cell"}
        />
    </ThemeProvider>
  )
}

export default CustomDataGrid

