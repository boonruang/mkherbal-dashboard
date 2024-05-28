/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { processGeojson } from '@kepler.gl/processors';
import { Box, useTheme, InputBase,IconButton,Button  } from "@mui/material"
import fmg_config from '../../data/fmg_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Header from "../../components/Header";
import { tokens } from '../../theme';
import {createAction} from 'redux-actions';
import {injectComponents, PanelHeaderFactory,SidebarFactory} from '@kepler.gl/components';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import CustomSidebarFactory from 'components/keplergl/CustomSidebarFactory'
import SearchIcon from "@mui/icons-material/Search"
import useDebounce from 'hooks/useDebounce';
import { addDataToMap, wrapTo, updateMap, removeDataset as removeDatasetFromKepler } from '@kepler.gl/actions'
import soilmk_fertility_config from '../../data/soilmk_fertility_config.json';
import saltmk_config from '../../data/saltmk_config.json';
// import useSWR from 'swr'
import KeplerGlSchema from '@kepler.gl/schemas';
import { showSidebar } from 'actions/app.action';
import { getHerbals } from 'actions/herbal.action';
import { getGeoSoils } from 'actions/geosoil.action';
import { getGeoSalts } from 'actions/geosalt.action';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setStateHerbalSelectedToFetching } from 'actions/herbal.action'
import SoilHerbalsList from 'components/SoilHerbalsList';
import SoilHerbalsDetail from 'components/SoilHerbalsDetail';
import axios from 'axios';

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVICE_URL

const updateVisState = createAction('UPDATE_VIS_STATE');
// const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const closeMapLegend = createAction('HIDE_AND_SHOW_MAP_LEGEND');
  
const myCustomHeaderFactory = () => CustomHeaderFactory

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory],
  [SidebarFactory, CustomSidebarFactory],
]);

