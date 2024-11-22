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
import  * as farmerActions  from '../actions/farmer.action'
import useMediaQuery from '@mui/material/useMediaQuery'

const Registration2 = () => {

  const loginReducer = useSelector(state => state.app.loginReducer)
  const dispatch = useDispatch()


  const isNonMobile = useMediaQuery("(min-width:600px)")  

  const [account, setAccount] = useState({
    username: 'admin',
    password: '11111',
  })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('account ',account)
    dispatch(farmerActions.addFarmer({ ...account, navigate }))

  };

  
  const handleCancelButtonClick = () => {
    navigate('/')
   }

  const showError = () => {
    return (
    <Typography variant="h7" color='red' >
      รหัสผ่านหรือชื่อไม่ถูกต้อง
    </Typography>
    )
  }

  return (
    <Box >
    <CssBaseline />
        <Box
            sx={{
              marginTop: '10px',
              // display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '35px',
              margin: '50px'
            }}
          >

            <Box>
              <Typography component="h1" variant="h4" textAlign='center'>
                ลงทะเบียนเกษตรกร
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                        }}
                    >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="ชื่อ"
                name={account.username}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}} // font size of input text
                InputLabelProps={{style: {fontSize: 18}}} // font size of input label
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="นามสกุล"
                name={account.username}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />  
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อเข้าระบบ"
                name={account.username}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, username: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
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
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name={account.password2}
                label="ใส่รหัสผ่านอีกครั้ง"
                type="password"
                id="password2"
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cid"
                label="รหัสบัตรประชาชน"
                name={account.cid}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, cid: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              <TextField
                margin="normal"
                required
                fullWidth
                id="hno"
                label="บ้านเลขที่"
                name={account.hno}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, hno: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              <TextField
                margin="normal"
                required
                fullWidth
                id="moo"
                label="หมู่"
                name={account.moo}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, moo: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              <TextField
                margin="normal"
                required
                fullWidth
                id="tambon"
                label="ตำบล"
                name={account.tambon}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, tambon: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              <TextField
                margin="normal"
                required
                fullWidth
                id="amphoe"
                label="อำเภอ"
                name={account.amphoe}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, amphoe: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              <TextField
                margin="normal"
                required
                fullWidth
                id="province"
                label="จังหวัด"
                name={account.province}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, province: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              <TextField
                margin="normal"
                required
                fullWidth
                id="tel"
                label="เบอร์ติดต่อ"
                name={account.tel}
                autoFocus
                onChange={(e) =>
                  setAccount({ ...account, tel: e.target.value })
                }
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
                sx={{ gridColumn: "span 2" }}
              />               
              
              <Box sx={{ gridColumn: "span 2" }}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, fontSize: '25px' }}
                    >
                      ลงทะเบียน
                    </Button>
              </Box>
              
              <Box sx={{ gridColumn: "span 2" }}>
                    <Button
                      onClick={handleCancelButtonClick}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{
                        // maxWidth: '500px', maxHeight: '50px', minWidth: '400pxpx', minHeight: '50px',
                        fontSize: '25px'
                      }}
                    >
                      ยกเลิก
                    </Button>
              </Box>
              {loginReducer.isError ? showError() : null}
              </Box>       
            </Box> 
          </Box>            
        </Box>            
  );
}

export default Registration2