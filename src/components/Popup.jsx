import React from 'react';
import PropTypes from 'prop-types';

export const Popup = ({ children }) => (
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
