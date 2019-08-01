import React from 'react';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * @param {Boolean} context
 * @param {Boolean} isAdminLocation
 * @param {Boolean} isPreviousLocation
 * @param {Boolean} isStudentLocation
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  context,
  isAdminLocation,
  isPreviousLocation,
  isStudentLocation,
}) => {

  const routes = {
    isAdminLocation: '/admin',
    isStudentLocation: '/',
  };
  let routeName = '';

  if (isAdminLocation || isStudentLocation || isPreviousLocation) {
    const routesFlag = {
      isAdminLocation,
      isStudentLocation,
    };

    Object.keys(routesFlag).forEach((routeFlag) => {
      if (routesFlag[routeFlag]) {
        routeName = routes[routeFlag];
      }
    });
    if (routeName) {
      return <Switch key={shortId.generate()}><Redirect to={routeName} /></Switch>;
    }
    return <Switch key={shortId.generate()}><Redirect to={context.previousLocation} /></Switch>;
  }
  return null;
};

RedirectToRoute.propTypes = {
  context: PropTypes.object,
  isAdminLocation: PropTypes.bool,
  isPreviousLocation: PropTypes.bool,
  isStudentLocation: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  context: {},
  isAdminLocation: false,
  isPreviousLocation: false,
  isStudentLocation: false,
};

export default RedirectToRoute;
