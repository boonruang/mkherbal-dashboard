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
      <Card key={selectedResult.id} sx={{ maxWidth: 800 , backgroundColor : colors.primary[400] }}>
          <CardMedia
            sx={{ height: 550, width: 800}}
            image={imagesUrl+selectedResult.cover}
            title={selectedResult.herbalname.substring(0, 40)}
          />
          <CardContent>
              <Typography gutterBottom variant="h4" component="div" color={colors.greenAccent[400]}>
              {selectedResult.herbalname.substring(0, 40)}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              {selectedResult.commonname.substring(0, 100)}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              {selectedResult.scientificname}
              </Typography>
              <Typography variant="h6" color="text.secondary">
              {selectedResult.akaname.substring(0, 100)}
              </Typography>
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