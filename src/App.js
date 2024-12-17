import { ColorModeContext, useMode } from "./theme"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { Routes,Route, useNavigate } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashbaord from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Philosophers from "./scenes/philosophers";
import Entrepreneurherbals from "./scenes/entrepreneurherbals";
import Entrepreneurthaitraditionalmedicals from "./scenes/entrepreneurthaitraditionalmedicals";
import Farmers from "./scenes/farmers";
import Farmerspending from "./scenes/farmers/Farmerspending";
import Farmersreset from "./scenes/farmers/Farmersreset";
import Farmersreject from "./scenes/farmers/Farmersreject";
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
import Postcode from "scenes/postcode";
import Collaborativefarm from "scenes/collaborativefarms";
import ThankyouReg from 'components/Thankyoupage'
import Registration from 'components/Registration'
import Forgetpassword from 'components/Forgetpassword'
import Login from 'components/Login'
import Loginbackoffice from 'components/Loginbackoffice'
import Logout from 'components/Logout'
import Marketplace from "scenes/marketplace";
import Farmergroup from "scenes/farmergroup";
import HerbalCarousel from "components/HerbalCarousel";
import HerbalAdd from "scenes/herbals/HerbalAdd";
import HerbalEdit from "scenes/herbals/HerbalEdit";
import HerbalDetail from "scenes/herbals/HerbalDetail";
import MarketplaceAdd from "scenes/marketplace/MarketplaceAdd";
import HerbalsList from "scenes/herbals/list";
import Invoices from "scenes/invoices";
import SoilHerbals from "scenes/soillherbals";
import Layout from "components/Layout";
import Unauthorized from "components/Unauthorized";
import SecureRoute from "components/SecureRoute";
import { ROLES } from './constants/index'
import { useEffect } from "react";
import * as loginActions from 'actions/login.action'
// import Users from "scenes/users/index";
import UsersList from "scenes/users/list";
import UsersAdd from "scenes/users/add";
import UsersEdit from "scenes/users/edit";
import FarmerDetail from "scenes/farmers/detail";
import FarmerApproveDetail from "scenes/farmers/Farmerapprovedetail";
import FarmerPasswordResetDetail from "scenes/farmers/Farmerpasswordresetdetail";
import FarmerRejectDetail from "scenes/farmers/Farmerrejectdetail";

function App() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    console.log('App Created')
    dispatch(loginActions.reLogin({navigate}))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ( 
  <Routes>
      <Route path="/admin" element={<Loginbackoffice />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/thankyoureg" element={<ThankyouReg />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/" element={<Layout />}>
      
        <Route element={<SecureRoute allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} /> }>
          <Route path="/" element={<Dashbaord />} />
          <Route path="dashboard" element={<Dashbaord />} />
        </Route>

        <Route element={<SecureRoute allowedRoles={[ROLES.Admin,ROLES.Editor,ROLES.User]} /> }>
          <Route path="team" element={<Team />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="researchers" element={<Researchers />} />
          <Route path="philosophers" element={<Philosophers />} />
          <Route path="entrepreneurherbals" element={<Entrepreneurherbals />} />
          <Route path="entrepreneurthaitraditionalmedicals" element={<Entrepreneurthaitraditionalmedicals />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="farmers/reset" element={<Farmersreset />} />
          <Route path="farmers/reject" element={<Farmersreject />} />
          <Route path="farmers/pending" element={<Farmerspending />} />
          <Route path="farmers/detail" element={<FarmerDetail />} />
          <Route path="farmers/approvedetail" element={<FarmerApproveDetail />} />
          <Route path="farmers/passwordresetdetail" element={<FarmerPasswordResetDetail />} />
          <Route path="farmers/rejectdetail" element={<FarmerRejectDetail />} />
          <Route path="farmergroup" element={<Farmergroup />} />
          <Route path="businessgroup" element={<BusinessGroup />} />
          <Route path="herbals" element={<Herbals />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="users/add" element={<UsersAdd />} />
          <Route path="users/edit/:id" element={<UsersEdit />} />
          <Route path="users/list" element={<UsersList />} />
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
          <Route path="herbals/edit/:id" element={<HerbalEdit />} />
          <Route path="herbals/detail/:id" element={<HerbalDetail />} />
          <Route path="herbals/list" element={<HerbalsList />} />
          {/* <Route path="invoices" element={<Invoices />} /> */}
          <Route path="soilherbals" element={<SoilHerbals />} />
          <Route path="form" element={<Form />} />
          <Route path="collaborativefarm" element={<Collaborativefarm />} />
        </Route>
        <Route element={<SecureRoute allowedRoles={[ROLES.Admin]} /> }>
         {/* Admin here */}
        </Route>
      </Route>
  </Routes>

  )
}

export default App;
