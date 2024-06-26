import React, { useState} from 'react'
import { Snackbar, Button } from '@mui/material'

const MuiSnackbar = () => {

  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Submit</Button>
        <Snackbar message="Form submitted Successfully"
          autoHideDuration={4000}
          open={open}
          onClose={(handleClose)}
        />
    </>
  )
}

export default MuiSnackbar