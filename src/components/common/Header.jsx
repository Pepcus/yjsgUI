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
import { headerConfig } from '../../config/appConfig.json';

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
      {headerObject.title ? headerObject.title : headerConfig.title}
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
  if (headerConfig.routeType[location]) {
    return (
      <div style={headerConfig.routeType[location].headerWrapperStyle} className="student-logo-header print-media-none">
        {RenderLogo(headerConfig.routeType[location])}
        {RenderHeaderName(headerConfig.routeType[location])}
        {RenderButton(headerConfig.routeType[location])}
      </div>
    );
  } return (
    <div style={headerConfig.routeType.default.headerWrapperStyle} className="student-logo-header print-media-none">
      {RenderLogo(headerConfig.routeType.default)}
      {RenderHeaderName(headerConfig.routeType.default)}
      {RenderButton(headerConfig.routeType.default)}
    </div>
  );
};

Header.propTypes = {
  headerConfig: PropTypes.object,
  resetAdminCredentials: PropTypes.func,
  setAdminLoginState: PropTypes.func,
  setRedirectValue: PropTypes.func,
  resetVisibleColumnConfig: PropTypes.func,
  location: PropTypes.string,
  context: PropTypes.object,
};
Header.defaultProps = {
  headerConfig: {},
  resetAdminCredentials: () => {},
  setAdminLoginState: () => {},
  setRedirectValue: () => {},
  resetVisibleColumnConfig: () => {},
  location: '',
  context: {},
};

const mapDispatchToProps = dispatch => ({
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  setAdminLoginState: () => dispatch(setAdminLoginStateAction()),
  setRedirectValue: () => dispatch(setRedirectValueAction()),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
});


export default connect(null, mapDispatchToProps)(Header);
