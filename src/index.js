import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './assets/css/index.css';
import './assets/css/dataGrid.css';
import './assets/css/tableGrid.css';
import './assets/css/card-print.css';
import './assets/css/loader.css';
import AppContainer from './components/core/AppContainer';
import store from './store/store';



ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'));

