/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { processGeojson } from '@kepler.gl/processors';
import { Box, useTheme, InputBase,IconButton,Button  } from "@mui/material"
import mkplc_config from '../../data/mkplc_config.json';
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
import List from '../../components/List'
import { addDataToMap, wrapTo, updateMap, removeDataset as removeDatasetFromKepler } from '@kepler.gl/actions'
// import useSWR from 'swr'
import KeplerGlSchema from '@kepler.gl/schemas';
import { showSidebar } from 'actions/app.action';

const mapBoxKey = process.env.REACT_APP_MAPBOX_API

const updateVisState = createAction('UPDATE_VIS_STATE');
// const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const closeMapLegend = createAction('HIDE_AND_SHOW_MAP_LEGEND');
  
const myCustomHeaderFactory = () => CustomHeaderFactory

const KeplerGl = injectComponents([
  [PanelHeaderFactory, myCustomHeaderFactory],
  [SidebarFactory, CustomSidebarFactory],
]);

const Marketplace = (props) => {

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  
  const dispatch = useDispatch();

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const [open, setOpen] = useState(true);
    
    const { isSidebar } = useSelector((state) => state.app.appReducer)

    const { result } = useSelector((state) => state.app.marketplaceReducer)

    if (result) {
      console.log('result check',result)
    }

    // const { mkplc } = useSelector((state) => state.keplerGl)

    // if (mkplc) {
    //   console.log('mkplc',mkplc)
    // }
    
    // const mapConfig = KeplerGlSchema.getConfigToSave(keplerGlReducer.mkplc)

    useEffect(() => {
      if (result) {
            dispatch(removeDatasetFromKepler('mkplc1'))
            dispatch(
              wrapTo(
                "mkplc",
                addDataToMap({
                  datasets: {
                    info: {
                      label: 'Marketplace',
                      id: 'mkplc1'
                    },
                    data: processGeojson(result)
                  },  
                  options: {
                    centerMap: true,
                  },             
                  config: mkplc_config
                  })
                ))
          dispatch(wrapTo('mkplc',closeMapLegend()))
          console.log('i am running in useEffect ')
          setTimeout(() => {
            dispatch(wrapTo('mkplc',updateVisState()))
            dispatch(showSidebar(false))
          },500)
        }
        setOpen(false)            
    },[dispatch,result])

      return (
        <Box m="20px">
            <Header title="ข้อมูลแผนที่" subtitle="แหล่งขาย" />
              <Box  display="flex" justifyContent="space-between" component="form" 
                            sx={{
                              '& > :not(style)': { ml: 0, mb: 1, width: '30ch'},
                            }}
                            noValidate
                            autoComplete="off"
                          >
                    {/* SEARCH BAR */}
                    <Box
                        display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="3px"
                    >
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="ค้นหา" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <IconButton type="button" sx={{ p: 1 }} >
                            <SearchIcon />
                        </IconButton>
                    </Box>   
                    {/* <Button variant="contained" color="success" onClick={() => {dispatch(wrapTo('mkplc',updateMap({latitude: 16.245516, longitude: 103.250034, width: 800, height: 1200}, 1)))}}>
                    UPDATE_MAP
                    </Button> */}
                    {/* <Button variant="contained" color="success" onClick={() => {dispatch(wrapTo('mkplc',updateVisState()))}}>
                    UPDATE VISSTATE
                    </Button> */}
              </Box>
              <Box height={ isSidebar ? "82vh" : "86vh" } width="100%" borderRadius="4px" sx={{overflow: "hidden"}} >
              <Backdrop
                  sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
                  <AutoSizer>
                    {({height, width}) => (
                    <KeplerGl
                    id="mkplc"
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
                   {/* LIST HERE    */}
                      <List searchTerm={debouncedSearchValue} />
                </Box>
          </Box>
      );
    }


export default Marketplace;