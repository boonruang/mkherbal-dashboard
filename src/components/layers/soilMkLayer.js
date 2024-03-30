import { useSelector } from 'react-redux';
import { CartoLayer, colorCategories } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
// import htmlForFeature from 'utils/htmlForFeature';

export const SOIL_LAYER_ID = 'soilMkLayer';

export default function SoilMkLayer() {
  const { soilMkLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, soilMkLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (soilMkLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SOIL_LAYER_ID,
      getFillColor: colorCategories({
        attr: 'soilserien',
        domain: [
          'มหาสารคาม',
          'อุบล',
          'บ้านไผ่',
          'หน่วยดินเชิงซ้อน',
          'ร้อยเอ็ด',
          'โนนแดง',
          'พระทองคำ',
          'สีทน',
          'คง',
          'หนองบุญนาก',
          'กุลาร้องไห้',
          'กันทรวิชัย',
          'ชุมพลบุรี',
          'พื้นที่น้ำ',
          'ทุ่งสัมฤทธิ์',
          'นาดูน',
          'ท่าตูม',
          'วาริน',
        ],
        colors: 'Bold',
      }),
      pointRadiusMinPixels: 2,
      getLineColor: [0, 0, 0],
      // lineWidthMinPixels: 1,
      pickable: true,
      // onHover: (info) => {
      //   if (info?.object) {
      //     info.object = {
      //       html: htmlForFeature({ feature: info.object }),
      //       style: {},
      //     };
      //   }
      // },
    });
  }
}
