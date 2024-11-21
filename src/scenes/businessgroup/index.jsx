import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import { mockDataBusiness } from "../../data/mockDataBusiness"
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'

const BusinessGroup = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const loginReducer = useSelector((state) => state.app.loginReducer)    

    const columns = [
        { field: 'id', headerName: 'ลำดับ',  headerAlign: 'center', align: 'center'},
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
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
                <Box>
                <Button
                  onClick={{}}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={{}}
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }} 
                >
                  ลบ
                </Button> : undefined  } 

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={{}}
                  variant="outlined"
                  color="warning"
                  sx={{ ml: 1 }}            
                >
                  แก้ไข
                </Button> : undefined  }                       
              </Box>
            );
          } }         
    ]

    return (
        <Box m="20px">
            <Header title="ข้อมูลกลุ่มบริษัทและธุรกิจ" subtitle="รายการข้อมูลกลุ่มบริษัทและธุรกิจ" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    // border: "none"
                    border: 1,
                    borderColor: colors.greenAccent[500]                    
                },
                "& .MuiDataGrid-cell": {
                    boderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300]
                },
                "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-virtualScroller": {
                    // backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    // backgroundColor: colors.yellowAccent[700],
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <Box display="flex" justifyContent="end">
                    <Button  
                        sx={{
                            // backgroundColor: colors.blueAccent[600],
                            backgroundColor: colors.greenAccent[600],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            mr: "10px",
                            mb: "10px",
                            '&:hover': {backgroundColor: colors.blueAccent[700]}
                        }}
                    >
                        <AddIcon sx={{ mr: "10px" }} />
                        เพิ่มข้อมูล
                    </Button>
                </Box>                
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