/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { processGeojson } from '@kepler.gl/processors';
import { Box, useTheme, InputBase,IconButton,Button  } from "@mui/material"
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Header from "../../components/Header";
import { tokens } from '../../theme';
import {createAction} from 'redux-actions';
import SearchIcon from "@mui/icons-material/Search"
import useDebounce from 'hooks/useDebounce';
import { addDataToMap, wrapTo, updateMap, removeDataset as removeDatasetFromKepler, receiveMapConfig } from '@kepler.gl/actions'
import KeplerGl from '@kepler.gl/components';
import soilmk_fertility_config from '../../data/soilmk_fertility_config.json';
import soilmk_texture_config from '../../data/soilmk_texture_config.json';
import soilmk_ph_config from '../../data/soilmk_ph_config.json';
import saltmk_config from '../../data/saltmk_config.json';
// import useSWR from 'swr'
import KeplerGlSchema from '@kepler.gl/schemas';
import { showSidebar } from 'actions/app.action';
import { getHerbals } from 'actions/herbal.action';
import { getGeoSoils, getGeoSoilById } from 'actions/geosoil.action';
import { getGeoSalts } from 'actions/geosalt.action';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setStateHerbalSelectedToFetching } from 'actions/herbal.action'
import SoilHerbalsList from 'components/SoilHerbalsList';
import SoilHerbalsDetail from 'components/SoilHerbalsDetail';
import {ActionTypes} from '@kepler.gl/actions';

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVICE_URL

let soilmk_fer_conf = soilmk_fertility_config
const updateColorField = createAction('UPDATE_COLOR_FIELD');
const update5555 = createAction('TOY_5555');

const updateMapConfig = createAction('SET_MAP_CONFIG_UPDATE');

// const togglePerspective = createAction('SET_MAP_PERSPECTIVE');
const updateMapControl = createAction('UPDATE_MAP_CONTROLS');

const updateMapTheme = createAction('UPDATE_MAP_THEME');

const setMapStateFitbound = createAction('SET_MAP_STAT_FIT');
const rcvMapConfig = createAction('RCV_MAP_STAT_CONFIG');
const resetMapConfig = createAction('RESET_MAP_STAT_CONFIG');
const updateVisStatDataset = createAction('UPDATE_VISSTAT_DATASET');
const rcvVisStatMapConfig = createAction('RCV_VIS_STAT_CONFIG'); 
const LoadRemoteResourceSuccess = createAction('LOAD_REMOTE_RESOURCE_SUCCESS'); 


const updateVisStatePlugin = createAction('UPDATE_VIS_STATE');
const updateVisStateConfigPlugin = createAction('UPDATE_VIS_STATE_CONFIG');
// const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const closeMapLegend = createAction('HIDE_AND_SHOW_MAP_LEGEND');

const togglePerspective = createAction(ActionTypes.TOGGLE_PERSPECTIVE);
const addCustomerMapStyle = createAction(ActionTypes.ADD_CUSTOM_MAP_STYLE);
  

// const KeplerGl = injectComponents([
//   [PanelHeaderFactory, myCustomHeaderFactory],
//   [SidebarFactory, CustomSidebarFactory],
// ]);

