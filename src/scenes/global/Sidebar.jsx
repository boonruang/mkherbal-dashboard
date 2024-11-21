import { useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from "react-router-dom"
import "react-pro-sidebar/dist/css/styles.css"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import ParkIcon from '@mui/icons-material/Park';
import LandslideIcon from '@mui/icons-material/Landslide';
import LanguageIcon from '@mui/icons-material/Language';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StoreIcon from '@mui/icons-material/Store';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/More';
import ForestIcon from '@mui/icons-material/Forest';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import AddIcon from '@mui/icons-material/Add';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GrassIcon from '@mui/icons-material/Grass';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useDispatch } from 'react-redux';
import { showSidebar } from '../../actions/app.action'
import { useSelector } from 'react-redux'
import { ROLES } from '../../constants'
// import SecureMenu from 'components/SecureMenu'

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>

    )
}

const CollapsedIcon = () => {
    return (
        <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        ml="28px"
        >
            <RadioButtonUncheckedIcon />
        </Box>        
    )
}

const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    // const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")

    const dispatch = useDispatch()

    // dispatch(showSidebar(!isCollapsed))   
    
    const { result } = useSelector((state) => state.app.loginReducer)

    const { isSidebar } = useSelector((state) => state.app.appReducer)

    console.log('isSidebar in Sidebar',isSidebar)  
    // console.log('isCollapsed',isCollapsed)  

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[600]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                    // color: `${colors.blueAccent[600]} !important`
                },
                "& .pro-inner-item:hover": {
                    color: "#71884c !important"
                },
                "& .pro-menu-item": {
                    color: `${colors.grey[700]} !important`
                },                
                "& .pro-menu-item.active": {
                    color: "#71910c !important"
                },
                "& .pro-sub-menu": {
                    color: `${colors.greenAccent[600]} !important`
                },
                // "& .pro-sub-menu": {
                //     color: `${colors.primary[700]} !important`
                // }
                // "& .pro-inner-list-item": {
                //     marginLeft: "15px"
                // },               
                // "& .pro-inner-list-item": {
                //     color: `${colors.greenAccent[600]} !important`
                // },               
                // "& .pro-sidebar": {
                //     position: 'fixed',
                // }              
            }}
        >
            <ProSidebar collapsed={!isSidebar} >
                <Menu iconShape='square'>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => {dispatch(showSidebar(!isSidebar)) }}
                        icon={!isSidebar ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.blueAccent[700]
                        }}
                    >
                        {isSidebar && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant='h3' color={colors.grey[100]}>
                                    {/* ADMINIS */}
                                </Typography>
                                <IconButton onClick={() => dispatch(showSidebar(!isSidebar))}>
                                    <MenuOutlinedIcon 
                                        style={{
                                            color: colors.grey[800]
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {isSidebar && (
                        <Box mb="25px">
                            <Box textAlign={"center"}>
                                <Typography
                                    // variant='h4' color={colors.blueAccent[600]}
                                    variant='h4' color={colors.greenAccent[500]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    ระบบฐานข้อมูลสมุนไพร
                                </Typography>
                                {/* <Typography
                                    variant='h5' color={colors.greenAccent[500]}
                                >มหาวิทยาลัยมหาสารคาม</Typography> */}
                            </Box>
                        </Box>
                    )}


                    {/* MENU ITEMS */}
                    <Box paddingLeft={!isSidebar ? undefined : '10%'}>
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="แดชบอร์ด"
                                to="/dashboard"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined
                         }
                        <SubMenu title="สมุนไพร" icon={<GrassIcon />}>
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="ข้อมูลสมุนไพร"
                                to="/herbals"
                                icon={<ParkIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }    
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="ตารางข้อมูล"
                                to="/herbals/list"
                                icon={<DehazeIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }                                                  
                        {/* { result?.roles?.find((role) => [ROLES.Editor].includes(role))
                           ? <Item
                                title="เพิ่มสมุนไพร"
                                to="/herbals/add"
                                icon={<AddIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }     */}
                        </SubMenu>    

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor].includes(role))
                           ? <SubMenu title="จัดการผู้ใช้" icon={<PeopleOutlinedIcon />}>

                            <Item
                                title="ข้อมูลผู้ใช้"
                                to="/users/list"
                                icon={<PersonIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />


                         </SubMenu>   : undefined  }                               

                        <SubMenu title="เกษตรกร" icon={<AgricultureIcon />}>
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="เกษตรกร"
                                to="/farmers"
                                icon={<PersonIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }  
                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                           ? <Item
                                title="เกษตรกรรออนุมัติ"
                                to="/farmers/pending"
                                icon={<PersonIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }  
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="กลุ่มเกษตรกร"
                                to="/farmergroup"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }                                                      
{/* 
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="แสดงข้อมูลเกษตรกร"
                                to="/pie"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }                                                       */}

                         </SubMenu>                      

                        {/* {isSidebar ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant='h6'
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    ผู้ประกอบการสมุนไพร
                                </Typography>  
                            </Box>
                        ) :  <CollapsedIcon /> }  
                                                                       */}                                                                       
                    <SubMenu title="ธุรกิจการค้า" icon={<MiscellaneousServicesIcon />}>
                    { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="รายการบริษัท/ธุรกิจ"
                                to="/businessgroup"
                                icon={<WarehouseIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  } 

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="แหล่งแปรรูปขั้นต้น"
                                to="/businessgroup"
                                icon={<HomeWorkIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  } 

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="แหล่งขายตามพิกัด"
                                to="/marketplace"
                                icon={<StoreIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  } 

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="ผลิตภัณฑ์สมุนไพร"
                                to="/herbals"
                                icon={<HealthAndSafetyIcon  />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }                                                                                                         
                          
                    </SubMenu>                                                                       
                        {/* <Item
                            title="การแพทย์แผนไทย"
                            to="/businessgroup"
                            icon={<LocalHospitalIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />       */}

                        {/* {isSidebar ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant='h6'
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    แหล่งแปรรูป
                                </Typography>  
                            </Box>
                        ) :  <CollapsedIcon /> }                                                                                       */}
                         
                        {/* {isSidebar ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant='h6'
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    แหล่งการตลาด
                                </Typography>  
                            </Box>
                        ) :  <CollapsedIcon /> }                                                                                             */}

                        {/* {isSidebar ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant='h6'
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    องค์ความรู้
                                </Typography>  
                            </Box>
                        ) :  <CollapsedIcon /> }      */}
                        <SubMenu title="องค์ความรู้" icon={<WbIncandescentIcon />}>

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="งานวิจัยและนวัตกรรม"
                                to="/herbals"
                                icon={<LibraryBooksIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }  

                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                                title="ศาสตร์การแพทย์ฯ"
                                to="/farmers"
                                icon={<MenuBookIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            /> : undefined  }  

                        </SubMenu>                                                                
   
                        {/* {isSidebar ? (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant='h6'
                                    color={colors.grey[300]}
                                    sx={{ m: "15px 0 5px 20px" }}
                                >
                                    ข้อมูลดิน
                                </Typography>  
                            </Box>
                        ) :  <CollapsedIcon /> }   */}

                        <SubMenu title="ข้อมูลดิน" icon={<FmdBadIcon />}>

                        {/* { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                                ? <Item
                                    title="การใช้ดิน ต.แก่งเลิงจาน"
                                    to="/geoland"
                                    icon={<LandslideIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> : undefined  } 

                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                                ? <Item
                                    title="ข้อมูลคราบเกลือ"
                                    to="/geosalt"
                                    icon={<MoreIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                                /> : undefined  }  

                        { result?.roles?.find((role) => [ROLES.Admin].includes(role))
                                ? <Item
                                    title="ข้อมูลดิน จ.มหาสารคาม"
                                    to="/geosoil"
                                    icon={<LanguageIcon />}
                                    selected={selected}
                                    setSelected={setSelected}
                            /> : undefined  }  */}
                                
                               
                        { result?.roles?.find((role) => [ROLES.Admin,ROLES.Editor,ROLES.User].includes(role))
                           ? <Item
                           title="ข้อมูลดินและสมุนไพร"
                           to="/soilherbals"
                           icon={<ParkIcon />}
                           selected={selected}
                           setSelected={setSelected}
                            /> : undefined  }                                  
                                                
                        </SubMenu>                                                              
     
                        {/* <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            รายงาน
                        </Typography>
                        <Item
                            title="แผนภูมิแท่ง"
                            to="/bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="แผนภูมิวงกลม"
                            to="/pie"
                            icon={<PieChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="ผลผลิดสุมนไพร"
                            to="/line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                                                                                                                                 */}
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar