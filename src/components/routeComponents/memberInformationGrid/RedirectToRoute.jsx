import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} fileRedirection
 * @param {Boolean} coordinatorRedirection
 * @param {Boolean} isAdminLogin
 * @param {Boolean} isAdminRoute
 * @param {Boolean} isMemberDataSet
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  fileRedirection,
  coordinatorRedirection,
  isAdminLogin,
  isAdminRoute,
  isMemberDataSet,
}) => {
  const routes = {
    coordinatorRedirection: '/coordinator-info-grid',
    fileRedirection: '/files',
    isMemberDataSet: '/member-registration-correction',
    isAdminRoute: '/admin',
  };
  let routeName = '';
  if (fileRedirection || isMemberDataSet || isAdminRoute || coordinatorRedirection) {
    const routeFlags = {
      fileRedirection,
      coordinatorRedirection,
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
  coordinatorRedirection: PropTypes.bool,
  isAdminRoute: PropTypes.bool,
  isMemberDataSet: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  isAdminLogin: true,
  fileRedirection: false,
  coordinatorRedirection: false,
  isAdminRoute: false,
  isMemberDataSet: false,
};

export default RedirectToRoute;
