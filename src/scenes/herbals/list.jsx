import React, { forwardRef, useEffect, useState } from 'react'
import { 
  Box, 
  useTheme,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import useDebounce from 'hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { deleteHerbal, getHerbals,setStateHerbalSelectedToFetching } from 'actions/herbal.action';
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid"
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar'; 
import AddIcon from '@mui/icons-material/Add';
import { alpha, styled } from '@mui/material/styles';
import { useDemoData } from '@mui/x-data-grid-generator';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ROLES } from 'constants';
import { Link, useNavigate } from 'react-router-dom'

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const HerbalsList = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  
  const navigate = useNavigate()

  // const [searchValue, setSearchValue] = useState('')
  // const debouncedSearchValue = useDebounce(searchValue, 1000)

  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  //   dispatch(setStateHerbalSelectedToFetching())
  // };

//  const SnackBarAlert = forwardRef(
//   function SnackbarAlert(props, ref) {
//     return <Alert ref={ref} {...props} elevation={6} />
//   }
//  )


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

      // <Snackbar open={snackBarOpen} autoHideDuration={duration} anchorOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right'
      // }}>
      //     <SnackBarAlert onClose={handleSnackbarClose} severity="info">
      //        {message}
      //     </SnackBarAlert>
      // </Snackbar>
    )
  }

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: colors.primary[400],
    '&:hover': {
      backgroundColor: alpha(colors.primary[400], ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: colors.greenAccent[900],
      '&:hover': {
        backgroundColor: colors.blueAccent[900],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: colors.grey[900],
        },
      },
    },
  }, 
  [`& .${gridClasses.row}.odd`]: {
    // backgroundColor: colors.grey[700],
    '&:hover': {
      backgroundColor: alpha(colors.grey[700], ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: colors.greenAccent[900],
      '&:hover': {
        backgroundColor: colors.blueAccent[900],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: colors.grey[900],
        },
      },
    },
  }, 
}));

  const onDetailButtonClick = (e,r) => {
    setSnackBarOpen(true)
    console.log('record id',r.id)
    console.log('row data',r)
    navigate(`/herbals/detail/${r.id}`)
  };

  const onDeleteButtonClick = (e,r) => {
    setSnackBarOpen(true)
    console.log('record id',r.id)
    console.log('row data',r)
    dispatch(deleteHerbal(r.id))
  };

  const onEditButtonClick = (e,r) => {
    setSnackBarOpen(true)
    console.log('record id',r.id)
    console.log('row data',r)
    navigate(`/herbals/edit/${r.id}`)
  };


  const dispatch = useDispatch();

  // const { isSidebar} = useSelector((state) => state.app.appReducer)

  const { result, isError, isFetching } = useSelector((state) => state.app.herbalReducer)
  const loginReducer = useSelector((state) => state.app.loginReducer)

  
  useEffect(() => {
    dispatch(getHerbals())
    console.log('getHerbals is running in useEffect')
  },[dispatch])



  // useEffect(() => {
  //   if (selectedResult) {
  //     setOpen(true)
  //   }
  // },[selectedResult])

  const columns = [
    { field: 'id', headerName: 'ลำดับ',
      headerAlign: "center",
      align: "center",      
    },
    {
      field: 'image',
      headerName: 'รูป',
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => (
        <Avatar alt="Image" variant="square" src={imagesUrl+params.value} sx={{ height: 40 }} />
      ),
  },    
    { field: 'herbalname', headerName: 'ชื่อสมุนไพร', width: 150 },
    {
        field: 'commonname',
        headerName: 'ชื่อสามัญ',
        // flex: 1,
        width: 150,
        cellClassName: "name-column--cell"
    },
    {
        field: 'scientificname',
        headerName: 'ชื่อวิทยาศาสตร์',
        flex: 1,
        width: 300,
        cellClassName: "name-column--cell"
    },              
    {
        field: 'othername',
        headerName: 'ชื้อทั่วไป',
        type: "number",
        flex: 1,
        headerAlign: "left",
        align: "left",
    },        
    { field: 'actions', headerName: 'ดำเนินการ', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => {
      return (
        <Box>
          <Button
            onClick={(e) => onDetailButtonClick(e, params.row)}
            variant="outlined"
            color="success"
            sx={{ ml: 1 }} 
          >
            รายละเอียด
          </Button>

          { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
          ? <Button
            onClick={(e) => onDeleteButtonClick(e, params.row)}
            variant="outlined"
            color="error"
            sx={{ ml: 1 }} 
          >
            ลบ
            </Button> : undefined }

          { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
          ? <Button
            onClick={(e) => onEditButtonClick(e, params.row)}
            variant="outlined"
            color="info"
            sx={{ ml: 1 }}            
          >
            แก้ไข
            </Button> : undefined }          
        </Box>
      );
    } } 
]

// const { data, loading } = useDemoData({
//   dataSet: 'Employee',
//   rowLength: 200,
// });  

// if (data) {
//   console.log('data',data)
// }

// const myData = {
//   columns,
//   rows: result
// }

  return (
    <Box m="20px" >
      <Header title="ข้อมูลสมุนไพร" subtitle="ตารางข้อมูลสมุนไพร"/>
      {result ? <Box m="40px 0 0 0" height="75vh" sx={{
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
             { loginReducer?.result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
               ? <Box display="flex" justifyContent="end">
                    {/* <Button  onClick={() => setSnackBarOpen(true)} */}
                    <Button  onClick={() => navigate('/herbals/add')}
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
                </Box> : undefined }
                {
                  result &&
              //   <StripedDataGrid
              //   loading={isFetching}
              //   {...myData}
              //   getRowClassName={(params) =>
              //     params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
              //   }
              // /> 
                <DataGrid
                rows={result}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                />                         
                }

            </Box>
          : 
          <Box height="60vh" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center'}}>
            <CircularProgress />
          </Box>
        }
    </Box>
  )
}

export default HerbalsList