import { MAP_TYPES } from '@deck.gl/carto';

const SOIL_MK_SOURCE_ID = 'soilMkSource';

const source = {
  id: SOIL_MK_SOURCE_ID,
  type: MAP_TYPES.TABLE,
  connection: 'carto_dw',
  data: `carto-dw-ac-9o39c4qk.shared.soil_mahasarakham`,
};

export default source;
