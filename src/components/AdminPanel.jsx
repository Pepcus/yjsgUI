import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Link } from 'react-router-dom';

import {
  adminId,
  adminPassword,
  goBackBtnText,
  invalidAdminMsg,
  adminSearchOptions,
  yjsgHeader, adminLoginBtnText,
} from '../utils/yjsgConstants';
import {
  getAdminId,
  getAdminPassword,
  getSearchResults,
  isLoading,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';
import SelectListInputField from './formComponents/SelectListInputField';
import Table from './commonComponents/Table';
import Button from './commonComponents/Button';
import InputField from './formComponents/InputField';
import { setRegistrationData } from '../utils/registrationFormUtils';
import {
  clearSearchResultsAction,
  fetchSearchResultsAction,
  setAdminCredentials,
  setAdminLoginState,
  setRedirectValue,
} from '../actions/studentRegistrationActions';
import LinkButton from './commonComponents/LinkButton';

class AdminPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      search: {},
      redirect: false
      // students: [],
    };
    this.props.clearSearchResultsAction();
    this._handleInputChange = this.handleInputChange.bind(this);
    this.populateResults = this.populateResults.bind(this);
    this.performLogout = this.performLogout.bind(this);
    this._checkValidKey = this.checkValidKey.bind(this);
    this._setRedirectValue = this.setRedirectValue.bind(this);
  }

 /* componentDidMount() {
    this.props.getAllStudentsAction();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.students!== this.props.students) {
      this.setState({
        students: nextProps.students,
      });
    }
  }*/
  handleInputChange(value, name) {
    let updatedData = extend(cloneDeep(this.state.search),
      setRegistrationData(value, name));

    this.setState({
      search: updatedData,
    })
  }

  performLogout() {
    this.props.setAdminCredentials('', '');
    this.props.setAdminLoginState(false);
    this.props.setRedirectValue(false);
  }

  populateResults() {
    this.props.clearSearchResultsAction();
    const { selectSearchOption, searchText } = this.state.search;
    if (!isEmpty(selectSearchOption) && !isEmpty(searchText)) {
      this.props.fetchSearchResultsAction(adminPassword, selectSearchOption, searchText)
    }
  }

  renderResultsTable() {
    const { searchResults } = this.props;
    if (!isEmpty(searchResults.students)) {
      return <Table data={searchResults.students} headings={['ID', 'Name', 'Father Name', 'Mobile']} />
    } if (!isEmpty(searchResults.message)) {
      return <h5>{'No search records found'}</h5>;
    }
    return <h5>{'Your Search Results will appear here.'}</h5>;
  }
  componentWillMount(){
    if (this.props.adminLoginState) {
      this.setState({
        redirect: true
      });
      this.props.setRedirectValue(true);
    }
  }
  setRedirectValue() {
    if (this.props.adminLoginState) {
      this.setState({
        redirect: true
      });
      this.props.setRedirectValue(true);
    } else {
      alert('Invalid Admin')
    }
  }
  checkValidKey(){
    if(this.state.redirect) {
      return <Redirect to={'/dataGrid'}/>
    }
  }
  render() {
    const {
      id,
      password,
    } = this.props;

    if (id !== adminId || password !== adminPassword) {
      return (
        <div className={'errorPopupContainer'}>
          <div className={"popup"}>
            <div className={"popupContainer"}>
              <h5>{invalidAdminMsg}</h5>
              <LinkButton
                buttonText={goBackBtnText}
                linkPath={'/'}
              />
            </div>
          </div>
        </div>
      );
    }

    if(this.props.isLoading) {
      return (
        <div className={"popup"}>
          <div className={"popupContainer"}>
            <h5>{'Loading...'}</h5>
          </div>
        </div>
      );
    }

    return (
      <div className={'adminPanelContainer'}>
        <div className={'adminPanelHeader'}>
          <div className={'adminPanelHeading'}><h3>{yjsgHeader}</h3></div>
          <div className={'logoutButtonContainer'}>
            <div className={'logoutLinkContainer'}>
              <Link
                to={'/'}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  padding: '5px',
                  padding: '5px 17px',
                  border: '1px solid #fffefd',

                  '&:hover': {
                    color: '#000',
                    backgroundColor: 'rgb(231, 104, 14)',
                    transition: '0.3s all'
                  }
                }}
                onClick={this.performLogout}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
        {/*<div className={'adminPanelContent'}>
          <div className={'adminSearchContainer'}>
            <div className={'adminSearchContent'}>
              /!*<SelectListInputField
                name={'selectSearchOption'}
                label={'Select Search Option'}
                options={adminSearchOptions}
                onInputChange={this._handleInputChange}
                value={this.state.search.selectSearchOption}
              />
              <InputField
                type={'text'}
                label={'Enter Search Text'}

                name={'searchText'}
                onInputChange={this._handleInputChange}
                value={this.state.search.searchText}
              />
              <Button
                buttonText={'Search'}
                onClick={this.populateResults}
              />*!/
              {this._checkValidKey()}
              <div className="student-registration-wrapper">
                <Button
                  buttonText={'Student Information'}
                  onClick={this._setRedirectValue}
                />
              </div>
            </div>
          </div>
          /!*<div className={'adminResultsContainer'}>
            <div className={'adminResultsContent'}>
              {this.renderResultsTable()}
            </div>
          </div>*!/
        </div>*/}
        <div className="student-registration-wrapper">
          <div className="student-information-wrapper">
            {this._checkValidKey()}
            <Button
              buttonText={'Student Information'}
              onClick={this._setRedirectValue}
            />
          </div>

        </div>
      </div>
    )
  }
}

AdminPanel.propTypes = {
  fetchSearchResultsAction: PropTypes.func.isRequired,
  setAdminCredentials: PropTypes.func.isRequired,
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
 // students: allStudentsData(state),
});

export default connect(mapStateToProps, {
  fetchSearchResultsAction,
  setAdminCredentials,
  clearSearchResultsAction,
  //getAllStudentsAction,
  setRedirectValue,
  setAdminLoginState,
})(AdminPanel);