
import { Box } from "@mui/material"
import Header from "components/Header"
import GeoMapIframe from "components/GeoMapIframe"


const GeoSoilMk = () => {
    return <Box m="20px">
        <Header title="ข้อมูลกลุ่มดิน" subtitle="ข้อมูลกลุ่มดินและคุณสมบัติของดิน" />
        <GeoMapIframe
            url="https://thunbergii.app.carto.com/map/f212e308-4c6d-4bb4-9129-eae86f1d4bee"
        />
    </Box>
}

export default GeoSoilMk

// import { Box, useTheme } from "@mui/material"
// import { tokens } from "../../theme"
// import Header from "../../components/Header"
// import Iframe from 'react-iframe'

// const GeoSoilMk = () => {
//     const theme = useTheme()
//     const colors = tokens(theme.palette.mode)

//     return <Box m="20px">
//         <Header title="ข้อมูลกลุ่มดิน" subtitle="ข้อมูลกลุ่มดินและคุณสมบัติของดิน" />
//         <Box height="80vh" width="98%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
//         <Iframe url="https://thunbergii.app.carto.com/map/f212e308-4c6d-4bb4-9129-eae86f1d4bee"
//         width="100%"
//         height="100%"
//         id=""
//         className=""
//         display="block"
//         position="relative"/>        
//         </Box>

//     </Box>

// // Backup link from vpano360 account just in case scubatoy expired
// // https://thunbergii.app.carto.com/map/2c3570ed-bd49-4386-8dfe-11cb9a4cfc30
// }

// export default GeoSoilMk