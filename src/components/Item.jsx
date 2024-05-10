import React from 'react'
import { Box,Typography,IconButton,useTheme  } from "@mui/material"
import { tokens } from '../theme';
import PlaceIcon from '@mui/icons-material/Place';

const Item = ({result}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const content = (
        <Box  backgroundColor={colors.primary[400]} key={result.properties.Id} sx={{ m: 1 }} >
        <Box
            display="flex"
            // backgroundColor={colors.blueAccent[400]}
            borderRadius="3px"
            // justifyContent="center"
            alignItems="center"
        >
            <IconButton type="button" sx={{ p: 1 }} >
                <PlaceIcon />
            </IconButton>
            <Typography
            variant="h5"
            color={colors.greenAccent[400]}
            >
                    {result.properties.marketplacename}
            </Typography>            
        </Box>     
        <Box display="flex" flexDirection="column" justifyContent="center" sx={{ ml: 2 }} >
          <Box>{result.properties.address} {result.properties.tambon} {result.properties.amphoe}</Box>
          <Box>{result.properties.province} {result.properties.postcode}</Box>
        </Box>    
      </Box>
  )
  return content
}

export default Item