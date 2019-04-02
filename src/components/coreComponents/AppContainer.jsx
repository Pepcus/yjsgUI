import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import { development, production } from '../../config/cssVariables.json';
import Routes from './Routes';
import { loadAppDataAction } from '../../actions/assetFilesActions';
import { getApplicationMode, isAppLoaded, getIsAppLoadedError } from '../../reducers/assetFilesReducer';
import { setAppColor } from '../../utils/dataGridUtils';
import { ERROR_MESSAGE_OF_LOAD_APP_DATA } from '../../utils/textConstants';

class AppContainer extends Component {
  componentDidMount() {
    this.props.loadAppDataAction();
    if (this.props.isAppLoaded) {
      setAppColor(this.props.mode === 'production' ? production : development);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAppLoaded) {
      setAppColor(nextProps.mode === 'production' ? production : development);
    }
  }

  render() {
    if (this.props.isAppLoaded && !this.props.isAppLoadedError) {
      return (
        <HashRouter>
          <Route path="/" component={Routes} />
        </HashRouter>
      );
    } else if (this.props.isAppLoadedError) {
      return (
        <div>
          <div className="empty-column-message">
            <span className="circle-icon">
              <i className="fa fa-exclamation-triangle" />
            </span>
            {ERROR_MESSAGE_OF_LOAD_APP_DATA}
          </div>
        </div>
      );
    }
    return null;
  }
}

AppContainer.propTypes = {
  loadAppDataAction: PropTypes.func,
  isAppLoaded: PropTypes.bool,
  isAppLoadedError: PropTypes.bool,
  mode: PropTypes.string,
};
AppContainer.defaultProps = {
  loadAppDataAction: () => {},
  isAppLoaded: false,
  isAppLoadedError: false,
  mode: '',
};
const mapStateToProps = state => ({
  mode: getApplicationMode(state),
  isAppLoaded: isAppLoaded(state),
  isAppLoadedError: getIsAppLoadedError(state),
});
export default connect(mapStateToProps, {
  loadAppDataAction,
})(AppContainer);

