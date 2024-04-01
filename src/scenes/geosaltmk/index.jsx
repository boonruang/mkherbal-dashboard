import { Box, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
import Iframe from 'react-iframe'

const GeoSaltMk = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return <Box m="20px">
        <Header title="ข้อมูลคราบเกลือ" subtitle="ข้อมูลปริมาณคราบเกลือ" />
        <Box height="80vh" width="98%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <Iframe url="https://thunbergii.app.carto.com/map/41262f60-ff79-47a5-88c2-e1b26f2034fd"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>        
        </Box>

    </Box>
}

export default GeoSaltMk