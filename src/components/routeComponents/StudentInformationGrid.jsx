import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';
import isEmpty from 'lodash/isEmpty';
import {
  Redirect,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { manageStudentTableWidth } from '../../utils/dataGridUtils';
import '../../assets/css/card-print.css';
import ColumnConfig from '../ColumnConfig';
import {
  gridMetaData,
  gridHeaderData,
  getStyles,
} from '../../constants/gridData';
import {
  allStudentsData,
  getVisibleColumnConfig,
  getSelectValue,
  getSecretKey,
  stateOfRedirect,
  stateOfAdminLogin,
  getStudent,
} from '../../reducers/studentRegistrationReducer';
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
  fetchStudentDataAction,
  setUserTypeAction,
} from '../../actions/studentRegistrationActions';
import AdvanceSearch from '../AdvanceSearch';
import UploadStudentsAttendanceFile from '../UploadStudentsAttendanceFile';
import UploadOptInFile from '../UploadOptInFile';
import SelectedStudentsActionWrapper from '../SelectedStudentsActionWrapper';
import {
  adminPassword,
  USER_TYPES,
} from '../../constants/yjsg';
import {
  NO_COLUMNS_SELECTED_MESSAGE,
  INFORMATION_NOT_AVAILABLE_MESSAGE,
} from '../../constants/messages';
import { FILE_DOWNLOAD_MESSAGE } from '../../constants/text';

/**
 * StudentInformationGrid render student information grid.
 * @type {Class}
 */
class StudentInformationGrid extends Component {

