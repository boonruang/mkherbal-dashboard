import { Box, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import Iframe from 'react-iframe'

const GeoLandMk = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return <Box m="20px">
        <Header title="ข้อมูลกลุ่มดิน" subtitle="ข้อมูลกลุ่มดินและคุณสมบัติของดิน" />
        <Box height="80vh" width="98%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <Iframe url="https://thunbergii.app.carto.com/map/f212e308-4c6d-4bb4-9129-eae86f1d4bee"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>        
        </Box>

    </Box>
}

export default GeoLandMk