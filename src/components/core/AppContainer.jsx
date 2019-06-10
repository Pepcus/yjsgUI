import connect from 'react-redux/es/connect/connect';
import cssVars from 'css-vars-ponyfill';
import { HashRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Routes from './Routes';
import { loadAppDataAction, loadBusCoordinatorsDataAction } from '../../actions/assetFilesActions';
import { getApplicationMode, isAppLoaded, getIsAppLoadedError } from '../../reducers/assetFilesReducer';
import { ERROR_MESSAGE_OF_LOAD_APP_DATA } from '../../constants/text';
import cssJSON from '../../config/cssVariables.json';
import {
  setLoadingStateAction,
} from '../../actions/studentRegistrationActions';


/**
 * AppContainer is the wrapper of application.
 */
class AppContainer extends Component {
  componentDidMount() {
    const {
      loadBusCoordinatorsData,
      loadAppData,
      mode,
      setLoadingState,
    } = this.props;

    loadBusCoordinatorsData();
    loadAppData();
    setLoadingState(false);
    /**
     * CSS variable doesn't support in IE for that we use 'css-vars-ponyfill'.
     * reference:- https://jhildenbiddle.github.io/css-vars-ponyfill/#/
     */
    if (this.props.isAppLoaded) {
      cssVars({
        // Only styles from CodePen's CSS panel
        include: 'style:not([data-ignore])',
        // Treat all browsers as legacy
        variables: {
          ...cssJSON[mode],
        },
        onlyLegacy: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAppLoaded) {
      cssVars({
        // Only styles from CodePen's CSS panel
        include: 'style:not([data-ignore])',
        // Treat all browsers as legacy
        variables: {
          ...cssJSON[nextProps.mode],
        },
        onlyLegacy: true,
      });
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
  loadAppData: PropTypes.func,
  setLoadingState: PropTypes.func.isRequired,
  loadBusCoordinatorsData: PropTypes.func,
  isAppLoaded: PropTypes.bool,
  isAppLoadingFailed: PropTypes.bool,
  mode: PropTypes.string,
};

AppContainer.defaultProps = {
  loadAppData: () => {},
  loadBusCoordinatorsData: () => {},
  isAppLoaded: false,
  isAppLoadingFailed: false,
  mode: '',
};

const mapStateToProps = state => ({
  mode: getApplicationMode(state),
  isAppLoaded: isAppLoaded(state),
  isAppLoadingFailed: getIsAppLoadedError(state),
});

const mapDispatchToProps = dispatch => ({
  loadAppData: () => dispatch(loadAppDataAction()),
  loadBusCoordinatorsData: () => dispatch(loadBusCoordinatorsDataAction()),
  setLoadingState: () => dispatch(setLoadingStateAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);

