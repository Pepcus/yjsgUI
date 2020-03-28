import React from 'react';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * @param {Boolean} context
 * @param {Boolean} hasError
 * @param {Boolean} isAdminLocation
 * @param {Boolean} isPreviousLocation
 * @param {Boolean} isCoordinatorLocation
 * @param {Boolean} isURLParams
 * @param {Object} redirectToCoordinatorCorrectionLogin
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  context,
  hasError,
  isAdminLocation,
  isPreviousLocation,
  isURLParams,
  redirectToCoordinatorCorrectionLogin,
}) => {
  const routes = {
    isURLParams: '/coordinator-registration-correction',
    redirectToCoordinatorCorrectionLogin: '/coordinator-registration-correction',
    isAdminLocation: '/admin',
  };
  let routeName = '';

  if (isURLParams || (redirectToCoordinatorCorrectionLogin && hasError)
    || isAdminLocation || isPreviousLocation) {
    const routeFlags = {
      isURLParams,
      redirectToCoordinatorCorrectionLogin,
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
    return <Switch key={shortId.generate()}><Redirect to="/admin" /></Switch>;
  }
  return null;
};

RedirectToRoute.propTypes = {
  context: PropTypes.object,
  hasError: PropTypes.bool,
  isAdminLocation: PropTypes.bool,
  isPreviousLocation: PropTypes.bool,
  isURLParams: PropTypes.bool,
  redirectToCoordinatorCorrectionLogin: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  context: {},
  hasError: false,
  isAdminLocation: false,
  isPreviousLocation: false,
  isURLParams: false,
  redirectToCoordinatorCorrectionLogin: false,
};

export default RedirectToRoute;
