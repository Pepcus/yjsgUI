/* eslint-disable import/no-extraneous-dependencies */
import { connect } from 'react-redux';
import cssVars from 'css-vars-ponyfill';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import Box from 'pepcus-core/lib/Box/index';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  loadAppDataAction,
  loadBusCoordinatorsDataAction,
} from 'actions/assetFilesActions';
import {
  getApplicationMode,
  isAppLoaded,
  getIsAppLoadedError,
} from 'reducers/assetFilesReducer';
import {
  ERROR_MESSAGE_OF_LOAD_APP_DATA,
} from 'constants/text';
import cssJSON from 'config/cssVariables.json';
import {
  setLoadingStateAction,
} from 'actions/memberRegistrationActions';
import Routes from './Routes';

const MessageBoxStyled = styled(Box)`
    height: auto !important;
    margin: 20px 10px;
    color: ${getThemeProps('palette.text.color')};
    padding: 15px 20px;
    border: 1px solid ${getThemeProps('palette.action.disabledBackground')};
    animation-name: column-message;
    animation-duration: 0.7s;
    transition: 0.3s all;
    background: ${getThemeProps('palette.action.hover')};
    width: 98%
    ${({ theme }) => theme.media.down('lg')`
        width: 95%
    `}
    ${({ theme }) => theme.media.down('md')`
        line-height: 22px;
        display: flex;
    `}
`;

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
      isLoaded,
    } = this.props;

    loadBusCoordinatorsData();
    loadAppData();
    setLoadingState(false);

    /**
     * CSS variable doesn't support in IE for that we use 'css-vars-ponyfill'.
     * reference:- https://jhildenbiddle.github.io/css-vars-ponyfill/#/
     */
    if (isLoaded) {
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
    if (nextProps.isLoaded) {
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
    const {
      isLoaded,
      isAppLoadingFailed,
    } = this.props;

    if (isLoaded && !isAppLoadingFailed) {
      return (
        <HashRouter>
          <Route path="/" component={Routes} />
        </HashRouter>
      );
    } else if (isAppLoadingFailed) {
      return (
        <MessageBoxStyled>
          <Typography type="caption" padding="0 15px 0 0">
            <FaIcon icon={faExclamationTriangle} />
          </Typography>
          {ERROR_MESSAGE_OF_LOAD_APP_DATA}
        </MessageBoxStyled>
      );
    }
    return null;
  }
}

AppContainer.propTypes = {
  isAppLoadingFailed: PropTypes.bool,
  isLoaded: PropTypes.bool,
  loadAppData: PropTypes.func,
  loadBusCoordinatorsData: PropTypes.func,
  mode: PropTypes.string,
  setLoadingState: PropTypes.func.isRequired,
};

AppContainer.defaultProps = {
  isAppLoadingFailed: false,
  isLoaded: false,
  loadAppData: () => {},
  loadBusCoordinatorsData: () => {},
  mode: '',
};

const mapStateToProps = state => ({
  isAppLoadingFailed: getIsAppLoadedError(state),
  isLoaded: isAppLoaded(state),
  mode: getApplicationMode(state),
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