  constructor(props) {
    super(props);

    this.widthRef = React.createRef();

    this.state = {
      fileDownloadMessage: false,
      checkedIds: [],
      selectedStudents: [],
      selectValue: this.props.selectValue,
      students: [],
      metaData: gridHeaderData(),
      columnOptionIsOpen: false,
      isStudentDataSet: false,
      advanceFilterIsOpen: false,
      visibleColumnConfig: this.props.visibleColumnConfig,
      refresh: false,
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
    this.formatStudents = this.formatStudents.bind(this);
    this.getSelectedRow = this.getSelectedRow.bind(this);
    this.refreshStudentsGrid = this.refreshStudentsGrid.bind(this);
    this.setAllStudentsAsUnchecked = this.setAllStudentsAsUnchecked.bind(this);
    this.getSelectedStudents = this.getSelectedStudents.bind(this);
  }

  componentWillMount() {

    const { redirect } = this.props;
    const { visibleColumnConfig } = this.state;

    if (!redirect) {
      this.redirectToAdminLogin();
    }
    this.setState({
      metaData: this.formatMetaData(visibleColumnConfig),
    });
  }

  componentDidMount() {

    const { students, secretKey, redirect } = this.props;

    if (isEmpty(students)) {
      this.props.getAllStudentsAction({ secretKey });

    } else {
      this.setState({
        students: this.formatStudents(students),
        checkedIds: this.setAllStudentsAsUnchecked(students),
      });

      const idCheckStatusList = this.setAllStudentsAsUnchecked(students);

      this.getSelectedStudents(idCheckStatusList);
    }

    if (!redirect) {
      this.redirectToAdminLogin();
    }
  }

  componentWillReceiveProps(nextProps) {

    const { students } = this.props;
    const { refresh } = this.state;

    if (isEmpty(students)) {
      if (nextProps.students !== students) {
        this.setState({
          students: this.formatStudents(nextProps.students),
          checkedIds: this.setAllStudentsAsUnchecked(nextProps.students),
        });

        const idCheckStatusList = this.setAllStudentsAsUnchecked(nextProps.students);

        this.getSelectedStudents(idCheckStatusList);
      }

    } else {
      this.setState({
        students: this.formatStudents(students),
        checkedIds: this.setAllStudentsAsUnchecked(students),
      });

      const idCheckStatusList = this.setAllStudentsAsUnchecked(students);

      this.getSelectedStudents(idCheckStatusList);
    }

    if (refresh) {
      if (nextProps.students !== students) {
        this.setState({
          students: this.formatStudents(nextProps.students),
          refresh: false,
          checkedIds: this.setAllStudentsAsUnchecked(nextProps.students),
        });

        const idCheckStatusList = this.setAllStudentsAsUnchecked(nextProps.students);

        this.getSelectedStudents(idCheckStatusList);
      }
    }
  }

  componentDidUpdate() {
    manageStudentTableWidth(this.widthRef);
  }

  /**
   * onClickAllExport method set all export popup message state.
   * @param {boolean} value
   */
  onClickAllExport = (value) => {
    this.setState({
      fileDownloadMessage: value,
    });
  };

  /**
   * call back for onClickAllExport
   */
  onClickFileDownloadOkButton = () => {
    this.onClickAllExport(false);
  };

  /**
   * renderFileDownloadMessagePopup method render the all export csv popup message
   * @return {HTML}
   */
  renderFileDownloadMessagePopup = () => {

    const { fileDownloadMessage } = this.state;

    if (fileDownloadMessage) {
      return (
        <div className="download-message-popup">
          <div className="download-message-popup-container">
            <h5 className="message">{FILE_DOWNLOAD_MESSAGE}</h5>
            <div className="message-button-container">
              <button className="ok-button" onClick={this.onClickFileDownloadOkButton}>OK</button>
            </div>
          </div>
        </div>
      );
    } return null;
  };

  /**
   * setAllStudentsAsUnchecked method make isChecked to false
   * in student object
   * @param {Array} students
   * @return {Array}
   */
  setAllStudentsAsUnchecked(students) {
    return students.map(student => ({ id: student.id, isChecked: false }));
  }

  /**
   * refreshStudentsGrid method refresh the student information in student grid
   * by calling getAllStudentsAction
   */
  refreshStudentsGrid() {

    const { secretKey } = this.props;

    this.props.getAllStudentsAction({ secretKey });
    this.setState({
      refresh: true,
    });
  }

  /**
   * getSelectedStudents method is call back function pass to the DataGrid
   * which gives the selected and unselected students Id with isChecked flag.
   * and modify the student object according to isChecked flag.
   * @param {Array} idCheckStatusList
   */
  getSelectedStudents(idCheckStatusList) {

    const { students } = this.props;
    const checkedStudents = [];

    idCheckStatusList.forEach((idCheckStatusObject) => {
      students.forEach((student) => {
        if (idCheckStatusObject.isChecked) {
          if (Number(student.id) === idCheckStatusObject.id) {
            checkedStudents.push({ ...student, studentId: String(student.id) });
          }
        }
      });
    });
    this.setState({
      selectedStudents: checkedStudents,
    });
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

    const { students, checkedIds } = this.state;
    let listOfIsCheckedStatusStudentIds = [];

    const studentsData = students.map((student) => {

      const { studentId } = student;
      let studentObject = { ...student, id: Number(studentId) };

      selectedRow.forEach((selectedRowStudent) => {

        if (String(selectedRowStudent.studentId) === String(studentId)) {
          studentObject = { ...student,
            id: Number(studentId),
            studentId: String(studentId),
            isChecked: selectedRowStudent.isChecked,
          };
          listOfIsCheckedStatusStudentIds.push({
            id: Number(studentId),
            isChecked: selectedRowStudent.isChecked,
          });
        }
      });
      return studentObject;
    });

    const idCheckStatusList = checkedIds.map((idCheckStatusObject) => {

      let finalIdCheckStatusObject = idCheckStatusObject;
      listOfIsCheckedStatusStudentIds.forEach((checkedUncheckedStudentIdObject) => {
        if (Number(idCheckStatusObject.id) === Number(checkedUncheckedStudentIdObject.id)) {
          finalIdCheckStatusObject = checkedUncheckedStudentIdObject;
        }
      });
      return finalIdCheckStatusObject;
    });

    this.getSelectedStudents(idCheckStatusList);
    this.setState({
      students: studentsData,
      checkedIds: idCheckStatusList,
    });
    listOfIsCheckedStatusStudentIds = [];
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

    const { studentData } = this.props;
    const { studentId } = rowData;
    const { ADMIN } = USER_TYPES;

    if (!isEmpty(rowData)) {
      this.props.fetchStudentDataAction(String(studentId), adminPassword);
      this.props.setStudentDataAction(studentData);
      this.props.updateStudentByAdminAction(String(studentId), adminPassword);
      this.props.setUserTypeAction(ADMIN);
      this.setState({
        isStudentDataSet: true,
      });
    }
  }

  /**
   * redirectToStudentCorrection method redirect to "/studentCorrection"
   * when isStudentDataSet value is true(fetch student success)
   * @return {HTML}
   */
  redirectToStudentCorrection() {

    const { isStudentDataSet } = this.state;

    if (isStudentDataSet) {
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
   * @return {HTML} component,
   */
  EditButton = ({ rowData }) => (
    <div>
      <div className="btn-block display-mobile-none">
        <button onClick={() => { this.handleEditClick(rowData); }} title="Edit" className="btn-grid">
          <i className="fa fa-edit" />
        </button>
      </div>
      <div className="btn-block display-logout-desktop">
        <button onClick={() => { this.handleEditClick(rowData); }} title="Edit" className="btn-grid">
          <i className="fa fa-edit" />
        </button>
      </div>
    </div>
  );

  /**
   * onFilter method pass as call back function to AdvanceSearch react component.
   * onFilter method call the formatStudents call back function and
   * set the resultant formatted students data in students.
   * @param {Array} result
   */
  onFilter(result) {
    this.setState({
      students: this.formatStudents(result),
    });
  }

  /**
   * renderColumnConfig method the ColumnConfig react component in render method
   * @return {HTML} ColumnConfig
   */
  renderColumnConfig() {

    const { columnOptionIsOpen, visibleColumnConfig, selectValue } = this.state;

    if (columnOptionIsOpen) {
      return (
        <ColumnConfig
          columnOptionIsOpen={columnOptionIsOpen}
          closeColumnOption={this.closeColumnOption}
          visibleColumnConfig={visibleColumnConfig}
          setValuesOfVisibleColumnConfig={this.setValuesOfVisibleColumnConfig}
          selectValue={selectValue}
        />
      );
    }
    return null;
  }

  /**
   * formatStudents method format students array in which
   * assign id as studentId to object.
   * @param {Array} students
   * @return {Array} students
   */
  formatStudents(students) {
    return students.map((item) => {
      if (!('studentId' in item)) {
        return ({ ...item, studentId: String(item.id), isChecked: false });
      }
      return item;
    },
    );
  }

  /**
   * renderDataGrid method render DataGrid react component in render method.
   * In case if data is not present than it will render
   * "यहाँ जानकारी उपलब्ध नहीं है।" message instead
   * of DataGrid OR when data is present and headerConfig is empty(column not present)
   * than it will render "आपने शून्य स्तंभों को चुना है इसलिए वहाँ जानकारी उपलब्ध नहीं है।" message.
   * @return {HTML}
   */
  renderDataGrid() {

    const { metaData, students } = this.state;

    if (isEmpty(metaData.headerConfig)) {
      return (
        <div>
          <div className="empty-column-message">
            <span className="circle-icon">
              <i className="fa fa-exclamation-triangle" />
            </span>
            {NO_COLUMNS_SELECTED_MESSAGE}
          </div>
        </div>
      );

    } else if (isEmpty(students)) {
      return (
        <div>
          <div className="empty-column-message">
            <span className="circle-icon">
              <i className="fa fa-exclamation-triangle" />
            </span>
            {INFORMATION_NOT_AVAILABLE_MESSAGE}
          </div>
        </div>
      );
    }

    return (
      <div className="print-media-none">
        <DataGrid
          getSelectedRow={this.getSelectedRow}
          data={students}
          metaData={metaData}
          styles={getStyles()}
          onClickAllExport={this.onClickAllExport}
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

  /**
   * clearSelectedStudents method will clear all selected records".
   */
  clearSelectedStudents = () => {

    const { students } = this.props;

    this.setState({
      selectedStudents: [],
      students: this.formatStudents(students),
      checkedIds: this.setAllStudentsAsUnchecked(students),
    });
  };

  render() {

    const { adminLoginState, students } = this.props;
    const { metaData, checkedIds, selectedStudents } = this.state;

    if (!(adminLoginState)) {
      return (
        <div>
          <Redirect to="/admin" />
        </div>
      );
    }

    return (
      <div className="grid-scroll-page-wrapper">
        <div className="grid-scroll-wrapper" ref={this.widthRef}>
          <div className="print-media-none" >
            <div className="logoutButtonContainer display-logout-desktop">
              <div className="logoutLinkContainer">
                <Link to="/admin" className="grid-small-button">
                  <i className="fa fa-arrow-left" />
                </Link>
                <Link to="/files" className="grid-small-button">
                  <i className="fa fa-file-text" />
                </Link>
                <a className="grid-small-button" onClick={this.openColumnOption}>
                  <i className="fa fa-cog" />
                </a>
                {this.renderColumnConfig()}
                <Link to="/admin" className="grid-small-button" onClick={this.performLogout}>
                  <i className="fa fa-power-off" />
                </Link>
                <div className=" display-inline">
                  <button className="grid-small-button" title="Refresh Students Information" onClick={this.refreshStudentsGrid}>
                    <i className="fa fa-refresh" />
                  </button>
                </div>
              </div>
            </div>
            <div className="modal">
              <div>
                <AdvanceSearch
                  metaData={metaData}
                  getAllStudentsAction={this.props.getAllStudentsAction}
                  students={students}
                  onFilter={this.onFilter}
                  formatStudents={this.formatStudents}
                  checkedIds={checkedIds}
                />
                <div className="column-option display-mobile-none">
                  <UploadOptInFile />
                  <div className="column-option-configure display-inline">
                    <Link to="/files" className="column-option-container text-decoration-none">
                      <i className="fa fa-file-text card-icon" />Files
                    </Link>
                  </div>
                  <UploadStudentsAttendanceFile />
                  <div className="column-option-configure display-inline">
                    <button className="column-option-container" title="Configure" onClick={this.openColumnOption}>
                      <i className="fa fa-cog" />
                    </button>
                    {this.renderColumnConfig()}
                  </div>
                  <div className="display-inline">
                    <button className="column-option-container" title="Refresh Students Information" onClick={this.refreshStudentsGrid}>
                      <i className="fa fa-refresh" />
                    </button>
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
              selectedStudents={selectedStudents}
              metaData={metaData}
              clearSelectedStudents={this.clearSelectedStudents}
            />
            {this.renderDataGrid()}
            {this.renderFileDownloadMessagePopup()}
          </div>
        </div>
      </div>

    );
  }
}

StudentInformationGrid.propTypes = {
  adminLoginState: PropTypes.bool,
  fetchStudentDataAction: PropTypes.func,
  getAllStudentsAction: PropTypes.func,
  redirect: PropTypes.bool,
  resetAdminCredentialsAction: PropTypes.func,
  resetVisibleColumnConfigAction: PropTypes.func,
  secretKey: PropTypes.string,
  selectValue: PropTypes.bool,
  setAdminLoginStateAction: PropTypes.func,
  setRedirectValueAction: PropTypes.func,
  setStudentDataAction: PropTypes.func,
  setVisibleColumnConfigAction: PropTypes.func,
  setUserTypeAction: PropTypes.func,
  students: PropTypes.array,
  studentData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  visibleColumnConfig: PropTypes.object,
  updateStudentByAdminAction: PropTypes.func,
};

StudentInformationGrid.defaultProps = {
  adminLoginState: false,
  fetchStudentDataAction: () => {},
  getAllStudentsAction: () => {},
  redirect: false,
  resetAdminCredentialsAction: () => {},
  resetVisibleColumnConfigAction: () => {},
  secretKey: '',
  selectValue: true,
  setAdminLoginStateAction: () => {},
  setRedirectValueAction: () => {},
  setStudentDataAction: () => {},
  setVisibleColumnConfigAction: () => {},
  setUserTypeAction: () => {},
  studentData: {},
  students: [],
  visibleColumnConfig: {},
  updateStudentByAdminAction: () => {},
};

const mapStateToProps = state => ({
  adminLoginState: stateOfAdminLogin(state),
  redirect: stateOfRedirect(state),
  secretKey: getSecretKey(state),
  selectValue: getSelectValue(state),
  studentData: getStudent(state),
  students: allStudentsData(state),
  visibleColumnConfig: getVisibleColumnConfig(state),
});

export default connect(mapStateToProps, {
  fetchStudentDataAction,
  getAllStudentsAction,
  resetAdminCredentialsAction,
  resetIsSuccessAction,
  resetVisibleColumnConfigAction,
  setAdminLoginStateAction,
  setStudentDataAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
  setUserTypeAction,
  updateStudentByAdminAction,
})(StudentInformationGrid);
