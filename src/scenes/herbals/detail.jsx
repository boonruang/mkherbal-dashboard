import {
  Card,
  CardContent,
  Typography,
  useTheme,
  Box,
  CardMedia
} from "@mui/material";
import React from "react";
import { tokens } from 'theme';
import { useSelector } from "react-redux";

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const HerbalDetail = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const { isSidebar} = useSelector((state) => state.app.appReducer)
  const { selectedResult } = useSelector((state) => state.app.herbalReducer)

  const showHerbal = (
      <Card key={selectedResult.id} sx={{ maxWidth: 700 , backgroundColor : colors.primary[400] }}>
          <CardMedia
            sx={{ height: 550, width: 800}}
            image={imagesUrl+selectedResult.cover}
            title={selectedResult.herbalname.substring(0, 40)}
          />
          <CardContent>
              <Typography gutterBottom variant="h4" component="div" color={colors.greenAccent[400]}>
              {selectedResult.herbalname.substring(0, 40)}
              </Typography>
              <Box>
                <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
                  ชื่อสามัญ
                </Typography>              
                <Typography ml="5px" variant="h6" display='inline'>
                {selectedResult.commonname.substring(0, 90)}
                </Typography>                   
              </Box>   
              <Box>
                <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
                  ชื่อวิทยาศาสตร์
                </Typography>              
                <Typography ml="5px" variant="h6" display='inline'>
                {selectedResult.scientificname.substring(0, 90)}
                </Typography>                   
              </Box>                          
              <Box>
                <Typography variant="h6" color={colors.greenAccent[600]} display='inline'>
                  ชื่อทั่วไป
                </Typography>              
                <Typography ml="5px" variant="h6" display='inline'>
                {selectedResult.akaname.substring(0, 90)}
                </Typography>                   
              </Box>                          
          </CardContent>
    </Card>
    );

  return (
    <Box sx={{ ml: isSidebar ? 35 : 0}}>
      <Box >   
          {showHerbal}
      </Box>
    </Box> 
  );
};

export default HerbalDetail