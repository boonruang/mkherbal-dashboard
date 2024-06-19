import React from 'react'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from 'react-router-dom'
import Sidebar from 'scenes/global/Sidebar'
import Topbar from 'scenes/global/Topbar'
import { ColorModeContext, useMode } from 'theme'

const Layout = () => {

  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
        <div className='app'>
        <Sidebar />
        <main className='content'>
          <Topbar />
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Layout