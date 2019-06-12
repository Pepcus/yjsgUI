import React from 'react';
import PropTypes from 'prop-types';

/**
 * Popup render popup
 * @param {Node} children
 * @type {Function}
 * @return {*}
 * @constructor
 */
const Popup = ({ children }) => (
  <div className="popup">
    <div className="popupContainer">
      { children }
    </div>
  </div>
);

Popup.propTypes = {
  children: PropTypes.node,
};
Popup.defaultProps = {
  children: '',
};

export default Popup;
