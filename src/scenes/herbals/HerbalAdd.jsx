import {
  addHerbal,
  getNewHerbalId
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
import React, { useEffect, useState } from "react";
import { tokens } from 'theme';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const HerbalAdd = () => {
  // const router = useRouter();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { isSidebar } = useSelector((state) => state.app.appReducer);

  const navigate = useNavigate();

  const [newId, setNewId] = useState();

  // let aaa;
  // const test = async () => {
  //   aaa = await getNewHerbalId();
  //   if (aaa) {
  //     console.log('aaaa', aaa);
  //     // setNewId(aaa)
  //   }
  // };
  // test()

  const [loading, setLoading] = useState(false); 

  // console.log('id new =>', () => await getNewHerbalId())
  useEffect(() => {
    const loadNewId = async () => {
      setLoading(true)
      const response = await getNewHerbalId()

      setNewId(response.result)
      setLoading(false); 

    }
    loadNewId()
  },[])

  // if (!loading) {
  //   console.log('new id', newId)
  // }

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
            {/* <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              // disabled
              name="id"
              type="text"
              label="ลำดับ" /> */}
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
              name="akaname"
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
    id: "",
    herbalname: "",
    commonname: "",
    scientificname: "",
    akaname: "",
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
            if (!values.akaname) errors.akaname = "Enter akaname";
            if (!values.cover) errors.cover = "Enter image";
            return errors;
          }}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('values', values);
            let data = new FormData();
            // data.append("id", values.id);
            data.append("id", newId);
            data.append("herbalname", values.herbalname);
            data.append("commonname", String(values.commonname));
            data.append("scientificname", String(values.scientificname));
            data.append("akaname", String(values.akaname));
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
