import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../card-print.css';

import ColumnConfig from './ColumnConfig';
import LinkButton from './commonComponents/LinkButton';
import { allStudentsData, getVisibleColumnConfig, getSelectValue, getSecretKey } from '../reducers/studentRegistrationReducer';
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
} from '../actions/studentRegistrationActions';
import {
  stateOfRedirect,
  stateOfAdminLogin,
  isGetAllStudentsLoading,
} from '../reducers/studentRegistrationReducer';
import AdvanceSearch from './AdvanceSearch';
import UploadStudentsAttendanceFile from './UploadStudentsAttendanceFile';
import UploadOptInFile from './UploadOptInFile';
import SelectedStudentsActionWrapper from './SelectedStudentsActionWrapper';
import {
  yjsgHeader,
  goBackBtnText,
  adminPassword,
} from '../utils/yjsgConstants';
import {
  fetchStudentData,
} from '../actions/studentRegistrationActions';

const gridMetaData = [
  {
    'label': 'ID',
    'key': 'studentId',
    'type': 'Number',
  },
  {
    'label': 'Name',
    'key': 'name',
    'type': 'string',
  },
  {
    'label': 'Father Name',
    'key': 'fatherName',
    'type': 'string',
  },
  {
    'label': 'Gender',
    'key': 'gender',
    'type': 'string',
  },
  {
    'label': 'Age',
    'key': 'age',
    'type': 'Number',
  },
  {
    'label': 'Education',
    'key': 'education',
    'type': 'string',
  },
  {
    'label': 'Occupation',
    'key': 'occupation',
    'type': 'string',
  },
  {
    'label': 'Mother Mobile No.',
    'key': 'motherMobile',
    'type': 'Number',
  },
  {
    'label': 'Mobile',
    'key': 'mobile',
    'type': 'Number',
  },
  {
    'label': 'Email',
    'key': 'email',
    'type': 'string',
  },
  {
    'label': 'Address',
    'key': 'address',
    'type': 'string',
  },
  {
    'label': 'Bus Number',
    'key': 'busNumber',
    'type': 'string',
  },
  {
    'label': 'Bus Stop',
    'key': 'busStop',
    'type': 'string',
  },
  {
    'label': 'Print Status',
    'key': 'printStatus',
    'type': 'string',
  },
  {
    'label': 'Remark',
    'key': 'remark',
    'type': 'string',
  },
  {
    'label': 'Secret Key',
    'key': 'secretKey',
    'type': 'string',
  },
  {
    'label': '2016 Class Attended',
    'key': 'classAttended2016',
    'type': 'string',
  },
  {
    'label': '2017 Class Attended',
    'key': 'classAttended2017',
    'type': 'string',
  },
  {
    'label': '2018 Class Attended',
    'key': 'classAttended2018',
    'type': 'string',
  },
  {
    'label': '2019 Class Attended',
    'key': 'classAttended2019',
    'type': 'string',
  },
  {
    'label': '2016 Class Room No.',
    'key': 'classRoomNo2016',
    'type': 'Number',
  },
  {
    'label': '2017 Class Room No.',
    'key': 'classRoomNo2017',
    'type': 'Number',
  },
  {
    'label': '2018 Class Room No.',
    'key': 'classRoomNo2018',
    'type': 'Number',
  },
  {
    'label': '2019 Class Room No.',
    'key': 'classRoomNo2019',
    'type': 'Number',
  },
  {
    'label': '2016 Attendance',
    'key': 'attendance2016',
    'type': 'Number',
  },
  {
    'label': '2017 Attendance',
    'key': 'attendance2017',
    'type': 'Number',
  },
  {
    'label': '2018 Attendance',
    'key': 'attendance2018',
    'type': 'Number',
  },
  {
    'label': '2019 Attendance',
    'key': 'attendance2019',
    'type': 'Number',
  },
  {
    'label': '2016 Marks',
    'key': 'marks2016',
    'type': 'Number',
  },
  {
    'label': '2017 Marks',
    'key': 'marks2017',
    'type': 'Number',
  },
  {
    'label': '2018 Marks',
    'key': 'marks2018',
    'type': 'Number',
  },
  {
    'label': '2019 Marks',
    'key': 'marks2019',
    'type': 'Number',
  },
  {
    'label': '2018 Opt In',
    'key': 'optIn2018',
    'type': 'string',
  },
  {
    'label': '2019 Opt In',
    'key': 'optIn2019',
    'type': 'string',
  },
  {
    'label': 'Day 1',
    'key': 'day1',
    'type': 'string',
  },
  {
    'label': 'Day 2',
    'key': 'day2',
    'type': 'string',
  },
  {
    'label': 'Day 3',
    'key': 'day3',
    'type': 'string',
  },
  {
    'label': 'Day 4',
    'key': 'day4',
    'type': 'string',
  },
  {
    'label': 'Day 5',
    'key': 'day5',
    'type': 'string',
  },
  {
    'label': 'Day 6',
    'key': 'day6',
    'type': 'string',
  },
  {
    'label': 'Day 7',
    'key': 'day7',
    'type': 'string',
  },
  {
    'label': 'Day 8',
    'key': 'day8',
    'type': 'string',
  },
  {
    'label': 'Created Date',
    'key': 'createdDate',
    'type': 'string',
  },
  {
    'label': 'Last Modified Date',
    'key': 'lastModifiedDate',
    'type': 'string',
  },
  {
    'label': 'Edit',
    'key': 'edit',
    'disableFilter': true,
    'excludeFromExport': true,
  },
];
const gridHeaderData = () => ({
  headerConfig: gridMetaData,
  topDrawer: {
    'pagination': false,
    'globalSearch': false,
    'clearButton': true,
    'exportButton': true,
    'totalRecords': false,
  },
  bottomDrawer: {
    'pagination': true,
    'globalSearch': false,
    'clearButton': false,
    'exportButton': false,
    'totalRecords': true,
  },
  enableRowSelection: true,
  enableAllRowSelection: true,
  recordsPerPage: 25,
  drawerPosition: 'top',
  includeAllInGlobalFilter: false,
  includeGlobalFilter: true,
});

