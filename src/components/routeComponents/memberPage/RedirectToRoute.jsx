import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';

/**
 * RedirectToRoute method redirect to corresponding route.
 * @param {Boolean} isNewRegistration
 * @param {Boolean} isMemberLogin
 * @param {Boolean} isURLParams
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({
  isNewRegistration,
  isMemberLogin,
  isURLParams,
  isNewCoordinator,
}) => {
  const routes = {
    isURLParams: '/member-registration-correction',
    isMemberLogin: '/member-login',
    isNewRegistration: '/member-register',
  };

  if (isURLParams || isNewRegistration || isMemberLogin) {
    const routeFlags = { isURLParams, isNewRegistration, isMemberLogin };

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
  isMemberLogin: PropTypes.bool,
  isURLParams: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  isNewRegistration: false,
  isMemberLogin: false,
  isURLParams: false,
};

export default RedirectToRoute;
