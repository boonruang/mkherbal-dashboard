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
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React from "react";
import { tokens } from 'theme';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const HerbalAdd = () => {
  // const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isSidebar } = useSelector((state) => state.app.appReducer);

  const navigate = useNavigate();

  const showForm = ({
    values, setFieldValue, isValid,
  }) => {
    return (
      <Form>
        <Card style={{ backgroundColor: colors.primary[400] }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              เพิ่มข้อมูล
            </Typography>
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="herbalname"
              type="text"
              label="ชื่อสมุนไพร" />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="commonname"
              type="text"
              label="ชื่อสามัญ" />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="scientificname"
              type="text"
              label="ชื่อวิทยาศาสตร์" />

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="othername"
              type="text"
              label="ชื่อตามท้องถิ่น" />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="cover"
              type="text"
              label="รูปภาพ" />

          </CardContent>
          <CardActions sx={{ margin: 3 }}>
            <Button
              disabled={!isValid}
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              <Typography variant="h5" color={colors.grey[100]}>
                บันทึกข้อมูล
              </Typography>
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={() => navigate("/herbals")}
            >
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
    herbalname: "",
    commonname: "",
    scientificname: "",
    othername: "",
    // cover: "no-photo.png",
    cover: "",
  };

  return (
    <Box m="20px">
      {/* <Header title="ข้อมูลสุมนไพร" subtitle="เพิ่มข้อมูล"/> */}
      <Box height={isSidebar ? "90vh" : "95vh"} width="100%" sx={{ overflow: "hidden", overflowY: "hidden" }}>
        <Formik
          validate={(values) => {
            let errors;
            if (!values.herbalname) errors.herbalname = "Enter herbalname";
            if (!values.commonname) errors.commonname = "Enter commonname";
            if (!values.scientificname) errors.scientificname = "Enter scientificname";
            if (!values.othername) errors.othername = "Enter othername";
            if (!values.cover) errors.cover = "Enter image";
            return errors;
          }}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('values', values);
            let data = new FormData();
            data.append("herbalname", values.herbalname);
            data.append("commonname", String(values.commonname));
            data.append("scientificname", String(values.scientificname));
            data.append("othername", String(values.othername));
            data.append("cover", String(values.cover));
            // if (values.file) {
            //   data.append("image", values.file);
            // }
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

export default HerbalAdd
