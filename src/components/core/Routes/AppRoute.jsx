import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getTenantName } from 'reducers/app';
import { getRouteConfig } from 'apis/core';
import { mergeObjects } from 'utils/common/object';

import Context from '../ConfigProvider';

/**
 * Wrapper component for each application Route
 */
class AppRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {},
      loaded: false,
    };
  }

  componentDidMount() {
    const { route, tenant } = this.props;
    const { config: configIdentifier } = route;

    if (configIdentifier) {
      getRouteConfig('default', configIdentifier).then((defaultConfig) => {
        if (!tenant) {
          this.setState({
            loaded: true,
            config: defaultConfig,
          });
        } else {
          getRouteConfig(tenant, configIdentifier).then((tenantConfig) => {
            this.setState({
              loaded: true,
              config: mergeObjects(defaultConfig, tenantConfig),
            });
          });
        }
      });
    } else {
      this.setState({
        loaded: true,
      });
    }
  }

  render() {
    const { Component } = this.props;
    const { Consumer } = Context;

    if (this.state.loaded) {
      return (
        <Consumer>
          { context => <Component context={context} config={this.state.config} /> }
        </Consumer>
      );
    }

    return null;
  }
}

AppRoute.propTypes = {
  Component: PropTypes.any.isRequired,
  route: PropTypes.object.isRequired,
  tenant: PropTypes.string,
};

AppRoute.defaultProps = {
  tenant: null,
};


export default connect(state => ({
  tenant: getTenantName(state),
}))(AppRoute);
