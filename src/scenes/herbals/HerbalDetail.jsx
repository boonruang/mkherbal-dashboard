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
import { addHerbal } from '../../actions/herbal.action'
import { useNavigate,useParams } from 'react-router-dom'
import { getHerbalSelectedById } from 'actions/herbalselected.action'

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
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}}>
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

const HerbalDetail = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)     
      
  const dispatch = useDispatch()    

  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [roleSelected, setRoleSelected] = useState('1')

  const { result } = useSelector((state) => state.app.roleReducer)

 
  const {id} = useParams();
  console.log('param id: ',id); 

  useEffect(() => {
    dispatch(getHerbalSelectedById(id))
    console.log('getHerbalSelectedById is running in useEffect')
  },[dispatch,id])
  
  const herbalselected = useSelector((state) => state.app.herbalselectedReducer)

  if (herbalselected?.selectedResult) {
    console.log('herbalselected resulted',herbalselected?.selectedResult)
    // initialValues = herbalselected?.selectedResult
  }


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
              // formData.append('image', values.file.name)
              formData.append('ph', values.ph)
              formData.append('soil', values.soil)
              formData.append('disease', values.disease)
              formData.append('charactername', values.charactername)
              formData.append('propertyname', values.propertyname)
              formData.append('benefit', values.benefit)
              formData.append('referencename', values.referencename)
              dispatch(addHerbal(navigate, formData))
              setSubmitting(false)
            }}
            // initialValues={initialValues}
            initialValues={herbalselected?.selectedResult ? herbalselected?.selectedResult: {}}
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
                            value={values?.herbalname}
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
                            value={values?.commonname}
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
                            value={values?.scientificname}
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
                            value={values?.othername}
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
                            value={values?.ph}
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
                            value={values?.soil}
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
                            value={values?.disease}
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
                            value={values?.charactername}
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
                            value={values?.propertyname}
                            name="propertyname"
                            multiline="true"
                            minRows="2"                            
                            error={!!touched.propertyname && !!errors.propertyname}
                            helperText={touched.propertyname && errors.propertyname}
                            sx={{ gridColumn: "span 2" }}
                        />                         
                        {/* <Select
                            labelId="label-select-propertyname"
                            id="select-propertyname"
                            // value={roleSelected}
                            // onChange={handleRoleSelection}
                            value={values.propertyname}
                            onChange={handleChange}
                            name='propertyname'
                            onBlur={handleBlur}
                            error={!!touched.propertyname && !!errors.propertyname}
                            helperText={touched.propertyname && errors.propertyname}    
                            sx={{ gridColumn: "span 2" }}                      
                          >
                            <MenuItem value={true}>ยาพื้นบ้านอีสานใช้ ทั้งต้น มีรสจืด ต้มน้ำดื่ม ขับปัสสาวะ</MenuItem>
                            <MenuItem value={false}>ช่วยฟอกโลหิต (ผลอ่อน, ใบ) แก้โลหิต (ใบ)</MenuItem>
                        </Select>                                                 */}
                        {/* ประโยชน์ (สรรพคุณ)จากส่วนประกอบต่างๆ benefit                    */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="ประโยชน์"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.benefit}
                            name="benefit"
                            multiline="true"
                            minRows="2"                            
                            error={!!touched.benefit && !!errors.benefit}
                            helperText={touched.benefit && errors.benefit}
                            sx={{ gridColumn: "span 2" }}
                        />                        
                        {/* <Select
                            labelId="label-select-benefit"
                            id="select-benefit"
                            // value={roleSelected}
                            // onChange={handleRoleSelection}
                            value={values.benefit}
                            onChange={handleChange}
                            name='benefit'
                            onBlur={handleBlur}
                            error={!!touched.benefit && !!errors.benefit}
                            helperText={touched.benefit && errors.benefit}    
                            sx={{ gridColumn: "span 2" }}                      
                          >
                            <MenuItem value={true}>ผลชะมวงสุกสีเหลืองใช้รับประทานเป็นผลไม้ได้ โดยจะมีรสเปรี้ยวอมหวานหรือจะนำผลมาหั่นเป็นแว่นตากแดดใส่ปลาร้าเพื่อเพิ่มรสชาติก็ได้...</MenuItem>
                            <MenuItem value={false}>ยอดอ่อนหรือใบอ่อนใช้รับประทานเป็นผักจิ้มน้ำพริก รับประทานเป็นผักสดร่วมกับน้ำพริก ป่นแจ่ว หรือนำไปใช้ปรุงอาหาร...</MenuItem>
                        </Select>   */}
                        {/* หนังสืออ้างอิง หรือแหล่งอ้างอิง referencename                    */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="การอ้างอิง"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.referencename}
                            name="referencename"
                            multiline="true"
                            minRows="2"                            
                            error={!!touched.referencename && !!errors.referencename}
                            helperText={touched.referencename && errors.referencename}
                            sx={{ gridColumn: "span 2" }}
                        />                         
                        {/* <Select
                            labelId="label-select-referencename"
                            id="select-referencename"
                            // value={roleSelected}
                            // onChange={handleRoleSelection}
                            value={values.referencename}
                            onChange={handleChange}
                            name='referencename'
                            onBlur={handleBlur}
                            error={!!touched.referencename && !!errors.referencename}
                            helperText={touched.referencename && errors.referencename}    
                            sx={{ gridColumn: "span 2" }}                      
                          >
                            <MenuItem value={1}>หนังสือสมุนไพรไทย เล่ม 1. “ชะมวง (Cha Muang)”</MenuItem>
                            <MenuItem value={2}>การสำรวจความหลากหลายของพืชสมุนไพร จากตลาดพื้นเมืองทางภาคตะวันตกของประเทศไทย มหาวิทยาลัยเกษตรศาสตร์</MenuItem>
                            <MenuItem value={3}>โครงการเผยแพร่ข้อมูลทรัพยากรชีวภาพและภูมิปัญญาท้องถิ่นบนพื้นที่สูง สถาบันวิจัยและพัฒนาที่สูง (องค์การมหาชน)</MenuItem>
                        </Select>                                                                       */}

                     {/*  <Select
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
                      </Select> */}

                      {/* image on text field */}
                      {/* <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="รูป"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.image}
                            name="image"
                            error={!!touched.image && !!errors.image}
                            helperText={touched.image && errors.image}
                            sx={{ gridColumn: "span 2" }}
                        />                        */}
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
                            mt: "20px", 
                            gridColumn: "span 4"
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
                              onChange={(e) => {
                                e.preventDefault();
                                setFieldValue('file', e.target.files[0]); // for upload image
                                setFieldValue(
                                  'file_obj',
                                  URL.createObjectURL(e.target.files[0])
                                ); // for preview image
                              }}
                              type='file'
                              name='image'
                              multiple
                              accept='image/*'                           
                              hidden
                              />                              
                          </Button>    
                          </Box>
                      </Box> 
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
                        {/* <MuiSnackbar message="ยังไม่เปิดการเพิ่มข้อมูลตอนนี้" duration={4000} /> */}
                        <MuiSnackbar message="บันทึกสำเร็จ" duration={4000} />
                  </Box>   
                </form>
            )}
        </Formik>
    </Box >
}

export default HerbalDetail