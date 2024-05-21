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
  Box
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

const HerbalAdd = () => {
  // const router = useRouter();
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const { isSidebar} = useSelector((state) => state.app.appReducer)

  const showForm = ({
    values,
    setFieldValue,
    isValid,
  }) => {
    return (
      <Form >
        <Card style={{ backgroundColor: colors.primary[500] }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              เพิ่มข้อมูล
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="harbalname"
              type="text"
              label="ชื่อสมุนไพร"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="commonname"
              type="text"
              label="ชื่อทั่วไป"
            />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="scientificname"
              type="text"
              label="ชื่อวิทยาศาสตร์"
            />

          <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="skaname"
              type="text"
              label="ชื่อสามัญ"
            />                  

          </CardContent>
          <CardActions sx={{ margin: 3 }}>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              // sx={{ marginLeft: 1 }}
            >
              <Typography variant="h5" color={colors.grey[100]}>
                เพิ่มข้อมูล
              </Typography>
            </Button>
            <Button 
            variant="outlined" 
            fullWidth 
            color="secondary">
              <Typography variant="h5" color={colors.grey[100]}>
                ยกเลิก
              </Typography>              
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };


  const initialValues = {
    id: "",
    name: "",
    herbalname: "",
    commonname: "",
  };

  return (
    <Box m="20px">
      {/* <Header title="ข้อมูลสุมนไพร" subtitle="เพิ่มข้อมูล"/> */}
      <Box  height={ isSidebar ? "90vh" : "95vh" } width="100%" sx={{overflow: "hidden", overflowY: "hidden"}} bgcolor={ colors.primary[500]}>   
          <Formik
            validate={(values) => {
              let errors;
              if (!values.name) errors.name = "Enter name";
              if (values.stock < 3) errors.stock = "Min stock is not lower than 3";
              if (values.price < 3) errors.price = "Min price is not lower than 3";
              return errors;
            }}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              let data = new FormData();
              data.append("name", values.name);
              data.append("price", String(values.price));
              data.append("stock", String(values.stock));
              if (values.file) {
                data.append("image", values.file);
              }
              await addHerbal(data);
              // router.push("/stock");
              setSubmitting(false);
            }}
          >
            {(props) => showForm(props)}
          </Formik>
      </Box>
    </Box> 
  );
};

export default HerbalAdd;
