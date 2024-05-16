import React from 'react';
import { useTheme } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { tokens } from '../theme';

export const HerbalCard = ({item}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Card key={item.id} sx={{ maxWidth: 300 , backgroundColor : colors.primary[400] }}>
      <CardMedia
        sx={{ height: 200}}
        image={"./images/"+item.cover}
        title={item.herbalname.substring(0, 40)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={colors.greenAccent[400]}>
        {item.herbalname.substring(0, 40)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {item.commonname.substring(0, 49)}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Learn More
        </Typography>
      </CardContent>
    </Card>    
  )
}

