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
 * @param {Boolean} isMemberView
 * @param {Object} redirectToStudentCorrectionLogin
 * @param {Boolean} isNewRegistration
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
  isMemberView,
  redirectToStudentCorrectionLogin,
  isNewRegistration,
}) => {
  const routes = {
    isNewRegistration: '/member-register',
    isMemberView: '/members-view',
    isURLParams: '/member-registration-correction',
    redirectToStudentCorrectionLogin: '/member-registration-correction',
    isAdminLocation: '/admin',
    isStudentLocation: '/',
  };
  let routeName = '';

  if (isNewRegistration || isMemberView || isURLParams || (redirectToStudentCorrectionLogin && hasError)
    || isAdminLocation || isStudentLocation || isPreviousLocation) {
    const routeFlags = {
      isNewRegistration,
      isMemberView,
      isURLParams,
      redirectToStudentCorrectionLogin,
      isAdminLocation,
      isStudentLocation,
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
  hasError: PropTypes.bool,
  isAdminLocation: PropTypes.bool,
  isPreviousLocation: PropTypes.bool,
  isStudentLocation: PropTypes.bool,
  isURLParams: PropTypes.bool,
  redirectToStudentCorrectionLogin: PropTypes.bool,
  isMemberView: PropTypes.bool,
  isNewRegistration: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  context: {},
  hasError: false,
  isAdminLocation: false,
  isPreviousLocation: false,
  isStudentLocation: false,
  isURLParams: false,
  redirectToStudentCorrectionLogin: false,
  isMemberView: false,
  isNewRegistration: false,
};

export default RedirectToRoute;
