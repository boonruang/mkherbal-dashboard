import React, { useEffect } from 'react'
import * as loginActions from '../actions/login.action'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { 
    Box, 
  } from '@mui/material'
  
const Logout = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loginActions.logout({navigate}))
  },[])

    return <Box m="20px">
            Thank you.
        </Box>
}

export default Logout