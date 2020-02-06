import React from 'react';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} context
 * @param {Boolean} isAdminLocation
 * @param {Boolean} isPreviousLocation
 * @param {Boolean} isCoordinatorLocation
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  context,
  isAdminLocation,
  isPreviousLocation,
}) => {

  const routes = {
    isAdminLocation: '/admin',
  };
  let routeName = '';

  if (isAdminLocation  || isPreviousLocation) {
    const routeFlags = {
      isAdminLocation,
    };

    Object.keys(routeFlags).forEach((routeFlag) => {
      if (routeFlags[routeFlag]) {
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
};

RedirectToRoute.defaultProps = {
  context: {},
  isAdminLocation: false,
  isPreviousLocation: false,
};

export default RedirectToRoute;
