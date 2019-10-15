/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';

import Box from 'pepcus-core/lib/Box';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import headerLogo from 'assets/images/react-logo.png';
import {
  resetVisibleColumnConfigAction,
  setRedirectValueAction,
} from 'actions/appActions';
import {
  resetLoginAdminStateAction,
  resetAdminCredentialsAction,
} from 'actions/loginActions';
import { routes, title } from 'config/appConfig.json';
import { getApplicationTenant } from 'reducers/assetFilesReducer';
import { DEFAULT_HEADER_TEXT } from 'constants/yjsg';

const HeaderWrapper = styled(Box)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    z-index: 2;
    background-color: ${getThemeProps('colors.header')};
    color: ${getThemeProps('palette.white.color')};
    text-align: center;
    left: 0;
    ${({ theme }) => theme.media.down('lg')`
        position: relative;
        display: block;
    `}
    @media print {
        display:none;
    }
`;

const ImageWrapper = styled(Box)`
    z-index: 5;
    left: 10px;
    top: -5px;
    width: auto;
    ${({ theme }) => theme.media.down('lg')`
        left: 5px;
        top: 0;
        width: 90px;
    `}
`;

const ImageStyled = styled('img')`
    ${({ theme }) => theme.media.down('lg')`
        width: 100%;
    `}
`;

const HeaderStyled = styled(Typography)`
        font-size: 24px !important;
    ${({ theme }) => theme.media.down('lg')`
        position: relative
    `}
    ${({ theme }) => theme.media.down('md')`
        line-height: 28px;
        box-sizing: border-box;
        font-size: 22px ! important;
    `}
    ${({ theme }) => theme.media.down('sm')`
        line-height: 28px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 18px;
    `}
`;

const ButtonWrapper = styled(Box)`
    right: 28px;
    margin: 0 0 10px 0;
    top: 11px;
    z-index: 2;
    ${({ theme }) => theme.media.down('lg')`
        display: none;
        top: 66px;
        right: 0;
        z-index: 1;
    `}
    ${({ theme }) => theme.media.down('md')`
        right: 0;
        margin-top: 17px;
        z-index: 1;
        `}
`;

const LinkStyled = styled(Link)`
    color: ${getThemeProps('palette.white.color')};
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    padding: 2px 15px;
    border: 1px solid ${getThemeProps('palette.white.color')};
    margin-right: 10px;
    border-radius: 3px;
    &:hover {
        background-color: ${getThemeProps('palette.primary.color')};
        transition: 0.3s all;
        border: 1px solid ${getThemeProps('palette.primary.color')};
    }
    ${({ theme }) => theme.media.down('lg')`
        background-color: ${getThemeProps('colors.header')};
        outline: none;
        text-align: center;
        line-height: 20px;
        padding: 10px;
        box-shadow: none;
        font-size: 14px;
        margin-right: 0;
        border-radius: 4px;
    `}
