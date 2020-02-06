import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} fileRedirection
 * @param {Boolean} coordinatorRedirection
 * @param {Boolean} isAdminLogin
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  fileRedirection,
  memberViewRedirection,
  isAdminLogin,
  isAdminRoute,
  coordinatorCorrectionRedirection,
}) => {
  const routes = {
    memberViewRedirection: '/member-search',
    fileRedirection: '/files',
    isAdminRoute: '/admin',
    coordinatorCorrectionRedirection: '/coordinator-registration-correction',
  };
  let routeName = '';
  if (fileRedirection || isAdminRoute ||  memberViewRedirection || coordinatorCorrectionRedirection) {
    const routeFlags = {
      fileRedirection,
      memberViewRedirection,
      coordinatorCorrectionRedirection,
      isAdminRoute,
    };
    Object.keys(routeFlags).forEach((routeFlag) => {
      if (routeFlags[routeFlag]) {
        routeName = routes[routeFlag];
      }
    });
    if (routeName) {
      return <Switch key={shortId.generate()}><Redirect to={routeName} /></Switch>;
    }
  } else if (!isAdminLogin) {
    return <Switch key={shortId.generate()}><Redirect to="/admin" /></Switch>;
  } return null;
};

RedirectToRoute.propTypes = {
  isAdminLogin: PropTypes.bool,
  fileRedirection: PropTypes.bool,
  memberViewRedirection: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  isAdminLogin: true,
  fileRedirection: false,
  memberViewRedirection: false,
};

export default RedirectToRoute;
