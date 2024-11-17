import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField,
    Select,
    MenuItem
  } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { editUser } from '../../actions/user.action'
import { useNavigate,useParams } from 'react-router-dom'
import { getUser } from 'actions/userSelected.action';

let initialValues = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    status: true,
    roles: [],
}

const userSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    status: yup.boolean().required("required"),
    roles: yup.string().required("required"),
})

const UsersEdit = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [roleSelected, setRoleSelected] = useState('1')

  const { result } = useSelector((state) => state.app.roleReducer)
  const userSelected = useSelector((state) => state.app.userSelectedReducer)

  //  if (result) {
  //   console.log('role result',result)
  //  }

    // const [searchParams] = useSearchParams();
    // console.log(searchParams.get('sort')); 
    // console.log('searchParams: ',searchParams); 

    const {id} = useParams();
    console.log('param id: ',id); 

    if (userSelected) {
      console.log('userSelected resulted',userSelected.result)
      initialValues = userSelected.result
    }

    useEffect(() => {
      dispatch(getUser(id))
      console.log('getUser is running in useEffect')
    },[dispatch,id])

   const handleButtonAdd = (values) => {
    // setSnackBarOpen(true)
    console.log(values)
   }

   const handleRoleSelection = (e) => {
    setRoleSelected(e.target.value)
   }

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
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
        dispatch(editUser(navigate,values))
    }

    return <Box m="20px">
        <Header title="เพิ่มผู้ใช้" subtitle="เพิ่มข้อมูลผู้ใช้ใหม่" />

        <Formik
            // onSubmit={handleFormSubmit}
            // enableReinitialize={false}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('username', values.username)
              formData.append('password', values.password)
              formData.append('firstname', values.firstname)
              formData.append('lastname', values.lastname)
              formData.append('status', values.status)
              formData.append('roles', values.roles)
              dispatch(editUser(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={userSelected?.result ? userSelected?.result: {}}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="username"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={!!touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstname}
                            name="firstname"
                            error={!!touched.firstname && !!errors.firstname}
                            helperText={touched.firstname && errors.firstname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="นามสกุล"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastname}
                            name="lastname"
                            error={!!touched.lastname && !!errors.lastname}
                            helperText={touched.lastname && errors.lastname}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                      <Select
                          labelId="label-select-status"
                          id="select-status"
                          // value={roleSelected}
                          // onChange={handleRoleSelection}
                          value={values.status}
                          onChange={handleChange}
                          name='status'
                          onBlur={handleBlur}
                          error={!!touched.status && !!errors.status}
                          helperText={touched.status && errors.status}                          
                        >
                          <MenuItem value={true}>Active</MenuItem>
                          <MenuItem value={false}>Inactive</MenuItem>
                      </Select>   
                      <Select
                          labelId="label-select-role"
                          id="select-role"
                          value={values.roles}
                          onChange={handleChange}
                          name='roles'
                          onBlur={handleBlur}
                          error={!!touched.roles && !!errors.roles}
                          helperText={touched.roles && errors.roles}                          
                        >
                         { result?.map(item => {
                          return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                         })}
                      </Select>                                                                
                    </Box>
                    <Box display="flex" justifyContent="end">
                    <Button  
                        type='submit'
                        sx={{
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
                        บันทึกข้อมูล
                    </Button>
                    <MuiSnackbar message="ยังไม่เปิดการเพิ่มข้อมูลตอนนี้" duration={4000} />

                </Box>                    
                </form>
            )}
        </Formik>
    </Box >
}

export default UsersEdit