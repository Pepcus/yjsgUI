import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Footer from '../common/Footer';
import Loader from '../common/Loader';
import Context from './ConfigProvider';
import RouteComponents from '../routeComponents';
import Header from '../common/Header';
import { routes } from '../../config/appConfig.json';


/**
 * Routes component maintain all routes
 * And send all previous location path to all routes.
 * @type {Class}
 * @return {ReactComponent}
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
  renderRoutes = Consumer => routes.map((route) => {
    const RouteComponent = RouteComponents[route.component];
    if (route.isActive) {
      return (
        <Route
          key={route.name}
          exact
          path={route.path}
          component={() => (
            <Consumer>
              { context => <RouteComponent context={context} /> }
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
          {this.renderRoutes(Consumer)}
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
