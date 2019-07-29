import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';


export const RedirectToRoute = ({
  isNewRegistration,
  isStudentLogin,
  isURLParams,
}) => {
  const routes = {
    isURLParams: '/studentCorrection',
    isStudentLogin: '/student-login',
    isNewRegistration: '/studentRegister',
  };

  if (isURLParams || isNewRegistration || isStudentLogin) {
    const routesFlag = { isURLParams, isNewRegistration, isStudentLogin };

    return Object.keys(routesFlag).map((routeFlag) => {
      if (routesFlag[routeFlag]) {
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