const getStyles = () => ({
  gridWrapper: {
    'width': 'auto',
  },
});
class DataGrid1 extends Component {
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
    this.openColumnOption = this.openColumnOption.bind(this);
    this.closeColumnOption = this.closeColumnOption.bind(this);
    this.openAdvanceFilter = this.openAdvanceFilter.bind(this);
    this.closeAdvanceFilter = this.closeAdvanceFilter.bind(this);
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
  performLogout() {
    this.props.resetAdminCredentialsAction();
    this.props.setAdminLoginStateAction(false);
    this.props.setRedirectValueAction(false);
    this.props.resetVisibleColumnConfigAction();
    localStorage.clear();
  }
  getSelectedRow(selectedRow) {
    this.setState({
      selectedStudents: selectedRow,
    });
  }
  openColumnOption() {
    this.setState({ columnOptionIsOpen: true });
  }
  closeColumnOption() {
    this.setState({ columnOptionIsOpen: false });
  }
  openAdvanceFilter() {
    this.setState({ advanceFilterIsOpen: true });
  }
  closeAdvanceFilter() {
    this.setState({ advanceFilterIsOpen: false });
  }
  setValuesOfVisibleColumnConfig(values, selectValue) {
    this.setState({
      visibleColumnConfig: values,
      metaData: this.formatMetaData(values),
      selectValue,
    });
    this.props.setVisibleColumnConfigAction(values, selectValue);
  }

  formatMetaData = (visibleColumnConfig) => {
    const metaData = [];
    for (const columnKey in visibleColumnConfig) {
      if (visibleColumnConfig[columnKey]) {
        if (columnKey === 'edit') {
          metaData.push({
            ...gridMetaData.find(metaDataObj => metaDataObj.key === columnKey),
            customComponent: this.EditButton,
          });
        } else {
          metaData.push(gridMetaData.find(metaDataObj => metaDataObj.key === columnKey));
        }
      }
    }
    return { ...this.state.metaData, headerConfig: metaData };
  };
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
      // this.props.fetchStudentData(rowData.studentId, adminPassword);
      this.props.updateStudentByAdminAction(rowData.studentId, adminPassword);
      this.setState({
        isStudentDataSet: true,
      });
    }
  }
  redirectToStudentCorrection() {
    if (this.state.isStudentDataSet) {
      return (
        <div>
          <Redirect to="/studentCorrection" />
        </div>);
    }
    return null;
  }
  EditButton = ({ rowData }) => (
    <div>
      <div className="btn-block display-mobile-none">
        <button onClick={() => { this.handleEditClick(rowData); }} className="btn-grid">
          <i className="fa fa-edit" />Edit
        </button>
      </div>
      <div className="btn-block display-logout-desktop">
        <button onClick={() => { this.handleEditClick(rowData); }} className="btn-grid">
          <i className="fa fa-edit" />
        </button>
      </div>
    </div>

  );
  componentWillReceiveProps(nextProps) {
    if (nextProps.students !== this.props.students) {
      this.setState({
        students: this.formattedStudent(nextProps.students),
      });
    }
  }
  onFilter(result) {
    this.setState({
      students: this.formattedStudent(result),
    });
  }
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
  }
  formattedStudent(students) {
    return students.map(item =>
      ({ ...item, studentId: String(item.id) }),
    );
  }
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
              {/*
Todo: This feature will be implemented in future scope.
     <div>
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
DataGrid.propTypes = {
  adminLoginState: PropTypes.bool,
  students: PropTypes.array,
  isLoading: PropTypes.bool,
  visibleColumnConfig: PropTypes.object,
  selectValue: PropTypes.bool,
  redirect: PropTypes.bool,
};

DataGrid.defaultProps = {
  adminLoginState: false,
  students: [],
  isLoading: false,
  selectValue: true,
  redirect: false,
  visibleColumnConfig: {},
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
})(DataGrid1);