`;

/**
 * Header render the common header for all route
 * @param {Object} context
 * @param {String} location
 * @param {Function} resetAdminCredentials
 * @param {Function} resetLoginAdminState
 * @param {Function} setRedirectValue
 * @param {Function} resetVisibleColumnConfig
 * @param {String} tenant
 * @type {Function}
 * @return {HTML}
 */
const Header = ({
  context,
  location,
  resetAdminCredentials,
  resetLoginAdminState,
  setRedirectValue,
  resetVisibleColumnConfig,
  tenant,
}) => {

  /**
   * Method will call when click on logout button
   * It reset the admin credentials to false by calling action resetAdminCredentialsAction()
   * It reset the admin login state to false by calling action resetLoginAdminStateAction()
   * It reset the visibleColumnConfig to initial
   * state by calling action resetVisibleColumnConfigAction()
   * And clear local store.
   */
  const performLogout = () => {
    resetAdminCredentials();
    resetLoginAdminState();
    setRedirectValue({ redirect: false });
    resetVisibleColumnConfig();
    localStorage.clear();
  };

  /**
   * Method render back button in header
   * @param {Object} headerObject
   * @return {HTML}
   * @constructor
   */
  const renderBackButton = (headerObject) => {
    if (headerObject.backButton) {
      return (
        <LinkStyled
          to={
            headerObject.backButtonRedirectTo
              ? headerObject.backButtonRedirectTo : context.previousLocation}
        >
          <FaIcon margin="0 5px 0 0" icon={faArrowLeft} />Back
        </LinkStyled>
      );
    } return null;
  };

  /**
   * Method render logout button in header
   * @param {Object} headerObject
   * @return {HTML}
   * @constructor
   */
  const renderLogOutButton = (headerObject) => {
    if (headerObject.logoutButton) {
      return (
        <LinkStyled
          to={
            headerObject.logoutButtonRedirectTo
              ? headerObject.logoutButtonRedirectTo : context.previousLocation}
          onClick={performLogout}
        >
          <FaIcon margin="0 5px 0 0" icon={faPowerOff} />Logout
        </LinkStyled>
      );
    } return null;
  };

  /**
   * It return the header text
   * @return {string}
   */
  const getHeaderText = () => (title[tenant] ? title[tenant] : DEFAULT_HEADER_TEXT);

  /**
   * Method render header name in header
   * @param {Object} headerObject
   * @return {HTML}
   * @constructor
   */
  const renderHeaderName = headerObject => (
    <HeaderStyled
      type="title"
      style={headerObject.titleStyle ? headerObject.titleStyle : {}}
    >
      {headerObject.title ? headerObject.title : getHeaderText()}
    </HeaderStyled>
  );

  /**
   * RenderButton method render buttons with their button wrapper in header.
   * @param {Object} headerObject
   * @return {HTML}
   * @constructor
   */
  const renderButton = (headerObject) => {
    if (headerObject.hasButtons) {
      return (
        <ButtonWrapper
          width="auto"
          borderStyle="none"
          backgroundColor="unset"
          borderRadius="0"
          position="absolute"
          padding="10px 10px"
        >
          {renderBackButton(headerObject)}
          {renderLogOutButton(headerObject)}
        </ButtonWrapper>
      );
    } return null;
  };

  /**
   * Method render logo in header
   * @param {Object} headerObject
   * @return {HTML}
   * @constructor
   */
  const renderLogo = (headerObject) => {
    if (headerObject.logo) {
      return (
        <ImageWrapper
          position="absolute"
          padding="0"
          margin="0"
          borderRadius="0"
          backgroundColor="unset"
          borderStyle="none"
        >
          <ImageStyled
            src={headerLogo}
            alt="logo"
          />
        </ImageWrapper>
      );
    }
    return null;
  };
  // render header with their contains according to route
  return routes.map((route) => {
    const { header = {}, path } = route;
    if (path === location) {
      return (
        <HeaderWrapper
          borderRadius="0"
          padding="0"
          margin="0"
          key={path}
          style={header.headerWrapperStyle ? header.headerWrapperStyle : {}}
        >
          {renderLogo(header)}
          {renderHeaderName(header)}
          {renderButton(header)}
        </HeaderWrapper>
      );
    } else if (path === '/files*' && location === '/files') {
      return (
        <HeaderWrapper
          borderRadius="0"
          padding="0"
          margin="0"
          key={path}
          style={header.headerWrapperStyle ? header.headerWrapperStyle : {}}
        >
          {renderLogo(header)}
          {renderHeaderName(header)}
          {renderButton(header)}
        </HeaderWrapper>
      );
    } return null;
  });
};

Header.propTypes = {
  context: PropTypes.object,
  location: PropTypes.string,
  resetAdminCredentials: PropTypes.func,
  resetVisibleColumnConfig: PropTypes.func,
  routes: PropTypes.array,
  resetLoginAdminState: PropTypes.func,
  setRedirectValue: PropTypes.func,
  tenant: PropTypes.string,
  title: PropTypes.object,
};

Header.defaultProps = {
  context: {},
  location: '',
  resetAdminCredentials: () => {},
  resetVisibleColumnConfig: () => {},
  routes: [],
  resetLoginAdminState: () => {},
  setRedirectValue: () => {},
  tenant: '',
  title: {},
};

const mapDispatchToProps = dispatch => ({
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
  resetLoginAdminState: () => dispatch(resetLoginAdminStateAction()),
  setRedirectValue: ({ redirect }) => dispatch(setRedirectValueAction({ redirect })),
});

const mapStateToProps = state => ({
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
