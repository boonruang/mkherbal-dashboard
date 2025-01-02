import { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
// import { mockDataPhilosophers } from "../../data/mockDataPhilosophers"
import AddIcon from '@mui/icons-material/Add';
import { getPhilosophers } from '../../actions/philosopher.action'

import Header from "../../components/Header"
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from '../../constants'
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx'
import IosShareIcon from '@mui/icons-material/IosShare';
import ConfirmBox from 'components/ConfirmBox'

const Philosophers = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [Id, setId] = useState(null)

    const message = 'กรุณายืนยันการลบข้อมูล'    

    useEffect(() => {
        dispatch(getPhilosophers())
    },[dispatch])


    const { result, isFetching } = useSelector((state) => state.app.philosopherReducer)

    const loginReducer = useSelector((state) => state.app.loginReducer)

    // if (result) {
    //     console.log('result',result)
    // }

    const handleClick = () => {
        //
    }

    const DeleteFunction = () => {
        // dispatch(deletePhilosopher(Id))
        setOpen(false)
    }

    const handleDeleteClick = ({state}) => {
        // console.log('state',state)
        // console.log('row.id',state.row.id)
        setId(state.row.id)
        setOpen(true)
        // dispatch(deleteFarmer(state.row.id))
    }

    const handleAddButton = () => {
        navigate('/philosophers/add')
      };

    const ExportExcelButton = () => {
    // console.log('Data to export: ',result)
    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(result)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "philosopher.xlsx")

    };
      
    
    const handleButtonDetail = (p) => {
        // console.log('params',params)
        console.log('params',p)
        // navigate('/farmers/detail')
    };

    const handleRowClick = (params,event,details) => {
        console.log('params',params)
        // console.log('event',event)
        // console.log('details',details)
    };


    const columns = [
        { 
            field: 'id',
            headerName: 'ลำดับ',
            headerAlign: 'center',
            align: 'center',
            flex: 0.4,
            cellClassName: "name-column--cell"
        },
        {
            field: 'firstname',
            headerName: 'ชื่อ',
            headerAlign: 'center',
            align: 'center',            
            flex: 0.6,
            cellClassName: "name-column--cell"
        },
        {
            field: 'lastname',
            headerName: 'นามสกุล',
            headerAlign: 'center',
            align: 'center',            
            flex: 0.6,
            cellClassName: "name-column--cell"
        },              
        {
            field: 'hno',
            headerName: 'เลขที่',
            headerAlign: 'center',
            align: 'center',
            flex: 0.4,
            cellClassName: "name-column--cell"
        },
        {
            field: 'moo',
            headerName: 'หมู่',
            headerAlign: 'center',
            align: 'center',
            flex: 0.4,
            cellClassName: "name-column--cell"
        },        
        {
            field: 'tambon',
            headerName: 'ตำบล',
            headerAlign: 'center',
            align: 'center',
            flex: 0.6,
            cellClassName: "name-column--cell"
        },  
        {
            field: 'amphoe',
            headerName: 'อำเภอ',
            headerAlign: 'center',
            align: 'center',
            flex: 0.6,
            cellClassName: "name-column--cell"
        },          
        {
            field: 'province',
            headerName: 'จังหวัด',
            headerAlign: 'center',
            align: 'center',
            flex: 0.6,
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
                onClick={() => handleDeleteClick({ state: { row: params.row }})}
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
            <Header title="ข้อมูลปราชญ์สมุนไพร" subtitle="รายการข้อมูลปราชญ์สมุนไพร" />
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
                <Box display="flex" justifyContent="end">
                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
                    ? <Box display="flex" justifyContent="end" onClick={handleAddButton}>
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
                                '&:hover': {backgroundColor: colors.greenAccent[800]}
                            }}
                        >
                            <AddIcon sx={{ mr: "10px" }} />
                            เพิ่มข้อมูล
                        </Button>
                    </Box> : undefined }

                    { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role)) && result
                    ? <Box display="flex" justifyContent="end" onClick={ExportExcelButton}>
                        <Button  
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                // backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.blueAccent[800]}
                            }}
                        >
                            <IosShareIcon sx={{ mr: "10px" }} />
                            ส่งออกไฟล์ Excel
                        </Button>
                    </Box> : undefined }                
                </Box>
                
                    { isFetching && <Box height="65vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}><CircularProgress /></Box>}
                    { result ?
                    <DataGrid
                        rows={result}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                            toolbar: {
                              csvOptions: { disableToolbarButton: true },
                              printOptions: {
                                disableToolbarButton: false,
                                hideFooter: true,
                                hideToolbar: true, // ซ่อน headers column, filters, exports ตอนพิมพ์
                                fields: [
                                    'id',
                                    'firstname',
                                    'lastname',
                                    'baan',
                                    'hno',                                    
                                    'moo',
                                    'tambon',
                                    'amphoe',
                                    'province',
                                    'postcode',
                                ],
                                fileName: 'farmers', // not work!
                                },
                            },
                          }}  
                    /> : undefined}
            </Box>
            <ConfirmBox
                open={open}
                closeDialog={() => setOpen(false)}
                deleteFunction={() => DeleteFunction()}
                message={message}
                title={Id}
            />            
        </Box>
    )
}

export default Philosophers