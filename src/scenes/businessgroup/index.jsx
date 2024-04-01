import { Box, useTheme } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"

import Header from "../../components/Header"
import { mockDataBusiness } from "../../data/mockDataBusiness"

const BusinessGroup = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
            field: 'aeng',
            headerName: 'บริษัท',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { field: 'tthai', headerName: 'ตำบล', flex: 1, cellClassName: "name-column--cell" },
        {
            field: 'athai',
            headerName: 'อำเภอ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'pthai',
            headerName: 'จังหวัด',
            flex: 1,
            cellClassName: "name-column--cell"
        },              
        {
            field: 'lat',
            headerName: 'Latitude',
            flex: 1,
        },
        {
            field: 'long',
            headerName: 'Longitude',
            flex: 1,
        },
    ]

    return (
        <Box m="20px">
            <Header title="ข้อมูลกลุ่มบริษัทและธุรกิจ" subtitle="รายการข้อมูลกลุ่มบริษัทและธุรกิจ" />
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
                    rows={mockDataBusiness}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}

export default BusinessGroup