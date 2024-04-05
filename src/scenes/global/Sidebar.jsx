import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from "react-router-dom"
import "react-pro-sidebar/dist/css/styles.css"
import { tokens } from "../../theme"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
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

const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#71884c !important"
                },
                "& .pro-menu-item.active": {
                    color: "#71910c !important"
                }
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape='square'>
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant='h3' color={colors.grey[100]}>
                                    {/* ADMINIS */}
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box textAlign={"center"}>
                                <Typography
                                    variant='h4' color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    ระบบฐานข้อมูลสมุนไพร
                                </Typography>
                                <Typography
                                    variant='h5' color={colors.greenAccent[500]}
                                >มหาวิทยาลัยมหาสารคาม</Typography>
                            </Box>
                        </Box>
                    )}


                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                        <Item
                            title="แดชบอร์ด"
                            to="/dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            แหล่งข้อมูล
                        </Typography>
                        <Item
                            title="รายการสมุนไพร"
                            to="/herbals"
                            icon={<ParkIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                          
                        <Item
                            title="รายการเกษตรกร"
                            to="/farmers"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />       
                        <Item
                            title="รายการกลุ่มเกษตรกร"
                            to="/farmergroup"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />   
                        <Item
                            title="รายการบริษัท/ธุรกิจ"
                            to="/businessgroup"
                            icon={<WarehouseIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                         
                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            ผู้ประกอบการสมุนไพร
                        </Typography>                                             
                        <Item
                            title="ด้านการแพทย์แผนไทย"
                            to="/businessgroup"
                            icon={<LocalHospitalIcon/>}
                            selected={selected}
                            setSelected={setSelected}
                        />      
                        <Item
                            title="ผลิตภัณฑ์สมุนไพร"
                            to="/geogmaps"
                            icon={<HealthAndSafetyIcon  />}
                            selected={selected}
                            setSelected={setSelected}
                        />                                                                
                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            แหล่งแปรรูป
                        </Typography>                                             
                        <Item
                            title="แหล่งแปรรูปขั้นต้น"
                            to="/businessgroup"
                            icon={<HomeWorkIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                           
                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            แหล่งการตลาด
                        </Typography>                                             
                        <Item
                            title="แหล่งขายตามพิกัด"
                            to="/businessgroup"
                            icon={<StoreIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                        
                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            องค์ความรู้
                        </Typography>
                        <Item
                            title="งานวิจัยและนวัตกรรม"
                            to="/herbals"
                            icon={<LibraryBooksIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                          
                        <Item
                            title="ศาสตร์การแพทย์ฯ"
                            to="/farmers"
                            icon={<MenuBookIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />                                    
                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            ข้อมูลดิน
                        </Typography>       
                        <Item
                            title="จ.มหาสารคาม"
                            // to="https://thunbergii.app.carto.com/map/f212e308-4c6d-4bb4-9129-eae86f1d4bee"
                            to="/geosoilmk"
                            icon={<LandslideIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="การใช้ที่ดิน"
                            // to="https://thunbergii.app.carto.com/map/40fc77a9-019a-4238-b1c7-07d475863b20"
                            to="/geolandmk"
                            icon={<LanguageIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />     
                        <Item
                            title="ข้อมูลคราบเกลือ"
                            // to="https://thunbergii.app.carto.com/map/41262f60-ff79-47a5-88c2-e1b26f2034fd"
                            to="/geosaltmk"
                            icon={<MoreIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />     
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