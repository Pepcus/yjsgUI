import React, {Component} from 'react';
import { CSVLink } from 'react-csv';

class SelectedStudentsActionWrapper extends Component{

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
                <i className="fa fa-download card-icon"></i>Export
            </button>
          </CSVLink>
        </div>
        <div className="buttonContainer">
          <button className="linkButton">
              <i className="fa fa-print card-icon"></i>Print Now
          </button>
        </div>
        <div className="buttonContainer">
          <button className="linkButton">
              <i className="fa fa-print card-icon"></i>Print Later
          </button>
        </div>
        <div className="buttonContainer">
          <button className="linkButton">
              <i className="fa fa-user card-icon"></i>Mark as Present
          </button>
        </div>
      </div>
    </div>
    );
  }
}
export default SelectedStudentsActionWrapper;
