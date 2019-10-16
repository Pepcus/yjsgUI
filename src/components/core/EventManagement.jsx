import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { generateTheme } from 'pepcus-core/utils/theme';

import APP_THEME from 'constants/theme';
import AppContainer from 'components/core/AppContainer';
import { getAppConfig } from 'reducers/app';
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
    const { appConfig } = this.props;
    const theme = generateTheme(APP_THEME[appConfig.environment ? appConfig.environment : 'production']);

    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }

  render() {
    const { appConfig: { bootstrapped } } = this.props;

    if (bootstrapped) {
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
  appConfig: PropTypes.object,
  bootstrapApplicationAction: PropTypes.func.isRequired,
};

EventManagement.defaultProps = {
  appConfig: {},
};


function mapStateToProps(state) {
  return {
    appConfig: getAppConfig(state),
  };
}

export default connect(mapStateToProps, {
  bootstrapApplicationAction,
})(EventManagement);
