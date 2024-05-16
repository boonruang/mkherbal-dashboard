import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
// import { Routes,Route } from "react-router-dom";
import { BrowserRouter,Switch,Routes,Route } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashbaord from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Farmers from "./scenes/farmers";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Herbals from "./scenes/herbals";
import Researchers from "./scenes/researchers";
import FarmerGroup from "scenes/farmergroup";
import BusinessGroup from "scenes/businessgroup";
import Geomap from "scenes/geomap";
import GeoGmaps from "scenes/geogmaps";
import GeoLand from "scenes/geoland";
import GeoSoil from "scenes/geosoil";
import GeoSalt from "scenes/geosalt";
import Login from 'components/Login'
import Marketplace from "scenes/marketplace";
import Farmergroup from "scenes/farmergroup";
import HerbalCarousel from "components/HerbalCarousel";
// import GeoLandMk from "scenes/geolandmk";
// import GeoSaltMk from "scenes/geosaltmk";

function App() {
  const [theme, colorMode] = useMode()

  // const sidebarState = useSelector((state) => state.app.appReducer)
  // console.log('sidebarState', sidebarState)

  return ( 
    <BrowserRouter>
    {/* <Routes>
      <Route path="/" element={<Login />} />
    </Routes> */}
     <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <div className="app">
              <Sidebar />
              <main className='content' >
                <Topbar /> 
                <Routes>
                    <Route path="/" element={<Dashbaord />} />
                    <Route path="/dashboard" element={<Dashbaord />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/researchers" element={<Researchers />} />
                    <Route path="/farmers" element={<Farmers />} />
                    <Route path="/farmergroup" element={<Farmergroup />} />
                    <Route path="/businessgroup" element={<BusinessGroup />} />
                    <Route path="/herbals" element={<Herbals />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/geomap" element={<Geomap />} />
                    {/* <Route path="/geogmaps" element={<GeoGmaps />} /> */}
                    <Route path="/geoland" element={<GeoLand />} />
                    <Route path="/geosoil" element={<GeoSoil />} />
                    <Route path="/geosalt" element={<GeoSalt />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/herbalcarousel" element={<HerbalCarousel />} />
                </Routes>
              </main>
            </div> 
          </ThemeProvider>
        </ColorModeContext.Provider>
      </BrowserRouter>
  )
}

export default App;
