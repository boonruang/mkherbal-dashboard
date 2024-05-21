import React, { useEffect, useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  useTheme,
  IconButton,
  InputBase,
  Fab
} from '@mui/material'

import useDebounce from 'hooks/useDebounce';
import { useSelector, useDispatch } from 'react-redux';
import { tokens } from 'theme';
import Header from 'components/Header'
import { getHerbals } from 'actions/herbal.action';
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from '@mui/icons-material/Add';
import HerbalList from 'components/HerbalList';

const Herbals = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)  

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHerbals())
    console.log('getHerbals is running in useEffect')
  },[dispatch])


  const { isSidebar} = useSelector((state) => state.app.appReducer)

  return (
    <Box>
      {/* <Header title="ข้อมูลสุมนไพร" subtitle="รายการข้อมูลสุมนไพร"/> */}
      <Box  height={ isSidebar ? "90vh" : "95vh" } width="100%" sx={{overflow: "hidden", overflowY: "scroll"}} bgcolor={ colors.primary[500]}>
            <Box>
            {/* <Container maxWidth="lg"> */}
            <Container maxWidth="xlg">
              <Typography variant='h4' align='center' style={{ marginTop: "20px"}}>
              รายการข้อมูลสมุนไพร
              </Typography>
              <Box display="flex" justifyContent="space-between" >
                  <Box
                      display="flex"
                      backgroundColor={colors.primary[400]}
                      borderRadius="3px"
                  >
                    <Box sx={{position: "absolute", top: 100, zIndex: 11}}  backgroundColor={colors.primary[400]} borderRadius="3px">
                     <InputBase autoFocus sx={{ ml: 2, flex: 1 }} placeholder="ค้นหา" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                      {/* <InputBase autoFocus sx={{ ml: 2, flex: 1 }} placeholder="ค้นหา" /> */}
                      <IconButton type="button" sx={{ p: 1 }} >
                          <SearchIcon />
                      </IconButton>
                    </Box>
                          <Fab
                            color="secondary"
                            aria-label="add"
                            sx={{
                              position: "absolute",
                              top: 80,
                              right: 40,
                            }}
                          >
                            <AddIcon />
                          </Fab>                      
                  </Box> 
                  <Box display="flex">
                      <IconButton>
                          <AddIcon />
                      </IconButton>
                  </Box>                  
              </Box>             
              <Box>
                <HerbalList searchTerm={debouncedSearchValue} />
              </Box>
            </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default Herbals