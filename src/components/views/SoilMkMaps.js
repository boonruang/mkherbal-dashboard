import { useEffect } from 'react';
import soilMkSource from 'data/sources/soilMkSource';
import { SOIL_LAYER_ID } from 'components/layers/soilMkLayer'
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';
import { AggregationTypes } from '@carto/react-core';
import {
  CategoryWidget,
  PieWidget
} from '@carto/react-widgets'
import { Grid } from '@mui/material'

export default function SoilMkMaps() {
  const dispath = useDispatch();

  useEffect(() => {
    dispath(addSource(soilMkSource));

    dispath(
      addLayer({
        id: SOIL_LAYER_ID,
        source: soilMkSource.id,
      })
    )
      return () => {
        dispath(removeLayer(SOIL_LAYER_ID));
        dispath(removeSource(soilMkSource.id))
      }

  },[dispath])

  const noFormatter = (value) => ``;
  const customFormatter = (value) => `${value}`;

  return (
    <Grid container direction='column'>
      {/* <Grid item>Hello World</Grid> */}
      <Grid item>
        <div>
          <CategoryWidget
            id='soil'
            title='อำเภอ'
            dataSource={soilMkSource.id}
            column='amphoe_t'
            operation={AggregationTypes.COUNT}
            // formatter={currencyFormatter}
            formatter={noFormatter}
          />
        </div> 
      </Grid>
    </Grid>    
  )
}