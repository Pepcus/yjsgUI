import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Box from 'pepcus-core/lib/Box';

import Header from 'components/common/Header';
import Loader from 'components/common/Loader';
import Footer from 'components/common/Footer';
import { getApplicationRoutes } from 'reducers/config';
import AppRoute from './AppRoute';

import Context from '../ConfigProvider';
import RouteComponents from '../../routeComponents';

/**
 * Routes component maintain all routes
 * And send all previous location path to all routes.
 * @type {Class}
 * @return {HTML}
 */
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousLocation: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;

    if (nextProps.location.pathname !== location.pathname) {
      this.setState({
        previousLocation: location.pathname,
      });
    }
  }
  renderRoutes = () => this.props.routes.map((route) => {
    const RouteComponent = RouteComponents[route.component];
    if (route.isActive) {
      return (
        <Route
          key={route.name}
          exact
          path={route.path}
          component={() => (
            <AppRoute key={route.name} route={route} Component={RouteComponent} />
          )}
        />
      );
    }

    return null;
  });
  render() {
    const { Consumer } = Context;
    const { previousLocation } = this.state;
    const { location } = this.props;
    return (
      <Box padding="0" backgroundColor="unset" margin="0" borderStyle="unset">
        <Context.Provider previousLocation={previousLocation}>
          <Consumer>
            {context => <Header context={context} location={location.pathname} />}
          </Consumer>
          {this.renderRoutes()}
          <Loader />
          <Footer location={location.pathname} />
        </Context.Provider>
      </Box>
    );
  }
}

Routes.propTypes = {
  routes: PropTypes.array,
  location: PropTypes.object,
};

Routes.defaultProps = {
  routes: {},
  location: {},
};

const mapStateToProps = state => ({
  routes: getApplicationRoutes(state),
});
export default connect(mapStateToProps, null)(Routes);
