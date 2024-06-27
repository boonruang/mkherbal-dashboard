import { useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
// import { mockDataFarmers } from "../../data/mockDataFarmers"
import AddIcon from '@mui/icons-material/Add';
import { getFarmers } from '../../actions/farmer.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'

const Farmers = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFarmers())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.farmerReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    // if (result) {
    //     console.log('result',result)
    // }

    const handleClick = () => {
        //
    }

    const columns = [
        { field: 'id', headerName: 'ลำดับ', headerAlign: 'center', align: 'center'},
        // { field: 'username', headerName: 'Username' },
        {
            field: 'firstname',
            headerName: 'ชื่อ',
            flex: 1,
            cellClassName: "name-column--cell"
        },
        {
            field: 'lastname',
            headerName: 'นามสกุล',
            flex: 1,
            cellClassName: "name-column--cell"
        },              
        // {
        //     field: 'hno',
        //     headerName: 'บ้านเลขที่',
        //     type: "number",
        //     headerAlign: "left",
        //     align: "left",
        // },
        // {
        //     field: 'moo',
        //     headerName: 'หมู่',
        //     type: "number",
        //     headerAlign: "left",
        //     align: "left",
        // },        
        {
            field: 'tambon',
            headerName: 'ตำบล',
            flex: 1,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphoe',
            headerName: 'อำเภอ',
            flex: 1,
            cellClassName: "name-column--cell"
        },          
        {
            field: 'province',
            headerName: 'จังหวัด',
            flex: 1,
            cellClassName: "name-column--cell"
        },                  
        // {
        //     field: 'tel',
        //     headerName: 'เบอร์ติดต่อ',
        //     flex: 1,
        // },
        {
            field: 'cert',
            headerName: 'รหัสใบรับรอง',
            flex: 1,
        },
        {
            field: 'cert_date',
            headerName: 'วันได้รับ',
            flex: 1,
        },
        {
            field: 'cert_expire_date',
            headerName: 'วันหมดอายุ',
            flex: 1,
        },
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
              <Box>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>


            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={handleClick}
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }} 
                >
                  ลบ
                </Button> : undefined  } 

            { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Button
                  onClick={handleClick}
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
            <Header title="ข้อมูลเกษตรกร" subtitle="รายการข้อมูลเกษตรกร" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
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
                { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                ? <Box display="flex" justifyContent="end">
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
                </Box> : undefined }
                
                    { isFetching && <Box>Data is fetching</Box>}
                    { result ?
                    <DataGrid
                        rows={result}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        // sx={{
                        //     // background: colors.greenAccent[400],
                        //     // boxShadow: 2,
                        //     border: 1,
                        //     borderColor: colors.greenAccent[500],
                        //     // '& .MuiDataGrid-cell:hover': {
                        //     // color: colors.grey[5900],
                        //     // },
                        // }}
                    /> : undefined}
            </Box>
        </Box>
    )
}

export default Farmers