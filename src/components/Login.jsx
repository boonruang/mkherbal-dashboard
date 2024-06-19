import { useRef, useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import  * as loginActions  from '../actions/login.action'

// import axios from '../utils/axios'
// import { server } from '../constants'

const Login = () => {

  const loginReducer = useSelector(state => state.app.loginReducer)
  const dispatch = useDispatch()

  const [account, setAccount] = useState({
    username: 'admin',
    password: '11111',
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });
    //   let username = data.get('username')
    //   let password =  data.get('password')

      // setAccount({username,password})
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
              backgroundImage: "url('images/sign-img-left.jpg')",
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
        <Box sx={{ justifyContent:'center', alignItems: 'center' }}>
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
          {/* Logo top right */}
        </Box>
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
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              เข้าใช้งานระบบ
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อ"
                // name="username"
                name={account.username}
                // autoComplete="username"
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                // name="password"
                name={account.password}
                label="รหัสผ่าน"
                type="password"
                id="password"
                // autoComplete="current-password"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="บันทึกรหัส"
              /> */}
              <Box>
              {loginReducer.isError ? showError() : null}
              </Box>              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าระบบ
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ลืมรหัสผ่าน
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"ลงทะเบียน"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
        </Box>            
      </Box>
    </Box>
  );
}

export default Login