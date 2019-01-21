import React, {Component} from 'react';
import { CSVLink } from 'react-csv';
import isEmpty from 'lodash/isEmpty';

import StudentIdCardModal from './StudentIdCardModal';

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
      return "disable-link-button";
    }
    else {
      return "linkButton";
    }
  }
  renderExportClassName(){
    if(isEmpty(this.props.selectedStudents)) {
      return "disable-link";
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
      <div className = "id-card-wrapper">
        <div className="buttons-wrapper">
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
        <div className="buttonContainer">
          <button className={this.renderPrintNowClassName()}>
            <i className="fa fa-user card-icon"/>Mark as Present
            </button>
          </div>
        </div>
      </div>
      <StudentIdCardModal
        printOptionIsOpen={this.state.printOptionIsOpen}
        selectedStudents={this.props.selectedStudents}/>
    </div>
  );
 }
}
export default SelectedStudentsActionWrapper;
