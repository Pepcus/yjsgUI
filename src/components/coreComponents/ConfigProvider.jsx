import React, { Component, createContext } from "react";
import PropTypes from 'prop-types';
// Provider and Consumer are connected through their "parent" context
const Context = createContext();

// TODO: Fix ESLint warnings
/**
 * Provider will be exported wrapped in ConfigProvider component.
 * @type {Class}
 */
class Provider extends Component {

  render() {
    return (
      <Context.Provider
        value={{
          previousLocation: this.props.previousLocation,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
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
