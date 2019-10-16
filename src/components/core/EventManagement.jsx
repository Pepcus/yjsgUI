import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { generateTheme } from 'pepcus-core/utils/theme';

import APP_THEME from 'constants/theme';
import AppContainer from 'components/core/AppContainer';
import { getAppConfig, getBootstrappedFlag } from 'reducers/app';
import { bootstrapApplicationAction } from 'actions/coreActions';
import CustomLoader from 'components/common/CustomLoader';

/**
 * Wrapper of the entire application
 */
class EventManagement extends React.Component {
  componentDidMount() {
    this.props.bootstrapApplicationAction();
  }

  renderApplicationBody() {
    const { config } = this.props;
    const theme = generateTheme(APP_THEME[config.environment ? config.environment : 'production']);

    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }

  render() {
    const { bootstrappedFlag } = this.props;
    if (bootstrappedFlag) {
      return this.renderApplicationBody();
    }

    return (
      <div>
        <CustomLoader />
      </div>
    );
  }
}

EventManagement.propTypes = {
  bootstrappedFlag: PropTypes.bool,
  config: PropTypes.object,
  bootstrapApplicationAction: PropTypes.func.isRequired,
};

EventManagement.defaultProps = {
  bootstrappedFlag: false,
  config: {},
};


function mapStateToProps(state) {
  return {
    config: getAppConfig(state),
    bootstrappedFlag: getBootstrappedFlag(state),
  };
}

export default connect(mapStateToProps, {
  bootstrapApplicationAction,
})(EventManagement);
