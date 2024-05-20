import React, { useEffect } from 'react'
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material'

import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { getHerbals } from 'actions/herbal.action';
import { HerbalCard } from 'components/HerbalCard';

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Herbals = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHerbals())
    console.log('getHerbals is running in useEffect')
  },[dispatch])


  const { isSidebar} = useSelector((state) => state.app.appReducer)
  const { result } = useSelector((state) => state.app.herbalReducer)

  if (result) {
    console.log('herbals result', result)
  }

  const herbals = result?.map((item, index) => (
    <Grid item xs={12} sm={4} ms={4} key={index}>
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}} style={{ marginBottom: "20px"}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="220"
              image={imagesUrl+item.cover}
              // title={item.herbalname.substring(0, 40)}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
                {item.herbalname.substring(0, 100)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {item.commonname.substring(0, 100)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {item.scientificname.substring(0, 100)}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  More
                </Typography>
              </CardContent>
          </CardActionArea>
        </Card>
    </Grid>
  ))


  return (
    // <Box m="20px">
    <Box>
      {/* <Header title="ข้อมูลสุมนไพร" subtitle="รายการข้อมูลสุมนไพร"/> */}
      <Box  height={ isSidebar ? "90vh" : "95vh" } width="100%" sx={{overflow: "hidden", overflowY: "scroll"}} bgcolor={ colors.primary[500]}>
            <Box>
            {/* <Container maxWidth="lg"> */}
            <Container maxWidth="xlg">
              <Typography variant='h4' align='center' style={{ marginTop: "20px"}}>
              รายการข้อมูลสมุนไพร
              </Typography>
                <Grid container spacing={5} style={{ marginTop: "20px"}}>
                  { result && herbals }
                </Grid>
            </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Herbals