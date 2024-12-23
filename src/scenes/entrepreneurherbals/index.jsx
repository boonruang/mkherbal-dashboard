import { useEffect } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import AddIcon from '@mui/icons-material/Add';
import { getEntrepreneurherbals } from '../../actions/entrepreneurherbal.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Entrepreneurherbals = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getEntrepreneurherbals())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.entrepreneurherbalReducer)

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
            field: 'name',
            headerName: 'ชื่อ',
            flex: 1,
            cellClassName: "name-column--cell"
        },           
        // {
        //     field: 'hno',
        //     headerName: 'เลขที่',
        //     type: "number",
        //     headerAlign: "left",
        //     align: "left",
        // },
        {
            field: 'moo',
            headerName: 'หมู่',
            type: "number",
            headerAlign: "left",
            align: "left",
        },        
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
        {
            field: 'postcode',
            headerName: 'รหัสไปรษณีย์',
            flex: 1,
            cellClassName: "name-column--cell"
        },                  
        {
            field: 'brand',
            headerName: 'ตราผลิตภัณฑ์',
            flex: 1,
            cellClassName: "name-column--cell"
        },                  
        {
            field: 'product_type',
            headerName: 'ประเภทสินค้า',
            flex: 1,
            cellClassName: "name-column--cell"
        },                  
        // {
        //     field: 'tel',
        //     headerName: 'เบอร์ติดต่อ',
        //     flex: 1,
        // },
        { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1.5, renderCell: (params) => {
            return (
              <Box>
                <Button
                //   onClick={handleButtonDetail(params.row.id)}
                //   onClick={() => (navigate('/farmers/detail/'+params.row.id))}
                //   onClick={() => (navigate('/farmers/detail',  { state: { id: params.row.id }} ))}
                  onClick={() => (navigate('/farmers/detail',  { state: { row: params.row }} ))}
                  variant="outlined"
                  color="success"
                >
                  รายละเอียด
                </Button>
                {/* <Link to={"/farmers/detail/" + params.row.id}>
                            <button className="viewButton">View</button>
                </Link> */}

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
            <Header title="ข้อมูลผู้ประกอบการผลิตภัณฑ์สมุนไพร" subtitle="รายการข้อมูลผู้ประกอบการผลิตภัณฑ์สมุนไพร" />
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
                
                    { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                    { result ?
                    <DataGrid
                        rows={result}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        // onSelectionModelChange={(ids) => {
                        //     const selectedIDs = new Set(ids)
                        //     const selectedRowData = result.filter((row) => 
                        //         selectedIDs.has(row.id.toString())
                        //     )
                        //     console.log(selectedRowData)
                        // }}
                        // onRowClick={handleRowClick}
                    /> : undefined}
            </Box>
        </Box>
    )
}

export default Entrepreneurherbals