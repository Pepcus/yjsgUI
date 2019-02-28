import React, { Component, createContext } from "react";
import PropTypes from 'prop-types';
// Provider and Consumer are connected through their "parent" context
const Context = createContext();

function Provider(props) {
  return (
    <Context.Provider
      value={{
        previousLocation: props.previousLocation,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  previousLocation: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Provider.dedaultProps = {
  previousLocation: '',
};
// I make this default since it will probably be exported most often.
export default { Provider, Consumer: Context.Consumer };
