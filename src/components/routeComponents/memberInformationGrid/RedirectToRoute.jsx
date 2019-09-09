import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} adminLoginState
 * @param {Boolean} fileRedirection
 * @param {Boolean} isAdminRoute
 * @param {Boolean} isMemberDataSet
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  adminLoginState,
  fileRedirection,
  isAdminRoute,
  isMemberDataSet,
}) => {
  const routes = {
    fileRedirection: '/files',
    isMemberDataSet: '/member-registration-correction',
    isAdminRoute: '/admin',
  };
  let routeName = '';
  if (fileRedirection || isMemberDataSet || isAdminRoute) {
    const routesFlag = {
      fileRedirection,
      isMemberDataSet,
      isAdminRoute,
    };
    Object.keys(routesFlag).forEach((routeFlag) => {
      if (routesFlag[routeFlag]) {
        routeName = routes[routeFlag];
      }
    });
    if (routeName) {
      return <Switch key={shortId.generate()}><Redirect to={routeName} /></Switch>;
    }
  } else if (!adminLoginState) {
    return <Switch key={shortId.generate()}><Redirect to="/admin" /></Switch>;
  } return null;
};

RedirectToRoute.propTypes = {
  adminLoginState: PropTypes.bool,
  fileRedirection: PropTypes.bool,
  isAdminRoute: PropTypes.bool,
  isMemberDataSet: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  adminLoginState: true,
  fileRedirection: false,
  isAdminRoute: false,
  isMemberDataSet: false,
};

export default RedirectToRoute;
