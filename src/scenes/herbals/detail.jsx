// import Layout from "@/components/Layouts/Layout";
import {
  addHerbal,
} from "../../services/serverService";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
  Box,
  CardMedia
} from "@mui/material";
import { Field, Form, Formik, FormikProps } from "formik";
import { TextField } from "formik-material-ui";
// import Link from "next/link";
import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/router";
import { tokens } from 'theme';
import { useSelector } from "react-redux";
import Header from "components/Header";

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const HerbalDetail = () => {
  // const router = useRouter();
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const { isSidebar} = useSelector((state) => state.app.appReducer)
  const { selectedResult } = useSelector((state) => state.app.herbalReducer)

  const showHerbal = (
      <Card key={selectedResult.id} sx={{ maxWidth: 1000 , backgroundColor : colors.primary[400] }}>
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
    <Box>
      {/* <Header title="ข้อมูลสุมนไพร" subtitle="เพิ่มข้อมูล"/> */}
      <Box >   
          {showHerbal}
      </Box>
    </Box> 
  );
};

export default HerbalDetail