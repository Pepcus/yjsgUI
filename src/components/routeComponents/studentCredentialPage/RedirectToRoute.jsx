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
 * @param {Boolean} isStudentLocation
 * @param {Boolean} isURLParams
 * @param {Object} redirectToStudentCorrectionLogin
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  context,
  hasError,
  isAdminLocation,
  isPreviousLocation,
  isStudentLocation,
  isURLParams,
  redirectToStudentCorrectionLogin,
}) => {
  const routes = {
    isURLParams: '/studentCorrection',
    redirectToStudentCorrectionLogin: '/studentCorrection',
    isAdminLocation: '/admin',
    isStudentLocation: '/',
  };
  let routeName = '';

  if (isURLParams || (redirectToStudentCorrectionLogin && hasError)
    || isAdminLocation || isStudentLocation || isPreviousLocation) {
    const routesFlag = {
      isURLParams,
      redirectToStudentCorrectionLogin,
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
  hasError: PropTypes.bool,
  isAdminLocation: PropTypes.bool,
  isPreviousLocation: PropTypes.bool,
  isStudentLocation: PropTypes.bool,
  isURLParams: PropTypes.bool,
  redirectToStudentCorrectionLogin: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  context: {},
  hasError: false,
  isAdminLocation: false,
  isPreviousLocation: false,
  isStudentLocation: false,
  isURLParams: false,
  redirectToStudentCorrectionLogin: false,
};

export default RedirectToRoute;
