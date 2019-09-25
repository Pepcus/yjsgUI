import React, { createContext } from 'react';
import PropTypes from 'prop-types';
// Provider and Consumer are connected through their "parent" context
const Context = createContext();

/**
 * Provider will be exported wrapped in ConfigProvider component.
 * @type {Class}
 * @return {HTML}
 */
const Provider = ({ previousLocation, children }) => (
  <Context.Provider
    value={{
          previousLocation,
        }}
  >
    {children}
  </Context.Provider>
);

Provider.propTypes = {
  previousLocation: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Provider.defaultProps = {
  previousLocation: '',
};
// I make this default since it will probably be exported most often.
export default {
  Provider,
  Consumer: Context.Consumer,
};
