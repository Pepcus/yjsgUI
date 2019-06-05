import React from 'react';
import ReactDOM from 'react-dom';
import cssVars from 'css-vars-ponyfill';
import { Provider } from 'react-redux';

import './assets/css/card-print.css';
import './assets/css/dataGrid.css';
import './assets/css/index.css';
import './assets/css/loader.css';
import './assets/css/tableGrid.css';
import AppContainer from './components/core/AppContainer';
import cssJSON from './config/cssVariables.json';
import store from './store/store';

/**
 * CSS variable doesn't support in IE for that we use 'css-vars-ponyfill'.
 * reference:- https://jhildenbiddle.github.io/css-vars-ponyfill/#/
 */
cssVars({
  // Only styles from CodePen's CSS panel
  include: 'style:not([data-ignore])',
  // Treat all browsers as legacy
  variables: {
    ...cssJSON[appMode],
  },
  onlyLegacy: true,
});
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'));

