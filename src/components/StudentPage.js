import React, { Component } from 'react';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import extend from 'lodash/extend';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkButton from './commonComponents/LinkButton';
import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
} from '../actions/studentRegistrationActions';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  getStudent,
  isFetched,
  isLoading,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';

import yjsgLogo from '../assets/yjsgLogo.png';
import {
  yjsgHeader,
  eventDate,
  eventVenue,
  alreadyRegisteredBtnText,
  newRegistrationBtnText,
} from '../utils/yjsgConstants';
import { setRegistrationData } from '../utils/registrationFormUtils';
import { getParameterByName } from '../utils/http';
import { setRedirect } from './DataGrid';

class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCorrection: false,
      credentials: {},
      admin: {},
      isURLParams: false,
      registeredStudentCredentialErrorMessage:false,
    };

    this._enableEditInfo = this.enableEditInfo.bind(this);
    this._handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    const id = getParameterByName('id');
    const secretCode = getParameterByName('secCode');
    if (id && secretCode) {
      this.fetchStudentByURLParams(id, secretCode);
    }
  }

  fetchStudentByURLParams(id, secretCode) {
    this.props.setStudentCredentials(id, secretCode);
    this.props.fetchStudentData(id, secretCode);
    this.setState({
      isURLParams: true,
    })
  }

  enableEditInfo() {
    this.setState({
      isCorrection: true,
    })
  }

  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.credentials),
      setRegistrationData(value, name));

    let adminData = extend(cloneDeep(this.state.admin),
      setRegistrationData(value, name));

    this.setState({
      credentials: updatedData,
      admin: adminData,
      adminCredentialErrorMessage: false,
      registeredStudentCredentialErrorMessage: false,
    });
  }

  renderLoginField() {
    if (this.state.isCorrection) {
      return <Switch><Redirect to={'/student-login'} /></Switch>
    }
    else {
      return (
        <div>
          <Button
            buttonText={alreadyRegisteredBtnText}
            onClick={this._enableEditInfo}
          />
          <LinkButton
            buttonText={newRegistrationBtnText}
            linkPath={'/studentRegister'}
          />
        </div>
      )
    }
  }


  render() {
    if (this.state.isURLParams) {
      return <Switch><Redirect to={'/studentCorrection'} /></Switch>
    }
    return (
      <div className="landing-page-block">
        <div className={'landingPageContainer'}>
          <h2 className="student-heading">{yjsgHeader}</h2>
        </div>
        <div className="landing-page-wrapper">
          <div className={'landingPageContent'}>
            <div className={'yjsg-event-info'}>
              <h5 className="primary-color">{eventDate}</h5>
              <h5 className="header-text">{eventVenue}</h5>
            </div>
            <div className={'landingPageLogo'}>
              <img src={yjsgLogo} alt={'yjsg logo'} />
            </div>
            <div className={'landingPageButtonContainer'}>
              {this.renderLoginField()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SplashPage.propTypes = {
  fetchStudentData: PropTypes.func,
};

SplashPage.defaultProps = {
  fetchStudentData: () => {},
};
const mapStateToProps = state => ({
  id: getAdminId(state),
  password: getAdminPassword(state),
  isLoading: isLoading(state),
  searchResults: getSearchResults(state),
  adminLoginState: stateOfAdminLogin(state),
  studentData: getStudent(state),
  isFetched: isFetched(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  setStudentCredentials,
  setAdminCredentialsAction,
  setAdminLoginStateAction,
})(SplashPage);
