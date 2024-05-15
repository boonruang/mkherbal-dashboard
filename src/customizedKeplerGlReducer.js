import keplerGlReducer, { uiStateUpdaters, visStateUpdaters,mapStateUpdaters  } from "@kepler.gl/reducers";
import {ActionTypes} from '@kepler.gl/actions';

export const customizedKeplerGlReducer = keplerGlReducer
.initialState({
  uiState: {
       activeSidePanel: null,  
       currentModal: null,      
       readOnly: true,    
       mapControls: {
         ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
         mapLegend: {
           show: true,
           active: true
         },        
     }
   },
   visState: {
    maxDefaultTooltips:10
   }
 })
 .plugin({
   HIDE_AND_SHOW_MAP_LEGEND: (state, action) => ({
     ...state,
     uiState: {
       ...state.uiState,
       mapControls: {
         ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
         mapLegend: {        
             show: false
         }
       }
     }
   })
 })  
 .plugin({
   HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
     ...state,
     uiState: {
       ...state.uiState,
       readOnly: !state.uiState.readOnly
     }
   })
 })
 .plugin({
   UPDATE_VIS_STATE: (state, action) => ({
     ...state,
       mapStyle: {
         ...state.mapStyle,
         styleType: action.payload,
       },
       visState: visStateUpdaters.updateVisDataUpdater(state.visState,{})     
   })
 })  
 .plugin({
   SET_MAP_PERSPECTIVE: (state, action) => ({
     ...state,
     mapState: mapStateUpdaters.togglePerspectiveUpdater(state.mapState) 
   })
 }) 
//  .plugin({
// // for listening updateMap action
//   [ActionTypes.UPDATE_MAP]: (state, action) => ({
//     ...state,
//     viewport: action.payload 
//   })
// })  