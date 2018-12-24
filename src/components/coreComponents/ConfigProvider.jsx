import React, { Component, createContext } from "react";

// Provider and Consumer are connected through their "parent" context
const Context = createContext();

// Provider will be exported wrapped in ConfigProvider component.
class Provider extends Component {
  state = {
    color: 'red',
  };

  render() {
    const { Consumer } = Context;
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

// I make this default since it will probably be exported most often.
export default { Provider, Consumer: Context.Consumer };