import { Box } from "@mui/material"
import Header from "../../components/Header"
import GeoMapIframe from "components/GeoMapIframe"

const GeoSaltMk = () => {

    return <Box m="20px">
        <Header title="ข้อมูลคราบเกลือ" subtitle="ข้อมูลปริมาณคราบเกลือ" />
        <GeoMapIframe
            url="https://thunbergii.app.carto.com/map/41262f60-ff79-47a5-88c2-e1b26f2034fd"
        />
        </Box>
}

export default GeoSaltMk