import React, {Component} from 'react';
import { CSVLink } from 'react-csv';

import StudentIdCardModal from './StudentIdCardModal';

class SelectedStudentsActionWrapper extends Component{
  constructor(props) {
    super(props);
    this.state = {
      printOptionIsOpen:false,
    };
    this.openPrintOption = this.openPrintOption.bind(this);
    this.closePrintOption = this.closePrintOption.bind(this);
  };

  openPrintOption() {
    this.setState({printOptionIsOpen: true});
  }

  closePrintOption() {
    this.setState({printOptionIsOpen: false});
  }

  render(){
  const filterHeader = this.props.metaData.headerConfig.filter(obj => obj.excludeFromExport !== true);
  const header = filterHeader.map(item =>
    ({ label: item.label, key: item.key, disable: item.disable }),
  );
  return(
    <div className = "id-card-wrapper">
      <div className="buttons-wrapper">
        <div className="buttonContainer">
          <CSVLink headers={header} data={this.props.selectedStudents} >
            <button className="linkButton">
              <i className="fa fa-download card-icon"/>Export
              </button>
            </CSVLink>
          </div>
        <div className="buttonContainer">
          <button className="linkButton" onClick={this.openPrintOption}>
            <i className="fa fa-print card-icon"/>Print Now
            </button>
          </div>
        <StudentIdCardModal
          printOptionIsOpen={this.state.printOptionIsOpen}
          closePrintOption={this.closePrintOption}
          selectedStudents={this.props.selectedStudents}
        />
        <div className="buttonContainer">
          <button className="linkButton">
            <i className="fa fa-print card-icon"/>Print Later
            </button>
          </div>
        <div className="buttonContainer">
          <button className="linkButton">
            <i className="fa fa-user card-icon"/>Mark as Present
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default SelectedStudentsActionWrapper;
