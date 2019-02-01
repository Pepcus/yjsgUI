import React, {Component} from 'react';
import { CSVLink } from 'react-csv';
import isEmpty from 'lodash/isEmpty';

import StudentIdCardModal from './StudentIdCardModal';
import MarkSelectedStudentAttendance from './MarkSelectedStudentAttendance';
import MarkSelectedStudentsOptInOrOptOut from './MarkSelectedStudentsOptInOrOptOut';
import UpdateIdCardStatusSelectedStudents from './UpdateIdCardStatusSelectedStudents';
class SelectedStudentsActionWrapper extends Component{
  constructor(props) {
    super(props);
    this.state = {
      printOptionIsOpen:false,
    };
    this.openPrintOption = this.openPrintOption.bind(this);
    this.printCards = this.printCards.bind(this);
  };
  printCards(){
    window.print();
  }
  openPrintOption() {
    this.setState({printOptionIsOpen: !this.state.printOptionIsOpen});
  }

  renderExportClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link";
    }
    else {
      return "export";
    }
  }
  renderPrintNowClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link-button-new";
    }
    else {
      return "linkButton";
    }
  }
  renderExportClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link-new";
    }
    else {
      return "export";
    }
  }
  render(){
    const filterHeader = this.props.metaData.headerConfig.filter(obj => obj.excludeFromExport !== true);
    const header = filterHeader.map(item =>
      ({ label: item.label, key: item.key, disable: item.disable }),
    );
    return(
      <div>
        <div className = "id-card-wrapper print-media-none">
          <div className="selected-student-buttons">
            <div className="buttonContainer">
              <CSVLink headers={header} data={this.props.selectedStudents} className={this.renderExportClassName()}>
                <i className="fa fa-download card-icon"/>Export
              </CSVLink>
            </div>
            <div className="buttonContainer">
              <button className={this.renderPrintNowClassName()} onClick={this.printCards}>
                <i className="fa fa-print card-icon"/>Print Now
              </button>
            </div>
            <div className="buttonContainer">
              <button className={this.renderPrintNowClassName()}>
                <i className="fa fa-print card-icon"/>Print Later
              </button>
            </div>
            <MarkSelectedStudentAttendance
              selectedStudents={this.props.selectedStudents}
            />
            <MarkSelectedStudentsOptInOrOptOut
              selectedStudents={this.props.selectedStudents}
            />
            <UpdateIdCardStatusSelectedStudents
              selectedStudents={this.props.selectedStudents}
            />
          </div>
        </div>
        <StudentIdCardModal
          printOptionIsOpen={this.state.printOptionIsOpen}
          selectedStudents={this.props.selectedStudents}
        />
      </div>
    );
  }
}
export default SelectedStudentsActionWrapper;
