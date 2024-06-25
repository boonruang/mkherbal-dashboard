import React, { useState } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField
  } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';

const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
}

const userSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    role: yup.string().required("required"),
})

const Users = () => {

    
      const theme = useTheme()
      const colors = tokens(theme.palette.mode)      

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
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
    }

    return <Box m="20px">
        <Header title="เพิ่มผู้ใช้" subtitle="เพิ่มข้อมูลผู้ใช้ใหม่" />

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
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
                            type="text"
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
                            value={values.firstName}
                            name="firstName"
                            error={!!touched.firstName && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="นามสกุล"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={!!touched.lastName && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="กลุ่ม"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.role}
                            name="role"
                            error={!!touched.role && !!errors.role}
                            helperText={touched.role && errors.role}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                    </Box>
                    {/* <Box display="flex" justifyContent="end" mt="20px">
                        <Button
                            type='submit'
                            color='secondary'
                            variant='contained'
                        >
                            เพิ่มผู้ใช้
                        </Button>
                    </Box> */}
                    <Box display="flex" justifyContent="end">
                    <Button  onClick={() => setSnackBarOpen(true)}
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
                </form>
            )}
        </Formik>
    </Box >
}

export default Users