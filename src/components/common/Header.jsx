import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import headerLogo from '../../assets/images/react-logo.png';
import {
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
} from '../../actions/studentRegistrationActions';
import { routes, title } from '../../config/appConfig.json';
import { getApplicationTenant } from '../../reducers/assetFilesReducer';
import { DEFAULT_HEADER_TEXT } from '../../constants/yjsg';

/**
 * Header render the common header for all route
 * @param {Object} context
 * @param {String} location
 * @param {Function} resetAdminCredentials
 * @param {Function} setAdminLoginState
 * @param {Function} setRedirectValue
 * @param {Function} resetVisibleColumnConfig
 * @param {String} tenant
 * @type {Function}
 * @return {ReactComponent}
 * @constructor
 */
const Header = ({
  context,
  location,
  resetAdminCredentials,
  setAdminLoginState,
  setRedirectValue,
  resetVisibleColumnConfig,
  tenant,
}) => {
  /**
   * performLogout method will call when click on logout button
   * It reset the admin credentials to false by calling action resetAdminCredentialsAction()
   * It reset the admin login state to false by calling action setAdminLoginStateAction()
   * It reset the visibleColumnConfig to initial
   * state by calling action resetVisibleColumnConfigAction()
   * And clear local store.
   */
  const performLogout = () => {
    resetAdminCredentials();
    setAdminLoginState(false);
    setRedirectValue(false);
    resetVisibleColumnConfig();
    localStorage.clear();
  };
  /**
   * RenderBackButton method render back button in header
   * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const renderBackButton = (headerObject) => {
    if (headerObject.backButton) {
      return (
        <Link
          to={
            headerObject.backButtonRedirectTo
              ? headerObject.backButtonRedirectTo : context.previousLocation}
          className="grid-small-button"
        >
          <i className="fa fa-arrow-left card-icon" />Back
        </Link>
      );
    } return null;
  };
  /**
   * renderLogOutButton method render logout button in header
    * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const renderLogOutButton = (headerObject) => {
    if (headerObject.logoutButton) {
      return (
        <Link
          to={
            headerObject.logoutButtonRedirectTo
              ? headerObject.logoutButtonRedirectTo : context.previousLocation}
          onClick={performLogout}
          className="grid-small-button"
        >
          <i className="fa fa-power-off card-icon" />Logout
        </Link>
      );
    } return null;
  };

  /**
   * It return the header text
   * @return {string}
   */
  const getHeaderText = () => (title[tenant] ? title[tenant] : DEFAULT_HEADER_TEXT);

  /**
   * RenderHeaderName method render header name in header
    * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const renderHeaderName = headerObject => (
    <h2
      style={headerObject.titleStyle}
      className="student-info-heading"
    >
      {headerObject.title ? headerObject.title : getHeaderText()}
    </h2>
  );
  /**
   * RenderButton method render buttons with their button wrapper in header.
   * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const renderButton = (headerObject) => {
    if (headerObject.hasButtons) {
      return (
        <div
          className="logoutButtonContainer display-mobile-none logoutLinkContainer "
        >
          {renderBackButton(headerObject)}
          {renderLogOutButton(headerObject)}
        </div>
      );
    } return null;
  };
  /**
   * renderLogo method render logo in header
   * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const renderLogo = (headerObject) => {
    if (headerObject.logo) {
      return (
        <div
          className="yjsg-logo"
        >
          <img
            src={headerLogo}
            alt="logo"
            className="yjsg-logo-img"
          />
        </div>
      );
    }
    return null;
  };
  // render header with their contains according to route
  return routes.map((route) => {
    const { header, path } = route;
    if (path === location) {
      return (
        <div key={path} style={header.headerWrapperStyle} className="student-logo-header print-media-none">
          {renderLogo(header)}
          {renderHeaderName(header)}
          {renderButton(header)}
        </div>
      );
    } else if (path === '/files*' && location === '/files') {
      return (
        <div key={path} style={header.headerWrapperStyle} className="student-logo-header print-media-none">
          {renderLogo(header)}
          {renderHeaderName(header)}
          {renderButton(header)}
        </div>
      );
    } return null;
  });
};

Header.propTypes = {
  title: PropTypes.string,
  resetAdminCredentials: PropTypes.func,
  setAdminLoginState: PropTypes.func,
  setRedirectValue: PropTypes.func,
  resetVisibleColumnConfig: PropTypes.func,
  location: PropTypes.string,
  context: PropTypes.object,
  routes: PropTypes.array,
  tenant: PropTypes.string,
};
Header.defaultProps = {
  title: '',
  resetAdminCredentials: () => {},
  setAdminLoginState: () => {},
  setRedirectValue: () => {},
  resetVisibleColumnConfig: () => {},
  location: '',
  context: {},
  routes: [],
  tenant: '',
};

const mapDispatchToProps = dispatch => ({
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  setAdminLoginState: () => dispatch(setAdminLoginStateAction()),
  setRedirectValue: () => dispatch(setRedirectValueAction()),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
});

const mapStateToProps = state => ({
  tenant: getApplicationTenant(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
