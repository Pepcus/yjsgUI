import React, {Component} from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ColumnConfig from './ColumnConfig';
import LinkButton from './commonComponents/LinkButton';
import { allStudentsData, getVisibleColumnConfig, getSelectValue } from '../reducers/studentRegistrationReducer';
import {
  getAllStudentsAction,
  setStudentDataAction,
  updateStudentByAdminAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
  resetVisibleColumnConfigAction,
} from  '../actions/studentRegistrationActions';
import {
  stateOfRedirect,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';
import AdvanceSearch from './AdvanceSearch';
import SelectedStudentsActionWrapper from './SelectedStudentsActionWrapper';
import {
  yjsgHeader,
  goBackBtnText,
  adminPassword,
} from '../utils/yjsgConstants';

const gridMetaData = [
  {
    'label': '',
    'key': 'column',
    'disableFilter': true,
    'excludeFromExport': true,
  },
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
  recordsPerPage: 25,
  drawerPosition: 'top',
  includeAllInGlobalFilter:false,
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
      selectedStudentsCheck: [],
      selectValue: this.props.selectValue,
      students:[],
      metaData: gridHeaderData(),
      columnOptionIsOpen:false,
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
    this.handleEditCheckBoxClick = this.handleEditCheckBoxClick.bind(this);
    this.EditButton = this.EditButton.bind(this);
    this.CheckButton = this.CheckButton.bind(this);
    this.formattedStudent = this.formattedStudent.bind(this);
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
    this.props.getAllStudentsAction();
  }
  performLogout() {
    this.props.resetAdminCredentialsAction();
    this.props.setAdminLoginStateAction(false);
    this.props.setRedirectValueAction(false);
    sessionStorage.removeItem('isAdminLogin');
    this.props.resetVisibleColumnConfigAction();
  }
  openColumnOption() {
    this.setState({columnOptionIsOpen: true});
  }
  closeColumnOption() {
    this.setState({columnOptionIsOpen: false});
  }
  openAdvanceFilter() {
    this.setState({advanceFilterIsOpen: true});
  }
  closeAdvanceFilter() {
    this.setState({advanceFilterIsOpen: false});
  }
  setValuesOfVisibleColumnConfig(values, selectValue){
    let count = 0;
    for(let key in values) {
      if(values[key]){
        count ++;
      }
      if(count>1){
        values = {...values, column : true,};
      }
      else{
        values = {...values, column : false,};
      }
    }
    this.setState({
      visibleColumnConfig : values,
      metaData: this.formatMetaData(values),
      selectValue: selectValue,
    });
    this.props.setVisibleColumnConfigAction(values, selectValue);
  }
  formatMetaData = (visibleColumnConfig) => {
    const metaData = [];
    for(const columnKey in visibleColumnConfig) {
      if (visibleColumnConfig[columnKey]) {
        if (columnKey === 'edit') {
          metaData.push({
            ...gridMetaData.find(metaDataObj => metaDataObj.key === columnKey),
            customComponent: this.EditButton
          })
        }else if (columnKey === 'column'){
          metaData.push({
            ...gridMetaData.find(metaDataObj => metaDataObj.key === columnKey ),
            customComponent: this.CheckButton
          })
        }
        else {
          metaData.push(gridMetaData.find(metaDataObj => metaDataObj.key === columnKey))
        }
      }
    }
    return {...this.state.metaData, headerConfig: metaData};
  };

  handleEditClick(rowData) {
    const newRowData = {...rowData, id:rowData.studentId};
    if (!isEmpty(rowData)) {
      this.props.setStudentDataAction(newRowData);
      this.props.updateStudentByAdminAction(rowData.studentId, adminPassword);
      this.setState({
        isStudentDataSet: true,
      });
    }
  }
  handleEditCheckBoxClick(rowData , e){
    if (e.target.checked) {
      this.setState({
        selectedStudents: [
          ...this.state.selectedStudents,
          rowData,
        ],
        selectedStudentsCheck: [
          ...this.state.selectedStudentsCheck,
          rowData.studentId,
        ],
      });
    } else if(!e.target.checked){
      const removedStudent = this.state.selectedStudents.filter((item) => item.studentId !== Number(e.target.name));
      const removedSelectCheckBox = this.state.selectedStudentsCheck.filter((item) => item !== Number(e.target.name));
      this.setState({
        selectedStudents: removedStudent,
        selectedStudentsCheck: removedSelectCheckBox,
      });
    }
  }
  redirectToStudentCorrection() {
    if (this.state.isStudentDataSet){
      return (
        <div>
          <Redirect to={'/studentCorrection'}/>
        </div> );
    }
    return null;
  }
  EditButton = ({ rowData }) => (
    <div className = "btn-block">
      <button onClick={() => { this.handleEditClick(rowData) }} className="btn-grid">
          <i className="fa fa-edit"></i>Edit
      </button>
    </div>
  );
  CheckButton = ({ rowData }) => {
    return(
    <div className = "btn-block">
      <input
        name={String(rowData.studentId)}
        type="checkbox"
        onChange={(e) =>{this.handleEditCheckBoxClick(rowData, e)}}
        className="btn-grid"
        checked={this.state.selectedStudentsCheck.includes(rowData.studentId) ? "checked": ""}
      />
    </div>
  );
}
  componentWillReceiveProps(nextProps){
    if(nextProps.students !== this.props.students) {
      this.setState({
        students: this.formattedStudent(nextProps.students),
        });
    }
  }
  onFilter(result){
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
        ({...item, studentId: String(item.id)})
      );
    }
  renderDataGrid () {
    if(isEmpty(this.state.metaData.headerConfig)){
      return(
          <div>
              <div className = "empty-column-message">
                  <span className = "circle-icon">
                      {/*<i className="fa fa-info-circle"></i>*/}
                      <i className="fa fa-exclamation-triangle"></i>
                  </span>
                  आपने शून्य स्तंभों को चुना है इसलिए वहाँ जानकारी उपलब्ध नहीं है।
              </div>
          </div>

      );
    }
    if (!isEmpty(this.state.students)) {
      return (
        <DataGrid data={this.state.students} metaData={this.state.metaData} styles={getStyles()}/>
      );
    }
  }
  redirectToAdminLogin(){
    return <Redirect to={'/adminPanel'}/>
  }
  render() {
    if(sessionStorage.getItem('isAdminLogin') !== 'yes' && !(this.props.adminLoginState)) {
      return (
        <div>
          <Redirect to={'/'}/>
        </div>
      );
    }
    return (
      <div>
        <div className={'student-information-Container'}>
          <div className= "yjsg-logo">
              <img src="../../react-logo-13.png" alt="logo"/>
          </div>
          <h2>{yjsgHeader}</h2>
          <div className={'logoutButtonContainer'}>
            <div className={'logoutLinkContainer'}>
              <Link to = {'/'} className="logout-button"
              >Back </Link>
              <Link to={'/'} className = "logout-button"
                onClick={this.performLogout}
              >Logout</Link>
            </div>
          </div>
        </div>
        <div className="modal">
          <div>
            <AdvanceSearch
              metaData={this.state.metaData}
              getAllStudentsAction={this.props.getAllStudentsAction}
              students={this.props.students}
              onFilter={this.onFilter}
              formattedStudent = {this.formattedStudent}
            />
          <div className="column-option">
            <button className="column-option-container" onClick={this.openColumnOption}>
                <i className="fa fa-filter card-icon"></i>
                Configure
            </button>
            {this.renderColumnConfig()}
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
        {this.redirectToStudentCorrection()}
        <SelectedStudentsActionWrapper
          selectedStudents = {this.state.selectedStudents}
          metaData={this.state.metaData}
        />
        {this.renderDataGrid()}
      </div>
    );
  }
}
DataGrid.propTypes = {
  adminLoginState: PropTypes.bool,
};

DataGrid.defaultProps = {
  adminLoginState: false,
};

const mapStateToProps = state => ({
  students: allStudentsData(state),
  visibleColumnConfig: getVisibleColumnConfig(state),
  selectValue: getSelectValue(state),
  redirect: stateOfRedirect(state),
  adminLoginState: stateOfAdminLogin(state),
});
export default connect(mapStateToProps, {
  getAllStudentsAction,
  setStudentDataAction,
  updateStudentByAdminAction,
  resetAdminCredentialsAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
  resetVisibleColumnConfigAction,
})(DataGrid1);
