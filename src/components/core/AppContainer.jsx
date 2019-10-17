import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';

import Box from 'pepcus-core/lib/Box/index';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import {
  isAppLoaded,
  getIsAppLoadedError,
} from 'reducers/assetFilesReducer';
import {
  isBootstrapComplete,
} from 'reducers/app';
import {
  ERROR_MESSAGE_OF_LOAD_APP_DATA,
} from 'constants/text';
import Routes from 'components/core/Routes';
import {getAppConstantsConfig} from "reducers/constants";

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
 * @param {Object} appConstants
 * @param {Boolean} isLoaded
 * @param {Boolean} isAppLoadingFailed
 * @param {Boolean} bootstrapFlag
 * @return {HTML}
 */
const AppContainer = ({
                        appConstants,
  isLoaded,
  isAppLoadingFailed,
  bootstrapFlag,
}) => {

  if (isLoaded && !isAppLoadingFailed) {
    return (
      <HashRouter>
        <Route path="/" component={Routes} />
      </HashRouter>
    );
  } else if (isAppLoadingFailed || !bootstrapFlag) {
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
};

AppContainer.propTypes = {
  appConstants: PropTypes.object,
  isAppLoadingFailed: PropTypes.bool,
  isLoaded: PropTypes.bool,
  bootstrapFlag: PropTypes.bool,
};

AppContainer.defaultProps = {
  appConstants: {},
  isAppLoadingFailed: false,
  isLoaded: false,
  bootstrapFlag: false,
};

const mapStateToProps = state => ({
  appConstants: getAppConstantsConfig(state),
  isAppLoadingFailed: getIsAppLoadedError(state),
  isLoaded: isAppLoaded(state),
  bootstrapFlag: isBootstrapComplete(state),
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
