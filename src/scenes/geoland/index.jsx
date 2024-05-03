/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import KeplerGl from '@kepler.gl/components';
import { addDataToMap,toggleSplitMap } from "@kepler.gl/actions";
import { processGeojson } from '@kepler.gl/processors';
// import klc_geojson from '../../data/land_kanglerngchan.json';
import { Box,Checkbox, InputLabel,MenuItem,FormControl,Select,TextField,FormControlLabel,Typography,useTheme  } from "@mui/material"
import klc_config from '../../data/klc_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {wrapTo, forwardTo} from '@kepler.gl/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header";
import 'mapbox-gl/dist/mapbox-gl.css';
import { green } from '@mui/material/colors';
import { tokens } from '../../theme';

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVIC_URL

const GeoLand = () => {
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(true);
    
    const [data, setData] = useState()

    const [ludesen, setLudesen] = useState('Paddy field');
      
     useEffect(() => {
        axios.get(`${serviceUrl}/api/v2/geoland/list/${ludesen}`)
        .then(response => {
          // console.log(response.data.result)
          setData(response.data.result)
        })
        .catch(error => {console.log(error)})
     },[ludesen])
      
      useEffect(() => {
        if (data && ludesen){
          dispatch(
            wrapTo(
              'land',
                addDataToMap({
                datasets: {
                  info: {
                    label: 'Land',
                    id: 'klc1'
                  },
                  data: []
                },     
                config: klc_config
                })
              )
          )
          setOpen(false)
        }
      }, [dispatch,data,ludesen]);
    
    // if (data) {
    //   console.log('processGeojson(data) geoland',processGeojson(data))
    // } else {
    //   console.log('no processGeojson(data) geoland');
    // }
    
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (data && ludesen) {
            dispatch(
              wrapTo(
                "land",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Land',
                      id: 'klc1'
                    },
                    data: processGeojson(data)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: klc_config
                  })
                ))
                console.log('replace data with amp_code => ',ludesen)
          }
        setOpen(false)
    },[dispatch, ludesen, data ])

    const handleSelect = async (event) => {
      setLudesen(event.target.value);
      // console.log('event.target.value',event.target.value)
      // console.log('amp_code in handleSelect',ampCode)
    };  

    const handleChange = (event) => {
      setChecked(event.target.checked);
      dispatch(wrapTo('land',toggleSplitMap()));
    };

      return (
        <Box m="20px">
              <Header title="ข้อมูลแผนที่" subtitle="การใช้ดิน"/>
              <Box component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                      {/* <FormControlLabel control={<Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={{
                            color: green[800],
                            '&.Mui-checked': {
                              color: green[600],
                            },
                          }}
                        />
                        } label="แบ่งแผนที่" /> */}
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={ludesen}
                      label="Ludesen"
                      onChange={handleSelect}
                    >
                      <MenuItem value={""}>
                        <em>ไม่ระบุ</em>
                      </MenuItem>
                      <MenuItem value={"Paddy field"} defaultChecked>พื้นที่นา</MenuItem>
                      <MenuItem value={"Field crop"}>พืชไร่</MenuItem>
                      <MenuItem value={"Perennial crop"}>ไม้ยืนต้น</MenuItem>
                      <MenuItem value={"Orchard"}>ไม้ผล</MenuItem>
                      <MenuItem value={"Pasture and farm house"}>ทุ่งหญ้าเลี้ยงสัตว์และโรงเรือนเลี้ยงสัตว์</MenuItem>
                      <MenuItem value={"Village"}>หมู่บ้าน</MenuItem>
                      <MenuItem value={"Artificial water body"}>แหล่งน้ำที่สร้างขึ้น</MenuItem>
                    </Select>
                    
                      <TextField id="outlined-basic" label="ตำบล" variant="outlined" />
                      <TextField id="outlined-basic" label="อำเภอ" variant="outlined" />
                      <TextField id="outlined-basic" label="จังหวัด" variant="outlined" />
                      <Typography
                          variant="h5"
                          color={colors.greenAccent[400]}
                      >
                              {ludesen}
                      </Typography>
              </Box>
              <Box height="80vh" width="100%" borderRadius="4px" >
              <Backdrop
                  sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="land"
                    mapboxApiAccessToken={mapBoxKey}
                    height={height}               
                    width={width}
                    sx={{
                      "& .mapboxgl-children": {
                        style : {
                          height: "0%"
                        }
                      }
                    }}                    
                    />
                    )}
                  </AutoSizer >
                </Box>
          </Box>
      );
    }

    export default GeoLand;