const SoilHerbals = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [isSearcBoxOpen, setIsSearcBoxOpen] = useState(true)

    const [isHerbalBoxOpen, setIsHerbalBoxOpen] = useState(false)    

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const { selectedResult, plantingSelected, amphoeSelected, soilFieldSelected } = useSelector((state) => state.app.herbalReducer)
    const geosoilState = useSelector((state) => state.app.geosoilReducer)
    const geosaltState = useSelector((state) => state.app.geosaltReducer)

    // const keplerGlReducer = useSelector((state) => state.keplerGl)
    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.soilherbal)
    const parsedConfigFertility = KeplerGlSchema.parseSavedConfig(soilmk_fertility_config);
    const parsedConfigTexture = KeplerGlSchema.parseSavedConfig(soilmk_texture_config);
    const parsedConfigPh = KeplerGlSchema.parseSavedConfig(soilmk_ph_config);

      // dispatch((receiveMapConfig(parsedConfig2)))

    // if (keplerGlReducer){
    //   console.log('keplerGlReducer mapConfig',keplerGlReducer)
    // }

    useEffect(() => {
      if (selectedResult) {
        setIsHerbalBoxOpen(true)
      }
    },[selectedResult])    

    useEffect(() => {
      dispatch(getGeoSalts())
    },[dispatch])

    useEffect(() => {
      dispatch(getGeoSoilById(amphoeSelected))
    },[dispatch,amphoeSelected])

   const [soilData, setSoilData] = useState()
   const [saltData, setSaltData] = useState()

   useEffect(() => {
      dispatch(removeDatasetFromKepler('soilmk1'))
    },[dispatch, soilData, amphoeSelected, plantingSelected]) 

   useEffect(() => {
    if (geosoilState.selectedResult) {
      setSoilData(geosoilState.selectedResult)
      console.log('getGeoSoils selectedResult data',geosoilState.selectedResult)
    }
   },[geosoilState.selectedResult])

   useEffect(() => {
    if (geosaltState.result) {
      setSaltData(geosaltState.result)
      console.log('geosaltState data',geosaltState.result)
    }
   },[geosaltState.result])

   useEffect(() => {
    console.log('soilFieldSelected changed',soilFieldSelected)
    if (soilData) {
      if (soilFieldSelected === 'fertility') {
        dispatch((LoadRemoteResourceSuccess( {datasets: {info: {label: 'Soil MK',id: 'soilmk1'}, data: processGeojson(soilData)}, config: parsedConfigFertility})))
      } else if (soilFieldSelected === 'ph') {
        dispatch((LoadRemoteResourceSuccess( {datasets: {info: {label: 'Soil MK',id: 'soilmk1'}, data: processGeojson(soilData)}, config: parsedConfigPh})))
      } else if (soilFieldSelected === 'texture') {
        dispatch((LoadRemoteResourceSuccess( {datasets: {info: {label: 'Soil MK',id: 'soilmk1'}, data: processGeojson(soilData)}, config: parsedConfigTexture})))
      }        
    }
  },[dispatch, soilData, soilFieldSelected, parsedConfigFertility, parsedConfigPh, parsedConfigTexture])      

    useEffect(() => {
     if (saltData && (plantingSelected  === 'salt')) {
            dispatch(
              wrapTo(
                "soilherbal",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Soil Mahasarakham',
                      id: 'saltmk1'
                    },
                    data: processGeojson(saltData)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: saltmk_config
                  })
                ))
                
       } else if (soilData) {
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
                // config: soilmk_ph_config
                })
              ))
      }
    },[dispatch, plantingSelected, soilData, saltData ])     

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
            {/* <Button variant="contained" color="success" onClick={() => dispatch(updateMapConfig(mapConfig.config.mapState)) }>
              Update MapConfig
            </Button>   */}
            <Button variant="contained" color="success" onClick={() => dispatch(updateColorField()) }>
              Update Color Field
            </Button>  
            {/* <Button variant="contained" color="success" onClick={() => dispatch(updateColorField({info: {label: 'Soil 111',id: 'soilmk1'}, data: processGeojson(soilData)})) }>
              Button click
            </Button>   */}
            <Button variant="contained" color="success" onClick={() => dispatch(update5555()) }>
              Hide Legend
            </Button>  
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(togglePerspective())))}>
              Toggle Perspective
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(updateMapControl())))}>
              Update Map Control
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(updateMapTheme())))}>
              Update Map Theme
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(updateMapConfig(soilmk_texture_config))))}>
              Set Map config update
            </Button>             
            {/* <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(resetMapConfig(soilmk_texture_config.config))))}>
              receiveMapConfig
            </Button>              */}
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(resetMapConfig(soilmk_texture_config))))}>
              reset map config
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(updateVisStatDataset({info: {label: 'Soil 111',id: 'soilmk1'}, data: processGeojson(soilData)}))))}>
              Update visState Dataset
            </Button>             

            <Button variant="contained" color="secondary" onClick={() => dispatch(removeDatasetFromKepler('soilmk1'))}>
              Delete Dataset (soilmk1)
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(removeDatasetFromKepler('saltmk1'))}>
              Delete Dataset (saltmk1)
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(updateVisStatePlugin({info: {label: 'Salt MK 111',id: 'saltmk1'}, data: processGeojson(soilData)}))))}>
              Update visState in Plugin Soil in saltmk1
            </Button>             
            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(updateVisStatePlugin({info: {label: 'Salt MK 111',id: 'saltmk1'}, data: processGeojson(saltData)}))))}>
              Update visState in Plugin Salt
            </Button>   

            <Button variant="contained" color="success" onClick={() => dispatch(wrapTo("soilherbal",(updateVisStateConfigPlugin({info: {label: 'Soil MK 111',id: 'soilmk1'}, data: processGeojson(soilData)}))))}>
              Update visState in Plugin Soil in soilmk1
            </Button>             

            <Button variant="contained" color="secondary" onClick={() => dispatch(wrapTo("soilherbal",(rcvVisStatMapConfig(parsedConfigPh))))}>
              Update visState Map Config
            </Button>             

            <Button variant="contained" color="secondary" onClick={() => dispatch((addCustomerMapStyle()))}>
              Add custom MapStyle
            </Button>             
            <Button variant="contained" color="success" onClick={() => dispatch((LoadRemoteResourceSuccess( {datasets: {info: {label: 'Soil MK 111',id: 'soilmk1'}, data: processGeojson(soilData)}, config: parsedConfigTexture} )))}>
              LoadRemoteResourceSuccess
            </Button>    

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