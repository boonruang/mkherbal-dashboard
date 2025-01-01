import { Box } from "@mui/material"
import Header from "../../components/Header"
import GeoMapIframe from "components/GeoMapIframe"

const Disasterforcast = () => {

    return <Box m="20px">
        <Header title="คาดการณ์ภัยพิบัติ" subtitle="ข้อมูลน้ำท่วม-ภัยแล้ง" />
        <GeoMapIframe
            url="https://www.arda365days.com/mekongwatershed/?spi"
        />
        </Box>
}

export default Disasterforcast