import React from 'react';
import PropTypes from 'prop-types';

/**
 * Popup render popup
 * @param {Node} children
 * @type {Function}
 * @return {ReactComponent}
 * @constructor
 */
const Popup = ({ children }) => (
  <div className="popup">
    <div className="popupContainer">
      { children }
    </div>
  </div>
);

Popup.propstype = {
  children: PropTypes.node,
};
Popup.defaultProps = {
  children: '',
};

export default Popup;
