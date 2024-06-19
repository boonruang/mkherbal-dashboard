import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom';
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
import HerbalAdd from "scenes/herbals/HerbalAdd";
import MarketplaceAdd from "scenes/marketplace/MarketplaceAdd";
import HerbalsList from "scenes/herbals/list";
import Invoices from "scenes/invoices";
import SoilHerbals from "scenes/soillherbals";
import Layout from "components/Layout";
import Unauthorized from "components/Unauthorized";
import RequireAuth from "components/RequireAuth";
import { ROLES } from './constants/index'
import { useEffect } from "react";
import * as loginActions from 'actions/login.action'

function App() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('App Created')
    dispatch(loginActions.reLogin({navigate}))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
  <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<Layout />}>
      
        <Route element={<RequireAuth allowedRoles={[ROLES.User,ROLES.Editor]} /> }>
          <Route path="/" element={<Dashbaord />} />
          <Route path="dashboard" element={<Dashbaord />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} /> }>
          <Route path="team" element={<Team />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="researchers" element={<Researchers />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="farmergroup" element={<Farmergroup />} />
          <Route path="businessgroup" element={<BusinessGroup />} />
          <Route path="herbals" element={<Herbals />} />
          <Route path="form" element={<Form />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="geography" element={<Geography />} />
          <Route path="geomap" element={<Geomap />} />
          <Route path="geoland" element={<GeoLand />} />
          <Route path="geosoil" element={<GeoSoil />} />
          <Route path="geosalt" element={<GeoSalt />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/add" element={<MarketplaceAdd />} />
          <Route path="herbalcarousel" element={<HerbalCarousel />} />
          <Route path="herbals/add" element={<HerbalAdd />} />
          <Route path="herbals/list" element={<HerbalsList />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="soilherbals" element={<SoilHerbals />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} /> }>
         {/* Admin here */}
        </Route>
      </Route>
  </Routes>

  )
}

export default App;
