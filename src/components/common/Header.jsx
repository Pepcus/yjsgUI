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

/**
 * Header render the common header for all route
 * @param {Object} context
 * @param {String} location
 * @param {Function} resetAdminCredentials
 * @param {Function} setAdminLoginState
 * @param {Function} setRedirectValue
 * @param {Function} resetVisibleColumnConfig
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
  const RenderBackButton = (headerObject) => {
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
   * RenderLogOutButton method render logout button in header
    * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const RenderLogOutButton = (headerObject) => {
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
   * RenderHeaderName method render header name in header
    * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const RenderHeaderName = headerObject => (
    <h2
      style={headerObject.titleStyle}
      className="student-info-heading"
    >
      {headerObject.title ? headerObject.title : title}
    </h2>
  );
  /**
   * RenderButton method render buttons with their button wrapper in header.
   * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const RenderButton = (headerObject) => {
    if (headerObject.HeaderContainedButton) {
      return (
        <div
          className="logoutButtonContainer display-mobile-none logoutLinkContainer "
        >
          {RenderBackButton(headerObject)}
          {RenderLogOutButton(headerObject)}
        </div>
      );
    } return null;
  };
  /**
   * RenderLogo method render logo in header
   * @param {Object} headerObject
   * @return {ReactComponent}
   * @constructor
   */
  const RenderLogo = (headerObject) => {
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
  return routes.map((rout) => {
    if (rout.path === location) {
      return (
        <div key={rout.path} style={rout.header.headerWrapperStyle} className="student-logo-header print-media-none">
          {RenderLogo(rout.header)}
          {RenderHeaderName(rout.header)}
          {RenderButton(rout.header)}
        </div>
      );
    } else if (location === '/files') {
      return (
        <div key={rout.path} style={rout.header.headerWrapperStyle} className="student-logo-header print-media-none">
          {RenderLogo(rout.header)}
          {RenderHeaderName(rout.header)}
          {RenderButton(rout.header)}
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
};

const mapDispatchToProps = dispatch => ({
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  setAdminLoginState: () => dispatch(setAdminLoginStateAction()),
  setRedirectValue: () => dispatch(setRedirectValueAction()),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
});


export default connect(null, mapDispatchToProps)(Header);
