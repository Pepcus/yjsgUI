import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

// eslint-disable-next-line import/no-extraneous-dependencies
import { generateTheme } from 'ravenjs/utils/theme';

import './assets/css/index.css';
import './assets/css/dataGrid.css';
import './assets/css/tableGrid.css';
import './assets/css/card-print.css';
import './assets/css/loader.css';
import AppContainer from './components/core/AppContainer';
import store from './store/store';
import APP_THEME from './constants/theme';


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={generateTheme(APP_THEME)}>
      <AppContainer />
    </ThemeProvider>
  </Provider>, document.getElementById('root'));

