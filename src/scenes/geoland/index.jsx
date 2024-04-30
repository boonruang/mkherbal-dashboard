/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import KeplerGl from '@kepler.gl/components';
import { addDataToMap } from "@kepler.gl/actions";
import { processGeojson } from '@kepler.gl/processors';
// import klc_geojson from '../../data/land_kanglerngchan.json';
import { Box } from "@mui/material"
import klc_config from '../../data/klc_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {wrapTo} from '@kepler.gl/actions';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header"

const mapBoxKey = process.env.REACT_APP_MAPBOX_API

const GeoLand = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    
    const [data, setData] = useState()
    
      const getLandKlc = async () => {
        await axios.get('http://localhost:8080/api/v2/geoland/list')
        .then(response => {
          // console.log(response.data.result)
          setData(response.data.result)
        })
        .catch(error => {console.log(error)})
      }  
    
     useEffect(() => {
      getLandKlc()
     },[])
      
      useEffect(() => {
        if (data){
          dispatch(
            wrapTo(
              'land',
                addDataToMap({
                datasets: {
                  info: {
                    label: 'Land',
                    id: 'klc1'
                  },
                  data: processGeojson(data)
                },     
                config: klc_config
                })
              )
          )
          setOpen(false)
        }
      }, [dispatch,data]);
    
    if (data) {
      console.log('processGeojson(data)',processGeojson(data))
    } else {
      console.log('no processGeojson(data)');
    }
    
    
      return (
        <Box m="20px">
              <Header title="ข้อมูลแผนที่" subtitle="การใช้ดิน"/>
              <Box height="84vh" width="100%" borderRadius="4px">
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
                    />
                    )}
                  </AutoSizer >
                </Box>
          </Box>
      );
    }

    export default GeoLand;