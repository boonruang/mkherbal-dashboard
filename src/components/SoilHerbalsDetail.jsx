import { useEffect,useState } from "react";
// import useSWR from "swr";
// import Item from './Item'
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography,IconButton,useTheme  } from "@mui/material"
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';
import { tokens } from '../theme';
import PlaceIcon from '@mui/icons-material/Place';

import { styled as mStyled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Place from '@mui/icons-material/Place';
import ParkIcon from '@mui/icons-material/Park';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ProgressCircle from "./ProgressCircle";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StatBox from "./StatBox";
import StatHerbalBox from "./StatHerbalBox";

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const ExpandMore = mStyled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const CardDetail = ({ selectedResult}) => {
  console.log('CardDetail is called ',selectedResult)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card sx={{ maxWidth: 345, backgroundColor : colors.primary[400] }}>
      <CardMedia
        sx={{ height: 180 }}
        image= { imagesUrl + selectedResult.cover}
        title="Farmer Group"
      />
      <CardContent sx={{ p: "10px 10px", mt: "2px"}}>
        <Box sx={{ pt: "10px" }}>
        <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
        {selectedResult.herbalname}
        </Typography>
        {/* <Divider sx={{ mb: 1}}/> */}
        {/* <Typography variant="body2" color="text.secondary">
          <Box display="flex" flexDirection="column" justifyContent="center" >
            <Box>{selectedResult.commonname}</Box>
            <Box>{selectedResult.scientificname}</Box>
            <Box>{selectedResult.skaname}</Box>
          </Box>          
        </Typography>
        <Divider sx={{ mt: 1}}/>
        <br/>
        <Typography gutterBottom variant="h6" component="div" color={colors.greenAccent[400]}>
          แหล่งดินที่เหมาะสมในการปลูก   
        </Typography>        
        <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">ความสมบูรณ์ของดิน</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="soil" control={<Radio />} label="แหล่งดิน" />
                <FormControlLabel value="salt" control={<Radio />} label="แหล่งเกลือ" />
              </RadioGroup>
          </FormControl> */}
          <Typography variant="h6" m="10px 0px" color={colors.greenAccent[400]}>
              ความต้องการทรัพยากร
          </Typography>  
         {/* GRID & CHARTS */}
         <Box
                display="grid"
                gridTemplateRows="repeat(3, 1fr)"
                gridAutoRows="140px"
                gap="10px"
            >         
          <Box
                    gridColumn="span 3"
                    // backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >

                    <StatHerbalBox
                        title="55"
                        subtitle="ความอุดมสมบูรณ์"
                        increase="14%"
                        progress="0.75"
                        icon={
                            <ParkIcon
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
                    // backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatHerbalBox
                        title="27"
                        subtitle="ความเป็นกรดเป็นด่าง"
                        progress="0.30"
                        increase="5%"
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
                    // backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatHerbalBox
                        title="134"
                        subtitle="ความเค็ม"
                        progress="0.80"
                        increase="43%"
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
            </Box>
            <Box sx={{mt:"10px"}}>
              <Typography gutterBottom variant="h6" component="div" color={colors.greenAccent[400]}>
                แหล่งดินที่เหมาะสมในการปลูก   
              </Typography>        
              <FormControl>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">ความสมบูรณ์ของดิน</FormLabel> */}
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="soil" control={<Radio />} label="แหล่งดิน" />
                      <FormControlLabel value="salt" control={<Radio />} label="แหล่งเกลือ" />
                    </RadioGroup>
                </FormControl>   
              </Box>          
          </Box>                                        
      </CardContent>
    </Card>    
  )
}


const SoilHerbalsDetail = ({props}) => {
  // const dispatch = useDispatch()

  const StyledDetailDisplay = styled.div`
  /* display: none; */
  position: absolute;
  z-index: 100;
  top: 35px;
  left: 302px;
  /* background-color: ${theme.sidePanelBg}; */
  font-size: 11px;
  width: 370px;
  color: ${theme.textColor};
  word-wrap: break-word;
  /* height: 99%; */
  min-height: 60px;
  max-height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 10px;
  `;

  const { selectedResult, isSelectedFetching , isSelectedError } = useSelector((state) => state.app.herbalReducer)

  if (selectedResult) {
    console.log('see selectedResult',selectedResult)
  }
  
  let content
  if (isSelectedFetching) content = <Box>Loading...</Box>
  else if (isSelectedError) content = <Box>Something went wrong..</Box>
  else if (selectedResult) {
  content = (
      <StyledDetailDisplay>
          {/* <CardDetail selectedResult={selectedResult} /> */}
          <CardDetail selectedResult={selectedResult} />
      </StyledDetailDisplay>  
    )
  } else {
    content = (
      <StyledDetailDisplay>
        อุ้ย หาไม่เจออ่ะ
      </StyledDetailDisplay>      
    )
  } 
  return content
}
export default SoilHerbalsDetail