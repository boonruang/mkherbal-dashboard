import { useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import  * as loginActions  from '../actions/login.action'

const Loginbackoffice = () => {

  const loginReducer = useSelector(state => state.app.loginReducer)
  const dispatch = useDispatch()

  const [account, setAccount] = useState({
    username: 'admin',
    password: '11111',
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('account ',account)
    dispatch(loginActions.login({ ...account, navigate }))

  };

  const showError = () => {
    return (
    <Typography variant="h7" color='red' >
      รหัสผ่านหรือชื่อไม่ถูกต้อง
    </Typography>
    )
  }

  return (
    <Box 
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
            }}
    >
    <CssBaseline />
      <Box 
            sx={{
              backgroundImage: "url('images/backoffice_bg.jpg')",
              backgroundSize: "cover",
              height: "100vh",
              width: '100%',
              display: { xs: 'none', sm: 'none', md: 'block' }
            }}  
      >
        {/* Left */}
      </Box>
      <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}  
      >
        {/* <Box sx={{ justifyContent:'center', alignItems: 'center' }}>
            <Box
                component="img"
                sx={{
                  height: 135,
                  maxHeight: { xs: 120, md: 160 },
                  alignItems: 'center',
                  marginTop: '20px',
                }}
                alt="logo"
                src="images/msulogo.png"        
            />
        </Box> */}
        <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '35px',
              margin: '50px'
            }}
          >

            <Typography component="h1" variant="h5">
              ระบบ Back Office 
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อ"
                name={account.username}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={account.password}
                label="รหัสผ่าน"
                type="password"
                id="password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
              />
              <Box>
              {loginReducer.isError ? showError() : null}
              </Box>              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  fontSize: '18px'
                }}
              >
                เข้าระบบ
              </Button>
            </Box>
        </Box>            
      </Box>
    </Box>
  );
}

export default Loginbackoffice