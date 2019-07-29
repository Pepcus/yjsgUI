import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as shortId from 'shortid';


export const RedirectToRoute = ({
  isURLParams,
  redirectToStudentCorrectionLogin,
  hasError,
  isAdminLocation,
  isStudentLocation,
  isPreviousLocation,
  context,
}) => {
  const routes = {
    isURLParams: '/studentCorrection',
    redirectToStudentCorrectionLogin: '/studentCorrection',
    isAdminLocation: '/admin',
    isStudentLocation: '/',
    isPreviousLocation: context.previousLocation,
  };

  if (isURLParams || (redirectToStudentCorrectionLogin && hasError)
    || isAdminLocation || isStudentLocation || isPreviousLocation) {
    const routesFlag = {
      isURLParams,
      redirectToStudentCorrectionLogin,
      isAdminLocation,
      isStudentLocation,
      isPreviousLocation,
    };

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
  isURLParams: PropTypes.bool,
  isStudentLogin: PropTypes.bool,
  isNewRegistration: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  isURLParams: false,
  isStudentLogin: false,
  isNewRegistration: false,
};

