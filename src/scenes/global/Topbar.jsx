import { Box, IconButton, useTheme } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../../theme"
import InputBase from "@mui/material/InputBase"
import LightModeOutlined from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlined from "@mui/icons-material/SettingsOutlined"
import PersonOutlined from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { useSelector } from "react-redux"

const Topbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

  const sidebarState = useSelector((state) => state.app.appReducer)
  console.log('sidebarState', sidebarState)    

    // return (<Box display="flex" justifyContent="space-between" p={2}>
    return ( sidebarState.sidebar && (<Box display="flex" justifyContent="end" p={2} pb={0}>
        {/* SEARCH BAR */}
        {/* <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="ค้นหา" />
            <IconButton type="button" sx={{ p: 1 }} >
                <SearchIcon />
            </IconButton>
        </Box> */}

        {/* ICONS */}
        <Box display="flex">
            {/* <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlined />
                ) : (
                    <LightModeOutlined />
                )}
            </IconButton> */}
            {/* <IconButton>
                <NotificationsOutlined />
            </IconButton> */}
            <IconButton>
                <SettingsOutlined />
            </IconButton>
            <IconButton>
                <PersonOutlined />
            </IconButton>
        </Box>
    </Box>)
    )
}

export default Topbar