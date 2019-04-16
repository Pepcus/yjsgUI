import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import headerLogo from '../assets/images/react-logo.png';
import {
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
} from '../actions/studentRegistrationActions';
import { routeType, title } from '../config/headerConfig.json';

const Header = ({
  context,
  location,
  resetAdminCredentials,
  setAdminLoginState,
  setRedirectValue,
  resetVisibleColumnConfig,
}) => {
  const performLogout = () => {
    resetAdminCredentials();
    setAdminLoginState(false);
    setRedirectValue(false);
    resetVisibleColumnConfig();
    localStorage.clear();
  };
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
  const RenderHeaderName = headerObject => (
    <h2
      style={headerObject.titleStyle}
      className="student-info-heading"
    >
      {headerObject.title ? headerObject.title : title}
    </h2>
  );
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
  if (routeType[location]) {
    return (
      <div style={routeType[location].headerWrapperStyle} className="student-logo-header print-media-none">
        {RenderLogo(routeType[location])}
        {RenderHeaderName(routeType[location])}
        {RenderButton(routeType[location])}
      </div>
    );
  } return null;
};

Header.propTypes = {
  routeType: PropTypes.object,
  title: PropTypes.string,
  resetAdminCredentials: PropTypes.func,
  setAdminLoginState: PropTypes.func,
  setRedirectValue: PropTypes.func,
  resetVisibleColumnConfig: PropTypes.func,
  location: PropTypes.string,
  context: PropTypes.object,
};
Header.defaultProps = {
  routeType: {},
  title: '',
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
