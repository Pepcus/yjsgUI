import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Routes from './Routes';

const AppContainer = () => (
    <HashRouter>
      <Route path={'/'} component={Routes}/>
    </HashRouter>
);

export default AppContainer;
