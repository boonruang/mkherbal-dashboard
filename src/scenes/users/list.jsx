import React, { forwardRef, useEffect, useState } from 'react'
import { 
  Box, 
  useTheme,
  Button,
  Snackbar,
} from '@mui/material'
import useDebounce from 'hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { getUsers } from 'actions/user.action';
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid"
import Avatar from '@mui/material/Avatar'; 
import AddIcon from '@mui/icons-material/Add';
import { alpha, styled } from '@mui/material/styles';
import { useDemoData } from '@mui/x-data-grid-generator';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom'
import { getRoles } from '../../actions/role.action'

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const UsersList = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBarOpen(false)
  }
  const MuiSnackbar = ({message,duration}) => {

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleSnackbarClose}>
          ปิด
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleSnackbarClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );    

    return (
      <React.Fragment>
      <Snackbar message={message}
        autoHideDuration={duration}
        open={snackBarOpen}
        onClose={handleSnackbarClose}
        severity="success"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        action={action}
      /> 
      </React.Fragment> 
    )
  }

  const onButtonClick = () => {
    setSnackBarOpen(true)
  };

  const handleButtonClick = () => {
    navigate('/users/add')
  };


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
    console.log('getUsers is running in useEffect')
  },[dispatch])

  useEffect(() => {
    dispatch(getRoles())
    console.log('getRole useEffect is called')
  },[dispatch])

  // const { isSidebar} = useSelector((state) => state.app.appReducer)

  const { result, isError, isFetching } = useSelector((state) => state.app.userReducer)

  // useEffect(() => {
  //   if (selectedResult) {
  //     setOpen(true)
  //   }
  // },[selectedResult])

  const columns = [
    { field: 'id', headerName: 'ลำดับ',headerAlign: "center",align: "center"},
    { field: 'username', headerName: 'username', width: 250 },
    { field: 'firstname', headerName: 'firstname', width: 250 },
    { field: 'lastname', headerName: 'lastname', width: 250 },
    { field: 'status', headerName: 'status', width: 250 },
    { field: 'roleArr', headerName: 'roles', width: 250 },
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => {
      return (
        <Box>
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="outlined"
            color="error"
          >
            ลบ
          </Button>
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="outlined"
            color="success"
            sx={{ ml: 1 }}            
          >
            แก้ไข
          </Button>          
        </Box>
      );
    } } 
]

  return (
    <Box m="20px" >
      <Header title="ข้อมูลผู้ใช้" subtitle="ตารางข้อมูลผู้ใช้"/>
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
                    // backgroundColor: colors.gray,
                    backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-virtualScroller": {
                    // backgroundColor: colors.gray,
                    // backgroundColor: colors.primary[400]
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    // backgroundColor: colors.gray,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`
                }
            }}>
                <Box display="flex" justifyContent="end">
                    <Button  onClick={handleButtonClick}
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
                    <MuiSnackbar message="ยังไม่เปิดการเพิ่มข้อมูลตอนนี้" duration={4000} />
                </Box>
                {
                  result &&
                <DataGrid
                rows={result}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                />                         
                }

            </Box>
    </Box>
  )
}

export default UsersList