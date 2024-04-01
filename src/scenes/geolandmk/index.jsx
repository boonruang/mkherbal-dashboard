import { Box, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import Iframe from 'react-iframe'

const GeoSoilMk = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return <Box m="20px">
        <Header title="ข้อมูลการใช้ที่ดิน" subtitle="การใช้พื้นที่และที่ดิน" />
        <Box height="80vh" width="98%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <Iframe url="https://thunbergii.app.carto.com/map/40fc77a9-019a-4238-b1c7-07d475863b20"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>        
        </Box>

    </Box>
}

export default GeoSoilMk