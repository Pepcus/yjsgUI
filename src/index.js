/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'assets/css/index.css';
import 'assets/css/dataGrid.css';
import 'assets/css/tableGrid.css';
import 'assets/css/card-print.css';
import 'assets/css/loader.css';
import store from 'store/store';
import EventManagement from 'components/core/EventManagement';

ReactDOM.render(
  <Provider store={store}>
    <EventManagement />
  </Provider>, document.getElementById('root'));
