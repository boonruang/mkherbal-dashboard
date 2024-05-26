import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHerbalByKeyword } from '../actions/herbal.action'
import { Box,Typography,useTheme,CardActionArea,Grid  } from "@mui/material"
import { tokens } from '../theme';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { getHerbalById } from '../actions/herbal.action'

const imagesUrl = process.env.REACT_APP_IMAGES_URL

const Item = ({ result }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  const handleClick = (selectedHerbal) => {
    console.log('selectedHerbal',selectedHerbal)
    // dispatch(setStateFarmergroupToSelected(selectedHerbal))
    dispatch(getHerbalById(selectedHerbal.id))
  }

  return (
    <Grid item xs={12} sm={4} ms={4} >
        <Card sx={{ maxWidth: 500 , backgroundColor : colors.primary[400]}} style={{ marginBottom: "20px"}}>
          <CardActionArea onClick={() => handleClick(result)}>
            <CardMedia
              component="img"
              height="220"
              image={imagesUrl+result.cover}
              alt="herbal"
              style={{borderRadius: '5px'}}
            />            
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
                {result.herbalname.substring(0, 100)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {result.commonname.substring(0, 100)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {result.scientificname.substring(0, 100)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {result.akaname.substring(0, 100)}
                </Typography>
                {/* <Typography gutterBottom variant="h6" component="div">
                  More
                </Typography> */}
              </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
        )
      }

const HerbalList = ({searchTerm}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHerbalByKeyword(searchTerm))
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.herbalReducer)
  
  let content
  if (isFetching) content = <Box>Loading...</Box>
  else if (isError) content = <Box>Something went wrong..</Box>
  else if (result ) {
    // const results = result?.features
    content = (
      <Grid container spacing={5} style={{ marginTop: "20px"}}>
          {
            Object.values(result).map(result => {
              return <Item key={result.id} result={result} />
            })
          }
      </Grid>  
    )
  } else {
    content = (
      <Box>
        อุ้ย หาไม่เจออ่ะ
      </Box>      
    )
  } 
  return content
}
export default HerbalList