const SoilHerbals = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [isSearcBoxOpen, setIsSearcBoxOpen] = useState(true)

    const [isHerbalBoxOpen, setIsHerbalBoxOpen] = useState(false)    

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const { selectedResult, plantingSelected } = useSelector((state) => state.app.herbalReducer)
    const geosoilState = useSelector((state) => state.app.geosoilReducer)
    const geosaltState = useSelector((state) => state.app.geosaltReducer)

    // if (result) {
    //   console.log('result check',result)
    // }

    // const { mkplc } = useSelector((state) => state.keplerGl)

    // if (mkplc) {
    //   console.log('mkplc',mkplc)
    // }
    
    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.mkplc)

    useEffect(() => {
      if (selectedResult) {
        setIsHerbalBoxOpen(true)
      }
    },[selectedResult])    

    useEffect(() => {
      dispatch(getGeoSoils())
      dispatch(getGeoSalts())
    },[dispatch])

    // useEffect(() => {
    //   if (result) {
    //         dispatch(removeDatasetFromKepler('fmg1'))
    //         dispatch(
    //           wrapTo(
    //             "soilherbal",
    //             addDataToMap({
    //               datasets: {
    //                 info: {
    //                   label: 'soilherbal',
    //                   id: 'fmg1'
    //                 },
    //                 data: processGeojson(result)
    //               },  
    //               options: {
    //                 centerMap: true,
    //               },             
    //               // config: fmg_config
    //               config: {}
    //               })
    //             ))
    //       dispatch(wrapTo('soilherbal',closeMapLegend()))
    //       console.log('i am running soilherbal in useEffect ')
    //       setTimeout(() => {
    //         dispatch(wrapTo('soilherbal',updateVisState()))
    //         dispatch(showSidebar(false))
    //       },500)
    //     }
    // },[dispatch,result])

   const [soilData, setSoilData] = useState()
   const [saltData, setSaltData] = useState()

   const [ampCode, setAmpCode] = useState('01');
   const [provCode, setProvCode] = useState('01');

   useEffect(() => {
    if (geosoilState.result) {
      setSoilData(geosoilState.result)
      console.log('getGeoSoils data',geosoilState.result)
    }
   },[geosoilState.result])

   useEffect(() => {
    if (geosaltState.result) {
      setSaltData(geosaltState.result)
      console.log('geosaltState data',geosaltState.result)
    }
   },[geosaltState.result])
   
    useEffect(() => {
      if (soilData && (plantingSelected  === 'soil')) {
            dispatch(
              wrapTo(
                "soilherbal",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Soil Mahasarakham',
                      id: 'soilmk1'
                    },
                    data: processGeojson(soilData)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: soilmk_fertility_config
                  })
                ))
                // console.log('replace data with amp_code => ',ampCode)
          }
    },[dispatch, plantingSelected, soilData ])  
    
    useEffect(() => {
      if (saltData && (plantingSelected === 'salt')) {
            dispatch(
              wrapTo(
                // "saltherbal",
                "soilherbal",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Soil Mahasarakham',
                      id: 'saltmk1'
                    },
                    data: processGeojson(saltData)
                    // data: []
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: saltmk_config
                  // config: soilmk_fertility_config
                  })
                ))
                // console.log('replace data with amp_code => ',ampCode)
            // dispatch(wrapTo('soilherbal',closeMapLegend()))                
          }
    },[dispatch, plantingSelected, saltData ])     

    const handleSearchClick = () => {
      setIsSearcBoxOpen(!isSearcBoxOpen)
      dispatch(setStateHerbalSelectedToFetching())        
    }    

    const handleHerbalClick = () => {
      setIsHerbalBoxOpen(!isHerbalBoxOpen)
    }    

      return (
        <Box m="20px">
            <Header title="ข้อมูลดินและสมุนไพร" subtitle="ความเหมาะสมของดินและสมุนไพร" />
              <Box  height={ isSidebar ? "86vh" : "90vh" } width="100%" sx={{overflow: "hidden"}}>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="soilherbal"
                    mapboxApiAccessToken={mapBoxKey}
                    height={height}               
                    width={width}
                    sx={{
                      "& .mapboxgl-children": {
                        style : {
                          height: "0%"
                        }}
                      }}                    
                    />
                    )}
                  </AutoSizer >                   

                  <Box 
                    sx={{ position: 'absolute', p: 0.5, left: isSearcBoxOpen ? 295 : 0, top: 5, backgroundColor: '#ec8a2f',cursor: 'pointer' }} 
                    onClick={() => handleSearchClick()}>
                      {isSearcBoxOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                  </Box>  

                    {isSearcBoxOpen ? <Box  display="flex" justifyContent="space-between" component="form" 
                                  sx={{
                                    '& > :not(style)': { height: 45, width: '33.5ch', position: 'absolute', top: 0, left: 0},
                                  }}
                                  noValidate
                                  autoComplete="off"
                                >
                          {/* SEARCH BAR */}
                          <Box
                              display="flex"
                              backgroundColor={colors.primary[400]}
                          >
                              <InputBase autoFocus sx={{ ml: 2,p: 1, flex: 1 }} placeholder="ค้นหา" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                              <IconButton type="button" sx={{ p: 1 }} >
                                  <SearchIcon />
                              </IconButton>
                          </Box>   
                    </Box>  : undefined }

                    {isSearcBoxOpen ? <SoilHerbalsList searchTerm={debouncedSearchValue} /> : undefined}


                    { selectedResult ? <Box 
                    sx={{ position: 'absolute', p: 1, left: isHerbalBoxOpen && selectedResult ? 655 : 300, top: 45, backgroundColor: '#458048',cursor: 'pointer' }} 
                    onClick={() => handleHerbalClick()}>
                      {isHerbalBoxOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </Box> : undefined }

                  { isHerbalBoxOpen && selectedResult ? <SoilHerbalsDetail /> : undefined }

              </Box>
          </Box>
      );
    }


export default SoilHerbals;