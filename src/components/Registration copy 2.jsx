import React, { useState, useEffect } from 'react'
import { 
    Box, 
    useTheme,
    Button,
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
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from 'theme';
import { useDispatch, useSelector } from 'react-redux'
import { addFarmer } from '../actions/farmer.action'
import { useNavigate } from 'react-router-dom'
import Header from "../components/Header"
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


const Registration = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()


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
    navigate('/thankyoureg')
   }

   const handleRoleSelection = (e) => {
    setRoleSelected(e.target.value)
   }

  

    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
        // dispatch(addUser(navigate,values))
    }

    return <Box m="20px">
        <Header title="เพิ่มสมุนไพร" subtitle="เพิ่มสมุนไพรใหม่" />

        <Formik
            // onSubmit={handleFormSubmit}
            onSubmit={async (values, { setSubmitting }) => {
              let formData = new FormData()
              formData.append('herbalname', values.herbalname)
              formData.append('commonname', values.commonname)
              formData.append('scientificname', values.scientificname)
              formData.append('othername', values.othername)
              formData.append('image', values.file.name)
              formData.append('ph', values.ph)
              formData.append('soil', values.soil)
              formData.append('disease', values.disease)
              formData.append('charactername', values.charactername)
              formData.append('propertyname', values.propertyname)
              formData.append('benefit', values.benefit)
              formData.append('referencename', values.referencename)
              console.log('values',values)
              dispatch(addFarmer(navigate, formData))
              setSubmitting(false)
            }}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
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
                            type="text"
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
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="โรคพืช"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.disease}
                            name="disease"
                            error={!!touched.disease && !!errors.disease}
                            helperText={touched.disease && errors.disease}
                            sx={{ gridColumn: "span 2" }}
                        />                                 
                        {/* ลักษณะ charactername                    */}     
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ลักษณะของสมุนไพร"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.charactername}
                            name="charactername"
                            multiline="true"
                            minRows="2"
                            error={!!touched.charactername && !!errors.charactername}
                            helperText={touched.charactername && errors.charactername}
                            sx={{ gridColumn: "span 2" }}
                        />                               
                        {/* <Select
                            labelId="label-select-charactername"
                            id="select-charactername"
                            // value={roleSelected}
                            // onChange={handleRoleSelection}
                            value={values.charactername}
                            onChange={handleChange}
                            name='charactername'
                            onBlur={handleBlur}
                            error={!!touched.charactername && !!errors.charactername}
                            helperText={touched.charactername && errors.charactername}    
                            sx={{ gridColumn: "span 2" }}                      
                          >
                            <MenuItem value={true}>ต้นชะมวง จัดเป็นไม้ยืนต้นขนาดเล็กถึงขนาดกลางไม่ผลัดใบ เรือนยอดเป็นทรงพุ่มรูปกรวยคว่ำทรงสูง มีความสูงของต้นประมาณ 5-10 เมตร...</MenuItem>
                            <MenuItem value={false}>ใบชะมวง ใบเป็นใบเดี่ยว ออกเรียงสลับตรงข้ามกัน ลักษณะของใบเป็นรูปรีแกมใบหอกหรือแกมขอบขนาน โคนใบสอบแหลม ปลายใบป้านหรือแหลมเล็กน้อย...</MenuItem>
                        </Select>      */}
                        {/* สรรพคุณ propertyname                    */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="สรรพคุณ"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.propertyname}
                            name="propertyname"
                            multiline="true"
                            minRows="2"                            
                            error={!!touched.propertyname && !!errors.propertyname}
                            helperText={touched.propertyname && errors.propertyname}
                            sx={{ gridColumn: "span 2" }}
                        />                         

                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ประโยชน์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.benefit}
                            name="benefit"
                            multiline="true"
                            minRows="2"                            
                            error={!!touched.benefit && !!errors.benefit}
                            helperText={touched.benefit && errors.benefit}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การอ้างอิง"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.referencename}
                            name="referencename"
                            multiline="true"
                            minRows="2"                            
                            error={!!touched.referencename && !!errors.referencename}
                            helperText={touched.referencename && errors.referencename}
                            sx={{ gridColumn: "span 2" }}
                        />                         

                    </Box>
                    <Box 
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}                    
                    >
                      

                      <Box display="flex" justifyContent="start"
                        sx={{
                          gridColumn: "span 2"
                      }}                    
                    >
                        <Button  
                            type='submit'
                            disabled={isSubmitting}
                            sx={{
                                backgroundColor: colors.greenAccent[600],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                mr: "20px",
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
                        </Box>    
                  </Box>   
                </form>
            )}
        </Formik>
    </Box >
}

export default Registration