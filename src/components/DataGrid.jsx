import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';
import isEmpty from 'lodash/isEmpty';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../card-print.css';

import ColumnConfig from './ColumnConfig';
import { gridMetaData, gridHeaderData, getStyles } from './GridData';
import { allStudentsData,
  getVisibleColumnConfig,
  getSelectValue,
  getSecretKey,
  stateOfRedirect,
  stateOfAdminLogin,
  isGetAllStudentsLoading,
} from '../reducers/studentRegistrationReducer';
import {
  getAllStudentsAction,
  setStudentDataAction,
  updateStudentByAdminAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
  resetVisibleColumnConfigAction,
  resetIsSuccessAction,
  fetchStudentData,
} from '../actions/studentRegistrationActions';
import AdvanceSearch from './AdvanceSearch';
import UploadStudentsAttendanceFile from './UploadStudentsAttendanceFile';
import UploadOptInFile from './UploadOptInFile';
import SelectedStudentsActionWrapper from './SelectedStudentsActionWrapper';
import {
  yjsgHeader,
  adminPassword,
} from '../utils/yjsgConstants';

/**
 * StudentInfoGrid render student information grid.
 * @type {Class}
 */
class StudentInfoGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStudents: [],
      selectValue: this.props.selectValue,
      students: [],
      metaData: gridHeaderData(),
      columnOptionIsOpen: false,
      isStudentDataSet: false,
      advanceFilterIsOpen: false,
      visibleColumnConfig: this.props.visibleColumnConfig,
    };

    // FIXME: Use arrow functions to avoid binding.
    this.openColumnOption = this.openColumnOption.bind(this);
    this.closeColumnOption = this.closeColumnOption.bind(this);
    /*
  Todo: This feature will be implemented in future scope.
    this.openAdvanceFilter = this.openAdvanceFilter.bind(this);
    this.closeAdvanceFilter = this.closeAdvanceFilter.bind(this);*/
    this.setValuesOfVisibleColumnConfig = this.setValuesOfVisibleColumnConfig.bind(this);
    this.renderDataGrid = this.renderDataGrid.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.redirectToAdminLogin = this.redirectToAdminLogin.bind(this);
    this.performLogout = this.performLogout.bind(this);
    this.renderColumnConfig = this.renderColumnConfig.bind(this);
    this.formatMetaData = this.formatMetaData.bind(this);
    this.EditButton = this.EditButton.bind(this);
    this.formattedStudent = this.formattedStudent.bind(this);
    this.getSelectedRow = this.getSelectedRow.bind(this);
  }

  componentWillMount() {
    if (!this.props.redirect) {
      this.redirectToAdminLogin();
    }
    this.setState({
      metaData: this.formatMetaData(this.state.visibleColumnConfig),
    });
  }
  componentDidMount() {
    this.props.getAllStudentsAction({ secretKey: this.props.secretKey });
    if (!this.props.redirect) {
      this.redirectToAdminLogin();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.students !== this.props.students) {
      this.setState({
        students: this.formattedStudent(nextProps.students),
      });
    }
  }
  /**
   * performLogout method will call when click on logout button
   * It reset the admin credentials to false by calling action resetAdminCredentialsAction()
   * It reset the admin login state to false by calling action setAdminLoginStateAction()
   * It reset the visibleColumnConfig to initial
   * state by calling action resetVisibleColumnConfigAction()
   * And clear local store.
   */
  performLogout() {
    this.props.resetAdminCredentialsAction();
    this.props.setAdminLoginStateAction(false);
    this.props.setRedirectValueAction(false);
    this.props.resetVisibleColumnConfigAction();
    localStorage.clear();
  }
  /**
   * getSelectedRow method is call back function which is pass to DataGrid
   * It give selected row data of student on check of check box.
   * @param {Object} selectedRow
   */
  getSelectedRow(selectedRow) {
    this.setState({
      selectedStudents: selectedRow,
    });
  }
  /**
   * openColumnOption method call when onClick of columnConfig button
   * It set the true value of columnOptionIsOpen.
   */
  openColumnOption() {
    this.setState({ columnOptionIsOpen: true });
  }
  /**
   * closeColumnOption method call when onClick of close button of columnConfig modal
   * It set the false value of columnOptionIsOpen.
   */
  closeColumnOption() {
    this.setState({ columnOptionIsOpen: false });
  }
  /**
   * Todo: This feature will be implemented in future scope.
   */
  /* openAdvanceFilter() {
    this.setState({ advanceFilterIsOpen: true });
  }
  closeAdvanceFilter() {
    this.setState({ advanceFilterIsOpen: false });
  }*/
  /**
   * setValuesOfVisibleColumnConfig method set the value of visibleColumnConfig and selectValue
   * And call the formatMetaData method.
   * @param {Object} values,
   * @param {variable} selectValue,
   */
  setValuesOfVisibleColumnConfig(values, selectValue) {
    /**
     * set the value of edit column on the basis of any column selected on not.
     */
    let count = 0;
    for (const key in values) {
      if (values[key]) {
        count += 1;
      }
      if (count > 0) {
        values = { ...values, edit: true };
      } else {
        values = { ...values, edit: false };
      }
    }
    this.setState({
      visibleColumnConfig: values,
      metaData: this.formatMetaData(values),
      selectValue,
    });
    this.props.setVisibleColumnConfigAction(values, selectValue);
  }
  /**
   * formatMetaData method format headerConfig of metaData according to visibleColumnConfig object
   * (set the column which should be render in DataGrid)
   * @param {Object} visibleColumnConfig
   * @return {Object} metaData
   */
  formatMetaData = (visibleColumnConfig) => {
    let metaData = [];
    for (const columnKey in visibleColumnConfig) {
      if (visibleColumnConfig[columnKey]) {
        if (columnKey === 'edit') {
          metaData = [{
            ...gridMetaData.find(metaDataObj => metaDataObj.key === columnKey),
            customComponent: this.EditButton,
          }, ...metaData];
        } else {
          metaData.push(gridMetaData.find(metaDataObj => metaDataObj.key === columnKey));
        }
      }
    }
    return { ...this.state.metaData, headerConfig: metaData };
  };
  /**
   * handleEditClick method call when click on edit button of particular column in DataGrid.
   * And it will converted all value of properties of rowData object into string
   * And pass it to setStudentDataAction action
   * Call  updateStudentByAdminAction action to fetch the information of particular student.
   * set value of isStudentDataSet
   * @param {Object} rowData
   */
  handleEditClick(rowData) {
    const newRowData = { ...rowData,
      id: rowData.studentId,
      age: String(rowData.age),
      mobile: String(rowData.mobile),
      attendance2016: String(rowData.attendance2016),
      attendance2017: String(rowData.attendance2017),
      classRoomNo2016: String(rowData.classRoomNo2016),
      classRoomNo2017: String(rowData.classRoomNo2017),
      marks2016: String(rowData.marks2016),
      marks2017: String(rowData.marks2017) };
    if (!isEmpty(rowData)) {
      this.props.setStudentDataAction(newRowData);
      this.props.updateStudentByAdminAction(rowData.studentId, adminPassword);
      this.setState({
        isStudentDataSet: true,
      });
    }
  }
  /**
   * redirectToStudentCorrection method redirect to "/studentCorrection"
   * when isStudentDataSet value is true(fetch student success)
   * @return {ReactComponent}
   */
  redirectToStudentCorrection() {
    if (this.state.isStudentDataSet) {
      return (
        <div>
          <Redirect to="/studentCorrection" />
        </div>);
    }
    return null;
  }
  /**
   * EditButton is custom component which is pass to DataGrid
   * (Edit button render in each row of DataGrid)
   * And onClick of this button handleEditClick method will call and pass the
   * rowData object(data of that particular row) as a parameter to handleEditClick method
   * @param {Object} rowData,
   * @return {ReactComponent} component,
   */
  EditButton = ({ rowData }) => (
    <div>
      <div className="btn-block display-mobile-none">
        <button onClick={() => { this.handleEditClick(rowData); }} className="btn-grid">
          <i className="fa fa-edit" />
        </button>
      </div>
      <div className="btn-block display-logout-desktop">
        <button onClick={() => { this.handleEditClick(rowData); }} className="btn-grid">
          <i className="fa fa-edit" />
        </button>
      </div>
    </div>

  );
  /**
   * onFilter method pass as call back function to AdvanceSearch react component.
   * onFilter method call the formattedStudent call back function and
   * set the resultant formatted students data in students.
   * @param {Array} result
   */
  onFilter(result) {
    this.setState({
      students: this.formattedStudent(result),
    });
  }
  /**
   * renderColumnConfig method the ColumnConfig react component in render method
   * @return {ReactComponent} ColumnConfig
   */
  renderColumnConfig() {
    if (this.state.columnOptionIsOpen) {
      return (
        <ColumnConfig
          columnOptionIsOpen={this.state.columnOptionIsOpen}
          closeColumnOption={this.closeColumnOption}
          visibleColumnConfig={this.state.visibleColumnConfig}
          setValuesOfVisibleColumnConfig={this.setValuesOfVisibleColumnConfig}
          selectValue={this.state.selectValue}
        />
      );
    }
    return null;
  }
  /**
   * formattedStudent method format students array in which
   * assign id as studentId to object.
   * @param {Array} students
   * @return {Array} students
   */
  formattedStudent(students) {
    return students.map(item =>
      ({ ...item, studentId: String(item.id) }),
    );
  }
  /**
   * renderDataGrid method render DataGrid react component in render method.
   * In case if data is not present than it will render
   * "यहाँ जानकारी उपलब्ध नहीं है।" message instead
   * of DataGrid OR when data is present and headerConfig is empty(column not present)
   * than it will render "आपने शून्य स्तंभों को चुना है इसलिए वहाँ जानकारी उपलब्ध नहीं है।" message.
   * @return {ReactComponent}
   */
  renderDataGrid() {
    if (isEmpty(this.state.metaData.headerConfig)) {
      return (
        <div>
          <div className="empty-column-message">
            <span className="circle-icon">
              <i className="fa fa-exclamation-triangle" />
            </span>
            आपने शून्य स्तंभों को चुना है इसलिए वहाँ जानकारी उपलब्ध नहीं है।
          </div>
        </div>
      );
    } else if (isEmpty(this.state.students)) {
      return (
        <div>
          <div className="empty-column-message">
            <span className="circle-icon">
              <i className="fa fa-exclamation-triangle" />
            </span>
            यहाँ जानकारी उपलब्ध नहीं है।
          </div>
        </div>
      );
    }
    return (
      <div className="print-media-none">
        <DataGrid
          getSelectedRow={this.getSelectedRow}
          data={this.state.students}
          metaData={this.state.metaData}
          styles={getStyles()}
        />
      </div>
    );
  }
  /**
  * redirectToAdminLogin method will redirect to "/adminPanel".
  * @return {String}
  */
  redirectToAdminLogin() {
    return <Redirect to="/adminPanel" />;
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="loader-wrapper">
          <div className="loader">
            <img src="../../spinner.gif" alt="logo" className="loader-img" />
          </div>
        </div>
      );
    }
    if (!(this.props.adminLoginState)) {
      return (
        <div>
          <Redirect to="/admin" />
        </div>
      );
    }
    return (
      <div className="grid-scroll-page-wrapper">
        <div className="grid-scroll-wrapper">
          <div className="print-media-none">
            <div className="student-information-Container">
              <div className="student-logo-header">
                <div className="yjsg-logo">
                  <img src="../../react-logo-1.png" alt="logo" className="yjsg-logo-img" />
                </div>
                <h2 className="student-info-heading">{yjsgHeader}</h2>
                <div className="logoutButtonContainer display-mobile-none">
                  <div className="logoutLinkContainer print-media-none">
                    <Link to="/admin" className="logout-button">
                      <i className="fa fa-arrow-left card-icon" />Back
                    </Link>
                    <Link to="/admin" className="logout-button" onClick={this.performLogout}>
                      <i className="fa fa-power-off card-icon" />Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="logoutButtonContainer display-logout-desktop">
              <div className="logoutLinkContainer">
                <Link to="/admin" className="logout-button">
                  <i className="fa fa-arrow-left" />
                </Link>
                <a className="logout-button" onClick={this.openColumnOption}>
                  <i className="fa fa-cog" />
                </a>
                {this.renderColumnConfig()}
                <Link to="/admin" className="logout-button" onClick={this.performLogout}>
                  <i className="fa fa-power-off" />
                </Link>
              </div>
            </div>
            <div className="modal">
              <div>
                <AdvanceSearch
                  metaData={this.state.metaData}
                  getAllStudentsAction={this.props.getAllStudentsAction}
                  students={this.props.students}
                  onFilter={this.onFilter}
                  formattedStudent={this.formattedStudent}
                />
                <div className="column-option display-mobile-none">
                  <UploadOptInFile />
                  <UploadStudentsAttendanceFile />
                  <div className="column-option-configure display-inline">
                    <button className="column-option-container" onClick={this.openColumnOption}>
                      <i className="fa fa-cog card-icon" />
                      Configure
                    </button>
                    {this.renderColumnConfig()}
                  </div>
                </div>
              </div>
              {/**
              Todo: This feature will be implemented in future scope.
               */}
              {/* <div>
                <button onClick={this.openAdvanceFilter}>Advance Filter</button>
                <AdvanceFilter
                  advanceFilterIsOpen={ this.state.advanceFilterIsOpen}
                  closeAdvanceFilter = {this.closeAdvanceFilter}
                  setInputValue = {this.setInputValue}
                  setStudentData = {this.setStudentData}
                />
                </div>*/}
            </div>
          </div>
          <div>
            {this.redirectToStudentCorrection()}
            <SelectedStudentsActionWrapper
              selectedStudents={this.state.selectedStudents}
              metaData={this.state.metaData}
            />
            {this.renderDataGrid()}
          </div>
        </div>
      </div>

    );
  }
}
StudentInfoGrid.propTypes = {
  adminLoginState: PropTypes.bool,
  students: PropTypes.array,
  isLoading: PropTypes.bool,
  visibleColumnConfig: PropTypes.object,
  selectValue: PropTypes.bool,
  redirect: PropTypes.bool,
  getAllStudentsAction: PropTypes.func,
  secretKey: PropTypes.string,
  resetAdminCredentialsAction: PropTypes.func,
  setAdminLoginStateAction: PropTypes.func,
  setRedirectValueAction: PropTypes.func,
  resetVisibleColumnConfigAction: PropTypes.func,
  setVisibleColumnConfigAction: PropTypes.func,
  setStudentDataAction: PropTypes.func,
  updateStudentByAdminAction: PropTypes.func,
};

StudentInfoGrid.defaultProps = {
  adminLoginState: false,
  students: [],
  isLoading: false,
  selectValue: true,
  redirect: false,
  visibleColumnConfig: {},
  getAllStudentsAction: () => {},
  secretKey: '',
  resetAdminCredentialsAction: () => {},
  setAdminLoginStateAction: () => {},
  setRedirectValueAction: () => {},
  resetVisibleColumnConfigAction: () => {},
  setVisibleColumnConfigAction: () => {},
  setStudentDataAction: () => {},
  updateStudentByAdminAction: () => {},
};

const mapStateToProps = state => ({
  isLoading: isGetAllStudentsLoading(state),
  students: allStudentsData(state),
  visibleColumnConfig: getVisibleColumnConfig(state),
  selectValue: getSelectValue(state),
  redirect: stateOfRedirect(state),
  adminLoginState: stateOfAdminLogin(state),
  secretKey: getSecretKey(state),
});
export default connect(mapStateToProps, {
  fetchStudentData,
  getAllStudentsAction,
  setStudentDataAction,
  updateStudentByAdminAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
  resetVisibleColumnConfigAction,
  resetIsSuccessAction,
})(StudentInfoGrid);
