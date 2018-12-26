import React, {Component} from 'react';
import { connect } from 'react-redux';
import DataGrid from 'simple-react-data-grid';
import isEmpty from 'lodash/isEmpty';
import { Redirect } from 'react-router-dom';

import ColumnConfig from './ColumnConfig';
import { allStudentsData } from '../reducers/studentRegistrationReducer';
import { getAllStudentsAction, setStudentDataAction } from  '../actions/studentRegistrationActions';
import {
  stateOfRedirect,
  stateOfAdminLogin,
} from '../reducers/studentRegistrationReducer';
import AdvanceSearch from './AdvanceSearch';

const gridMetaData = [
  {
    'name': 'Name',
    'key': 'name',
  },
  {
    'name': 'Father Name',
    'key': 'fatherName',
  },
  {
    'name': 'Gender',
    'key': 'gender',
  },
  {
    'name': 'Age',
    'key': 'age',
  },
  {
    'name': 'Education',
    'key': 'education',
  },
  {
    'name': 'Mobile',
    'key': 'mobile',
  },
  {
    'name': 'Email',
    'key': 'email',
  },
  {
    'name': 'Address',
    'key': 'address',
  },
  {
    'name': '2016 Class Attended',
    'key': 'classAttended2016',
  },
  {
    'name': '2017 Class Attended',
    'key': 'classAttended2017',
  },
  {
    'name': '2016 Attendance',
    'key': 'attendance2016',
  },
  {
    'name': '2017 Attendance',
    'key': 'attendance2017',
  },
  {
    'name': '2016 Class Room No.',
    'key': 'classRoomNo2016',
  },
  {
    'name': '2017 Class Room No.',
    'key': 'classRoomNo2017',
  },
  {
    'name': '2016 Marks',
    'key': 'marks2016',
  },
  {
    'name': '2017 Marks',
    'key': 'marks2017',
  },
  {
    'name': 'Edit',
    'key': 'edit',
    'disableFilter': true,
  },
];
const gridHeaderData = () => ({
  headerConfig: gridMetaData,
  topDrawer: {
    'pagination': false,
    'globalSearch': true,
    'totalRecord': false,
    'clearButton': true,
    'exportButton': true,
    'totalRecords': false,
  },
  bottomDrawer: {
    'pagination': true,
    'globalSearch': false,
    'totalRecord': true,
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
      students:[],
      metaData: gridHeaderData(),
      columnOptionIsOpen:false,
      isStudentDataSet: false,
      advanceFilterIsOpen: false,
      visibleColumnConfig: {
        name: true,
        fatherName: true,
        mobile: true,
        email: true,
        gender: true,
        age: true,
        address: true,
        education: true,
        classAttended2016: true,
        classAttended2017: true,
        attendance2016: true,
        attendance2017: true,
        classRoomNo2016: true,
        classRoomNo2017: true,
        marks2016: true,
        marks2017: true,
        edit: true,
      }
    };
    this.openColumnOption = this.openColumnOption.bind(this);
    this.closeColumnOption = this.closeColumnOption.bind(this);
    this.openAdvanceFilter = this.openAdvanceFilter.bind(this);
    this.closeAdvanceFilter = this.closeAdvanceFilter.bind(this);
    this.setValuesOfVisibleColumnConfig = this.setValuesOfVisibleColumnConfig.bind(this);
    this.renderDataGrid = this.renderDataGrid.bind(this);
    this.onFiIlter = this.onFiIlter.bind(this);
    this.redirectToStudentCorrection = this.redirectToStudentCorrection.bind(this);
  }
  componentWillMount(){
    this.setState({
       metaData: this.formatMetaData(this.state.visibleColumnConfig)
    })
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
  setValuesOfVisibleColumnConfig(values){
    this.setState({
      visibleColumnConfig : values,
      metaData: this.formatMetaData(values),
    })
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
        } else {
          metaData.push(gridMetaData.find(metaDataObj => metaDataObj.key === columnKey))
        }
      }
    }
    return {...this.state.metaData, headerConfig: metaData};
  };

  handleEditClick(rowData) {
    if (!isEmpty(rowData)) {
      this.props.setStudentDataAction(rowData);
      this.setState({
        isStudentDataSet: true,
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
    <div className = "btn-block"><button onClick={() => { this.handleEditClick(rowData) }} className="btn-grid">
      Edit</button>
    </div>
  );
  DeleteButton = ({ rowData }) => (
    <div><button onClick={() => { alert(`First Name: ${rowData.firstName}, Last Name: ${rowData.lastName}`); }}>Delete</button></div>
  );
  componentDidMount() {
    this.props.getAllStudentsAction();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.students!== this.props.students) {
      this.setState({
        students: nextProps.students,
      });
    }
  }
  onFiIlter(result){
    this.setState({
      students: result,
    });
  }
  renderDataGrid () {
    return (
      <DataGrid data={this.state.students}  metaData={this.state.metaData}  styles={getStyles()} />
    );
  }
  render(){
    const { students, } = this.state;
    if(!isEmpty(students) && this.props.redirect && this.props.adminLoginState) {
      return(
        <div>
          <div className="modal">
            <div className="column-option">
              <button className="column-option-container" onClick={this.openColumnOption}>Column Options</button>
              <ColumnConfig
                columnOptionIsOpen= {this.state.columnOptionIsOpen}
                closeColumnOption= {this.closeColumnOption}
                visibleColumnConfig= {this.state.visibleColumnConfig}
                setValuesOfVisibleColumnConfig = {this.setValuesOfVisibleColumnConfig}
              />
            </div>
            <div className = "advance-search">
              <AdvanceSearch
                metaData = {this.state.metaData}
                getAllStudentsAction = {this.props.getAllStudentsAction}
                students = {this.props.students}
                onFiIlter = {this.onFiIlter}
              />
            </div>
            {/*<div className="advance-filter">
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
          {this.renderDataGrid()}
        </div>
      );

    }
    if(isEmpty(students)){
      return(
        <div> Student data is not present</div>
      );
    }
    return(
      <div> Please Login...</div>
    );
  }
}
const mapStateToProps = state => ({
  students: allStudentsData(state),
  redirect: stateOfRedirect(state),
  adminLoginState: stateOfAdminLogin(state),
});
export default connect(mapStateToProps, {
  getAllStudentsAction,
  setStudentDataAction,
})(DataGrid1);
