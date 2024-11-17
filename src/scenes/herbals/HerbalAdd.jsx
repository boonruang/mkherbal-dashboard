import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
    Snackbar,
    TextField,
    Select,
    MenuItem,
    CardActionArea,
    Grid,
    Typography
  } from '@mui/material'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import Header from "../../components/Header"
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../actions/user.action'
import { useNavigate } from 'react-router-dom'

const initialValues = {
    herbalname: "",
    commonname: "",
    scientificname: "",
    othername: "",
}

const userSchema = yup.object().shape({
    herbalname: yup.string().required("required"),
    commonname: yup.string().required("required"),
    scientificname: yup.string().required("required"),
    // othername: yup.string().required("required"),
})

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Item = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}} style={{ marginBottom: "20px"}}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="220"
              image={imagesUrl+'ฟ้าทะลายโจร.jpg'}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
          </CardActionArea>
        </Card>
      </Grid>
    )
}

const HerbalAdd = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [roleSelected, setRoleSelected] = useState('1')

  const { result } = useSelector((state) => state.app.roleReducer)

  //  if (result) {
  //   console.log('role result',result)
  //  }

   const handleButtonAdd = (values) => {
    // setSnackBarOpen(true)
    console.log(values)
   }

   const handleCancelButtonClick = () => {
    navigate('/herbals/list')
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
        dispatch(addUser(navigate,values))
    }

    return <Box m="20px">
        <Header title="เพิ่มสมุนไพร" subtitle="เพิ่มสมุนไพรใหม่" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('username', values.herbalname)
              formData.append('password', values.commonname)
              formData.append('firstname', values.scientificname)
              formData.append('lastname', values.othername)
              dispatch(addUser(navigate, formData))
              setSubmitting(false)
            }}
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
                            label="ชื่อสมุนไพร"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.herbalname}
                            name="herbalname"
                            error={!!touched.herbalname && !!errors.herbalname}
                            helperText={touched.herbalname && errors.herbalname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="password"
                            label="ชื่อสามัญ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.commonname}
                            name="commonname"
                            error={!!touched.commonname && !!errors.commonname}
                            helperText={touched.commonname && errors.commonname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อวิทยาศาสตร์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.scientificname}
                            name="scientificname"
                            error={!!touched.scientificname && !!errors.scientificname}
                            helperText={touched.scientificname && errors.scientificname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ชื่อตามท้องถิ่น"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.othername}
                            name="othername"
                            error={!!touched.othername && !!errors.othername}
                            helperText={touched.othername && errors.othername}
                            sx={{ gridColumn: "span 2" }}
                        />   
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ค่า PH"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.ph}
                            name="ph"
                            error={!!touched.ph && !!errors.ph}
                            helperText={touched.ph && errors.ph}
                            sx={{ gridColumn: "span 2" }}
                        />     
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ดินในการปลูก"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.soil}
                            name="soil"
                            error={!!touched.soil && !!errors.soil}
                            helperText={touched.soil && errors.soil}
                            sx={{ gridColumn: "span 2" }}
                        />                       
                        {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รูปภาพ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.image}
                            name="image"
                            error={!!touched.image && !!errors.image}
                            helperText={touched.image && errors.image}
                            sx={{ gridColumn: "span 2" }}
                        />   */}
                      <Box display="flex" justifyContent="start"
                          sx={{
                            mt: "10px", 
                            gridColumn: "span 2"
                        }}                    
                      >
                        <Box mr="20px">                
                          <Item/>
                        </Box>                        
                        <Box>
                          <Button  
                              variant="contained"
                              component="label"
                            sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "10px",
                                mb: "10px",
                                '&:hover': {backgroundColor: colors.greenAccent[700]}
                            }}
                        >
                            เลือกรูป
                            <input
                              type="file"
                              hidden
                            />
                        </Button>    
                        </Box>
                      </Box>
                      {/* <Select
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
                          value={values.role}
                          onChange={handleChange}
                          name='role'
                          onBlur={handleBlur}
                          error={!!touched.role && !!errors.role}
                          helperText={touched.role && errors.role}                          
                        >
                         { result?.map(item => {
                          return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                         })}
                      </Select>                                                                 */}
                    </Box>
                    <Box display="flex" justifyContent="start"
                        sx={{
                          mt: "10px",
                      }}                    
                    >
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
                        บันทึก
                    </Button>
                    <Button  
                        onClick={handleCancelButtonClick}
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
                        ยกเลิก
                    </Button>                    
                    <MuiSnackbar message="ยังไม่เปิดการเพิ่มข้อมูลตอนนี้" duration={4000} />
                </Box>   
                </form>
            )}
        </Formik>
    </Box >
}

export default HerbalAdd