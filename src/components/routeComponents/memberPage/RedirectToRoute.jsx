import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} isNewRegistration
 * @param {Boolean} isStudentLogin
 * @param {Boolean} isURLParams
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  isNewRegistration,
  isStudentLogin,
  isURLParams,
}) => {
  const routes = {
    isURLParams: '/member-registration-correction',
    isStudentLogin: '/member-login',
    isNewRegistration: '/member-register',
  };

  if (isURLParams || isNewRegistration || isStudentLogin) {
    const routeFlags = { isURLParams, isNewRegistration, isStudentLogin };

    return Object.keys(routeFlags).map((routeFlag) => {
      if (routeFlags[routeFlag]) {
        return <Switch key={shortId.generate()}><Redirect to={routes[routeFlag]} /></Switch>;
      }
      return null;
    });
  }
  return null;
};

RedirectToRoute.propTypes = {
  isNewRegistration: PropTypes.bool,
  isStudentLogin: PropTypes.bool,
  isURLParams: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  isNewRegistration: false,
  isStudentLogin: false,
  isURLParams: false,
};

export default RedirectToRoute;
