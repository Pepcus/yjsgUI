import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import Footer from './Footer';
import Loader from '../Loader';
import Context from './ConfigProvider';
import components from '../routeComponents/index';
import Header from '../Header';
import { RouteArray } from '../../config/appConfig.json';


/**
 * Routes component maintain all routes
 * And send all previous location path to all routes.
 * @type {Class}
 */
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousLocation: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        previousLocation: this.props.location.pathname,
      });
    }
  }
  getRouts = Consumer => RouteArray.map((routeObject) => {
    const ComponentName = components[routeObject.componentName];
    if (routeObject.isActive) {
      return (
        <Route
          key={uniqueId(routeObject.componentName)}
          exact
          path={routeObject.routePath}
          component={() => (
            <Consumer>
              { context => <ComponentName context={context} /> }
            </Consumer>
            )}
        />
      );
    } return null;
  });
  render() {
    const { Consumer } = Context;
    return (
      <div>
        <Context.Provider previousLocation={this.state.previousLocation}>
          <Consumer>
            {context => <Header context={context} location={this.props.location.pathname} />}
          </Consumer>
          {this.getRouts(Consumer)}
          <Loader />
          <Footer />
        </Context.Provider>
      </div>
    );
  }
}

Routes.propTypes = {
  location: PropTypes.object,
};

Routes.defaultProps = {
  location: {},
};
export default Routes;
