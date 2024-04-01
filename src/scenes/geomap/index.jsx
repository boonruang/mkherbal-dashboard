import { Box, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import Header from "../../components/Header"
// import GeographyChart from "../../components/GeographyChart"

const Geomap = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return <Box m="20px">
        <Header title="ข้อมูลแผนที่" subtitle="พิกัดตำแหน่ง" />
        <Box component="img" height="80vh" width="98%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px" 
        alt="sample geo map"
        src="https://www.vpano360.com/geomap1.jpg"        
        />
    </Box>
}

export default Geomap