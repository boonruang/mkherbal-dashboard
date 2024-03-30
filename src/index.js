import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configAppStore from './store/store' 
import { initialState } from './store/initialStateSlice';
import { createCartoSlice } from '@carto/react-redux';
import { setDefaultCredentials } from '@deck.gl/carto';

const store = configAppStore();

store.reducerManager.add('carto', createCartoSlice(initialState));

setDefaultCredentials({ ...initialState.credentials })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
