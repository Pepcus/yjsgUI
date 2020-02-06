import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import * as shortId from 'shortid';

/**
 * Method switch the route to previous location
 * @param {Object} context
 * @param {Boolean} isPreviousLocation
 * @return {HTML}
 * @constructor
 */
const RedirectToRoute = ({ context, isPreviousLocation }) => {
  if (isPreviousLocation) {
    return <Switch key={shortId.generate()}><Redirect to={context.previousLocation} /></Switch>;
  } return null;
};

RedirectToRoute.propTypes = {
  context: PropTypes.object,
  isPreviousLocation: PropTypes.bool,
};

RedirectToRoute.defaultProps = {
  context: {},
  isPreviousLocation: {},
};

export default RedirectToRoute;
