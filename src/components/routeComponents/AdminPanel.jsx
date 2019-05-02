import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { Redirect } from 'react-router-dom';

import {
  adminId,
  adminPassword,
} from '../../appConstants/yjsgConstants';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  isLoading,
  stateOfAdminLogin,
} from '../../reducers/studentRegistrationReducer';
import { setRegistrationData } from '../../utils/registrationFormUtils';
import {
  clearSearchResultsAction,
  fetchSearchResultsAction,
  setAdminCredentialsAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
} from '../../actions/studentRegistrationActions';
import LinkButton from '../common/LinkButton';

// FIXME: Add missing propTypes and defaultProps.
//  Fix EsLint issues.
//  Add missing JSDocs.
//  Is this component in use? Please specify
/**
 * This component may use in future
 * @type {Class}
 */
class AdminPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: {},
      redirect: false,
    };
    // FIXME: Use arrow functions to avoid binding.
    this.props.clearSearchResultsAction();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.populateResults = this.populateResults.bind(this);
    this.performLogout = this.performLogout.bind(this);
    this._checkValidKey = this.checkValidKey.bind(this);
    this._setRedirectValue = this.setRedirectValue.bind(this);
  }
  componentWillMount() {
    if (this.props.adminLoginState) {
      this.props.setRedirectValueAction(true);
    }
  }

  handleInputChange(value, name) {
    const updatedData = extend(cloneDeep(this.state.search),
      setRegistrationData(value, name));

    this.setState({
      search: updatedData,
    });
  }

  performLogout() {
    this.props.resetAdminCredentialsAction();
    this.props.setAdminLoginStateAction(false);
    this.props.setRedirectValueAction(false);
  }

  populateResults() {
    this.props.clearSearchResultsAction();
    const { selectSearchOption, searchText } = this.state.search;
    if (!isEmpty(selectSearchOption) && !isEmpty(searchText)) {
      this.props.fetchSearchResultsAction({
        adminKey: adminPassword,
        searchKey: selectSearchOption,
        searchValue: searchText,
      });
    }
  }

  setRedirectValue() {
    if (this.props.adminLoginState) {
      this.setState({
        redirect: true,
      });
      this.props.setRedirectValueAction(true);
    } else {
      alert('Invalid Admin');
    }
  }
  checkValidKey() {
    if (this.state.redirect) {
      return <Redirect to="/adminPanel" />;
    }
  }
  render() {
    const {
      id,
      password,
    } = this.props;

    if (id !== adminId || password !== adminPassword) {
      return (
        <div>
          <Redirect to="/admin" />
        </div>
      );
    }

    if (this.props.isLoading) {
      return (
        <div className="popup">
          <div className="popupContainer">
            <h5>Loading...</h5>
          </div>
        </div>
      );
    }

    return (
      <div className="adminPanelContainer">
        <div className="student-information-section">
          <div className="student-registration-wrapper">
            <div className="student-information-wrapper">
              <div className="student-information-header">Student Information</div>
              <div className="student-information-text">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur.
                </p>

                {this._checkValidKey()}

                <LinkButton
                  buttonText="Student Information"
                  onClick={this._setRedirectValue}
                  linkPath="/student-search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  fetchSearchResultsAction: PropTypes.func.isRequired,
  setAdminCredentialsAction: PropTypes.func.isRequired,
  resetAdminCredentialsAction: PropTypes.func.isRequired,
  clearSearchResultsAction: PropTypes.func.isRequired,
  searchResults: PropTypes.object,
};

AdminPanel.defaultProps = {
  searchResults: {},
};

const mapStateToProps = state => ({
  id: getAdminId(state),
  password: getAdminPassword(state),
  isLoading: isLoading(state),
  searchResults: getSearchResults(state),
  adminLoginState: stateOfAdminLogin(state),
});

export default connect(mapStateToProps, {
  fetchSearchResultsAction,
  setAdminCredentialsAction,
  clearSearchResultsAction,
  setRedirectValueAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
})(AdminPanel);
