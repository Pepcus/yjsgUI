import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import reactLogo1 from '../assets/images/react-logo-1.png';
import {
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  resetVisibleColumnConfigAction,
} from '../actions/studentRegistrationActions';
import { routeType } from '../config/headerConfig.json';

const Header = ({
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
          to={headerObject.backButtonRedirectTo}
          style={headerObject.backButtonStyle}
          className="grid-small-button">
          <i className="fa fa-arrow-left card-icon" />Back
        </Link>
      );
    }
  };
  const RenderLogOutButton = (headerObject) => {
    if (headerObject.logoutButton) {
      return (
        <Link
          to={headerObject.logoutButtonRedirectTo}
          style={headerObject.logoutButtonStyle}
          onClick={performLogout}
          className="grid-small-button">
          <i className="fa fa-power-off card-icon" />Logout
        </Link>
      );
    }
  };
  const RenderHeaderName = (headerObject) => {
    return (
      <h2
        style={headerObject.headerNameStyle}
        className="student-info-heading">
        {headerObject.headerName}
      </h2>
    );
  };
  const RenderButton = (headerObject) => {
    if (headerObject.HeaderContainedButton === 'Yes') {
      return (
        <div
          style={headerObject.buttonWrapperStyle}
          className="logoutButtonContainer display-mobile-none logoutLinkContainer ">
          {RenderBackButton(headerObject)}
          {RenderLogOutButton(headerObject)}
        </div>
      );
    } return null;
  };
  const RenderLogo = (headerObject) => {
    if (headerObject.logo === 'Yes') {
      return (
        <div
          style={headerObject.logWrapperStyle}
          className="yjsg-logo">
          <img
            src={reactLogo1}
            alt="logo"
            style={headerObject.logoStyle}
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
  resetAdminCredentials: PropTypes.func,
  setAdminLoginState: PropTypes.func,
  setRedirectValue: PropTypes.func,
  resetVisibleColumnConfig: PropTypes.func,
  location: PropTypes.string,
};
Header.defaultProps = {
  resetAdminCredentials: () => {},
  setAdminLoginState: () => {},
  setRedirectValue: () => {},
  resetVisibleColumnConfig: () => {},
  location: '',
};

const mapDispatchToProps = dispatch => ({
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  setAdminLoginState: () => dispatch(setAdminLoginStateAction()),
  setRedirectValue: () => dispatch(setRedirectValueAction()),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
});


export default connect(null, mapDispatchToProps)(Header);
