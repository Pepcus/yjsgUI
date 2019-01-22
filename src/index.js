import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import './dataGrid.css';
import './tableGrid.css';
import './card-print.css';
import AppContainer from './components/coreComponents/AppContainer';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'));
