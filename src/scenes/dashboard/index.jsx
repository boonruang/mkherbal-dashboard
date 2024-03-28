import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from "../../theme"
import Header from '../../components/Header'
import { mockTransactions } from "../../data/mockData"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import TrafficIcon from "@mui/icons-material/Traffic"
import LineChart from "../../components/LineChart"
import BarChart from "../../components/BarChart"
import GeographyChart from "../../components/GeographyChart"
import PieChart from "../../components/PieChart"
import StatBox from "../../components/StatBox"
import ProgressCircle from "../../components/ProgressCircle"

const Dashbaord = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Box
                display="flex" justifyContent="space-between"
                alignItems="center"
            >
                <Header title="แดชบอร์ด" subtitle="แดชบอร์ดแสดงช้อมูล" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.yellowAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        ดาวน์โหลด รายงาน
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="361"
                        subtitle="จำนวนสมุนไพรในระบบ"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <SummarizeIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="431,225"
                        subtitle="จำนวนผู้ผลิตทั้งหมด"
                        progress="0.5"
                        increase="+21%"
                        icon={
                            <PeopleOutlinedIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="32,441"
                        subtitle="จำนวนเกษตรกรทั้งหมด"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <PeopleOutlinedIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="5,134"
                        subtitle="จำนวนผู้ประกอบการ"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <WarehouseIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px"
                                }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                ผลผลิตเกษตรกร
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box height="250px" mt="-20px">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>

                {/* TRANSACTION */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`2px solid ${colors.primary[500]}`}
                        colors={colors.grey[100]}
                        p="15px"
                    >
                        <Typography
                            color={colors.grey[100]}
                            variant='h5'
                            fontWeight="600"
                        >
                            รายการธุรกรรม
                        </Typography>
                    </Box>
                    {mockTransactions.map((transaction, i) => (
                        <Box
                            key={`${transaction.txId}-${i}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`2px solid ${colors.primary[500]}`}
                            p="15px"
                        >
                            <Box>
                                <Typography
                                    color={colors.greenAccent[500]}
                                    variant='h5'
                                    fontWeight="600"
                                >
                                    {transaction.txId}
                                </Typography>
                                <Typography
                                    color={colors.grey[100]}
                                >
                                    {transaction.user}
                                </Typography>
                            </Box>
                            <Box color={colors.grey[100]}>{transaction.date}</Box>

                            <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                                {transaction.cost}
                            </Box>
                        </Box>
                    ))}
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant='h5' fontWeight="600">
                        กิจกรรมการตลาด
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            50,558,352 การสร้างรายได้
                        </Typography>
                        <Typography>รวมค่าดำเนินการและค่าบริหาร</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant='h5'
                        fontWeight="600"
                        sx={{ p: "30px 30px 0 30px" }}
                    >
                        จำนวนยอดขาย
                    </Typography>
                    <Box
                        height="250px"
                        mt="-25px"
                    >
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography
                        variant='h5'
                        fontWeight="600"
                        sx={{ mb: "15px" }}
                    >
                        ยอดขายตามภูมิศาสตร์
                    </Typography>
                    <Box height="200px" >
                        <GeographyChart isDashboard={true} />
                    </Box>
                </Box>

                {/*  */}
            </Box>
        </Box >
    )
}

export default Dashbaord