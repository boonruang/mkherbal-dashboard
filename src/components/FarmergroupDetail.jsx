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

const StyledDetailDisplay = styled.div`
position: absolute;
z-index: 100;
top: 40px;
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
        sx={{ height: 180, borderRadius: 2 }}
        image= { selectedResult.Id % 2 === 0 ? "./images/hero.jpg" : "./images/image1.jpg"}
        title="Farmer Group"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
        {/* Mueang Khon Kaen */}
        {selectedResult.farmergroupname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Box display="flex" flexDirection="column" justifyContent="center" >
            <Box>{selectedResult.address} {selectedResult.tambon} {selectedResult.amphoe}</Box>
            <Box>{selectedResult.province} {selectedResult.postcode}</Box>
          </Box>          
        </Typography>
      </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <IconButton aria-label="park lover">
          <ParkIcon />
        </IconButton>
        <IconButton aria-label="add to place">
          <Place />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ m: 1, ml: 2}}>
          <Box display="flex" borderRadius="3px" alignItems="center" >
            <IconButton sx={{ p: 1 }} >
                    <ParkIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 1}}>
            {selectedResult.tambon}
            </Typography>            
          </Box>

          <Box display="flex" borderRadius="3px" alignItems="center" >
            <IconButton sx={{ p: 1 }} >
                    <PlaceIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 1}}>
            {selectedResult.amphoe}
            </Typography>            
          </Box>          

          <Box display="flex" borderRadius="3px" alignItems="center" >
            <IconButton sx={{ p: 1 }} >
                    <FavoriteIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 1}}>
            {selectedResult.province}
            </Typography>            
          </Box>  

          <Box display="flex" borderRadius="3px" alignItems="center" >
            <IconButton sx={{ p: 1 }} >
                    <ShareIcon />
            </IconButton>
            <Typography variant="h5" sx={{ ml: 1}}>
            Share
            </Typography>            
          </Box>  

        </Box>
      </Collapse>
    </Card>    
  )
}


const FarmergroupDetail = ({props}) => {
  // const dispatch = useDispatch()

  const { selectedResult, isFetching, isError } = useSelector((state) => state.app.farmergroupReducer)
  if (selectedResult) {
    console.log('see selectedResult',selectedResult)
  }
  
  let content
  if (isFetching) content = <Box>Loading...</Box>
  else if (isError) content = <Box>Something went wrong..</Box>
  else if (selectedResult) {
  content = (
      <StyledDetailDisplay>
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
export default FarmergroupDetail