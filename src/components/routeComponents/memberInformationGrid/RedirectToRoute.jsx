import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} fileRedirection
 * @param {Boolean} isAdminLogin
 * @param {Boolean} isAdminRoute
 * @param {Boolean} isMemberDataSet
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  fileRedirection,
  isAdminLogin,
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
    const routeFlags = {
      fileRedirection,
      isMemberDataSet,
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
  isAdminRoute: PropTypes.bool,
  isMemberDataSet: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  isAdminLogin: true,
  fileRedirection: false,
  isAdminRoute: false,
  isMemberDataSet: false,
};

export default RedirectToRoute;
