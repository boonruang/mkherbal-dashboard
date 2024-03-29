import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"

import Header from "../../components/Header"
import { mockDataHerbals } from "../../data/mockDataHerbals"

const Herbals = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
            field: 'thainame',
            headerName: 'ชื่อไทย',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'engname',
            headerName: 'ชื่ออังกฤษ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'sciname',
            headerName: 'ชื่อวิทยาศาสตร์',
            flex: 1,
            cellClassName: "name-column--cell"
        },        
        {
            field: 'type',
            headerName: 'ประเภท',
            flex: 1,
            cellClassName: "name-column--cell"
        },

    ]

    return (
        <Box m="20px">
            <Header title="รายการผักสมุนไพร" subtitle="รายการข้อมูลผักสมุนไพร" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    boderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <DataGrid
                    rows={mockDataHerbals}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default Herbals