import { Box, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import Iframe from 'react-iframe'

const GeoGmaps = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return <Box m="20px">
        <Header title="ข้อมูลแผนที่" subtitle="พิกัดตำแหน่ง" />
        <Box height="80vh" width="98%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <Iframe url="https://thunbergii.app.carto.com/map/38143baa-eb58-4998-99bb-1ed8ecfd31c0"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>        
        </Box>

    </Box>
}

export default GeoGmaps