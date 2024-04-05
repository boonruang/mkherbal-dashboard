import { Box } from "@mui/material"
import Header from "../../components/Header"
import GeoMapIframe from "components/GeoMapIframe"

const GeoLandMk = () => {

    return <Box m="20px">
        <Header title="ข้อมูลการใช้ที่ดิน" subtitle="การใช้พื้นที่และที่ดิน" />
        <GeoMapIframe
            url="https://thunbergii.app.carto.com/map/40fc77a9-019a-4238-b1c7-07d475863b20"
        />
        </Box>
}

export default GeoLandMk