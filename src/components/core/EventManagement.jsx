import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { generateTheme } from 'pepcus-core/utils/theme';

import AppContainer from 'components/core/AppContainer';
import { getAppConfig, isBootstrapComplete } from 'reducers/app';
import { getAppTheme } from 'reducers/themeReducer';
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
    const { appTheme } = this.props;
    const theme = generateTheme(appTheme);

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
  appTheme: PropTypes.object,
  bootstrappedFlag: PropTypes.bool,
  bootstrapApplicationAction: PropTypes.func.isRequired,
};

EventManagement.defaultProps = {
  appTheme: {},
  bootstrappedFlag: false,
};


function mapStateToProps(state) {
  return {
    config: getAppConfig(state),
    bootstrappedFlag: isBootstrapComplete(state),
    appTheme: getAppTheme(state),
  };
}

export default connect(mapStateToProps, {
  bootstrapApplicationAction,
})(EventManagement);
