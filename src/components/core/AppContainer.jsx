import React, { Component } from 'react';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import Routes from './Routes';
import {
  loadAppDataAction,
  loadBusCoordinatorsDataAction,
} from '../../actions/assetFilesActions';
import {
  getApplicationMode,
  isAppLoaded,
  getIsAppLoadedError,
} from '../../reducers/assetFilesReducer';
import { setAppColor } from '../../utils/dataGridUtils';
import { ERROR_MESSAGE_OF_LOAD_APP_DATA } from '../../constants/text';
import cssJSON from '../../config/cssVariables.json';
import { setLoadingStateAction } from '../../actions/studentRegistrationActions';

const { development, production } = cssJSON;

/**
 * AppContainer is the wrapper of application.
 */
class AppContainer extends Component {
  componentDidMount() {
    this.props.loadBusCoordinatorsDataAction();
    this.props.loadAppDataAction();
    this.props.setLoadingStateAction(false);
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
    if (this.props.isAppLoaded && !this.props.isAppLoadingFailed) {
      return (
        <HashRouter>
          <Route path="/" component={Routes} />
        </HashRouter>
      );
    } else if (this.props.isAppLoadingFailed) {
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
  isAppLoaded: PropTypes.bool,
  isAppLoadingFailed: PropTypes.bool,
  loadAppDataAction: PropTypes.func,
  loadBusCoordinatorsDataAction: PropTypes.func,
  mode: PropTypes.string,
  setLoadingStateAction: PropTypes.func.isRequired,
};

AppContainer.defaultProps = {
  isAppLoaded: false,
  isAppLoadingFailed: false,
  loadAppDataAction: () => {},
  loadBusCoordinatorsDataAction: () => {},
  mode: '',
};

const mapStateToProps = state => ({
  isAppLoaded: isAppLoaded(state),
  isAppLoadingFailed: getIsAppLoadedError(state),
  mode: getApplicationMode(state),
});

export default connect(mapStateToProps, {
  loadAppDataAction,
  loadBusCoordinatorsDataAction,
  setLoadingStateAction,
})(AppContainer);

