/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback  } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { processGeojson } from '@kepler.gl/processors';
import { Box,Typography,useTheme, InputBase,IconButton,Button  } from "@mui/material"
import mkplc_config from '../../data/mkplc_config.json';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import axios from 'axios';
import Header from "../../components/Header";
import { tokens } from '../../theme';
import {createAction} from 'redux-actions';
import {injectComponents, PanelHeaderFactory,SidebarFactory} from '@kepler.gl/components';
import CustomHeaderFactory from 'components/keplergl/CustomHeaderFactory';
import CustomSidebarFactory from 'components/keplergl/CustomSidebarFactory'
import SearchIcon from "@mui/icons-material/Search"
import PlaceIcon from '@mui/icons-material/Place';
import useDebounce from 'hooks/useDebounce';
import List from '../../components/List'
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';
import { getMarketplaces } from '../../actions/marketplace.action'
import { addDataToMap, wrapTo, updateMap } from '@kepler.gl/actions'
import useSWR from 'swr'

const mapBoxKey = process.env.REACT_APP_MAPBOX_API
const serviceUrl = process.env.REACT_APP_SERVIC_URL

// const updateVisState = createAction('UPDATE_VIS_STATE');
// const toggleSidePanel = createAction('HIDE_AND_SHOW_SIDE_PANEL');
const closeMapLegend = createAction('HIDE_AND_SHOW_MAP_LEGEND');

const StyledMapConfigDisplay = styled.div`
position: absolute;
z-index: 100;
top: 0px;
left: 0px;
background-color: ${theme.sidePanelBg};
font-size: 11px;
width: 300px;
color: ${theme.textColor};
/* word-wrap: break-word; */
height: 100%;
min-height: 60px;
max-height: 100%;
padding: 10px;
`;

    
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
    
    const [data, setData] = useState()

    const [Id, setId] = useState('');

    const [textSearch, setTextSearch] = useState('all');

    const { sidebar } = useSelector((state) => state.app.appReducer)

    const { result, isFetching, isError } = useSelector((state) => state.app.marketplaceReducer)

    
    useEffect(() => {
      if (result) {
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
                    </Button>                        */}
              </Box>
              <Box height={ sidebar ? "82vh" : "86vh" } width="100%" borderRadius="4px" sx={{overflow: "hidden"}} >
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