import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material'
  
const ThankyouReg = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate('/login')
  },2000)


    return <Box m="20px">
            Thank you.
        </Box>
}

export default ThankyouReg