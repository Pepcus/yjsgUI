/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { generateTheme } from 'ravenjs/utils/theme';

import './assets/css/index.css';
import './assets/css/dataGrid.css';
import './assets/css/tableGrid.css';
import './assets/css/card-print.css';
import './assets/css/loader.css';
import AppContainer from './components/core/AppContainer';
import store from './store/store';
import APP_THEME from './constants/theme';
import { getAppConfig } from './sagas/assetFilesAPI';

getAppConfig().then((response) => {
  let fileConfig = {};
  if (response) {
    fileConfig = response;
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider theme={generateTheme(APP_THEME[fileConfig.environment ? fileConfig.environment : 'production'])}>
          <AppContainer />
        </ThemeProvider>
      </Provider>, document.getElementById('root'));
  } else {
    ReactDOM.render(
      <Provider store={store}>
        <ThemeProvider theme={generateTheme(APP_THEME.development)}>
          <AppContainer />
        </ThemeProvider>
      </Provider>, document.getElementById('root'));
  }
});

