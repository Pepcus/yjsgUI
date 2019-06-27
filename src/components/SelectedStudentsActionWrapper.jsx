import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import moment from 'moment';
import connect from 'react-redux/es/connect/connect';

import StudentIdCardModal from './StudentIdCardModal';
import MarkSelectedStudentAttendance from './MarkSelectedStudentAttendance';
// import MarkOptInOrOptOutButton from './MarkOptInOrOptOutButton';
import UpdateIdCardStatusSelectedStudents from './UpdateIdCardStatusSelectedStudents';
import { isBusCoordinatorsDataFailed } from '../reducers/assetFilesReducer';
import Popup from './common/Popup';
import Button from './common/Button';
import { BUS_COORDINATOR_ERROR_MESSAGE } from '../constants/messages';

/**
 * SelectedStudentsActionWrapper render Export, Print Now, Print Later, Mark as Present and
 * Mark optIn/optOut buttons.
 * @type {Class}
 */
class SelectedStudentsActionWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasBusCoordinatorsError: false,
    };

    this.printCards = this.printCards.bind(this);
  }

  /**
   * printCards method call window.print() method to print students
   * Id cards.
   */
  printCards() {
    window.print();
    this.onClickPrintCancel(false);
  }

  /**
   * renderCoordinatorUnavailableWarningPopup render bus coordinator error popup
   * @return {HTML} bus coordinator warning popup
   */
  renderCoordinatorUnavailableWarningPopup = () => {

    const { hasBusCoordinatorsError } = this.state;
    const { isCoordinatorsFailed } = this.props;

    if (isCoordinatorsFailed && hasBusCoordinatorsError) {
      return (
        <Popup>
          <h5>{ BUS_COORDINATOR_ERROR_MESSAGE }</h5>
          <div className="bus-coordinators-error-popup-button-container">
            <Button
              type="button"
              buttonText="No"
              onClick={this.onClickPrintNotCanceled}
            />
            <Button
              type="button"
              buttonText="Yes"
              onClick={this.printCards}
            />
          </div>
        </Popup>

      );
    }
    return null;
  };

  /**
   * onClickPrintCancel set the boolean value of hasBusCoordinatorsError
   * @param {Boolean}value
   */
  onClickPrintCancel = (value) => {
    this.setState({
      hasBusCoordinatorsError: value,
    });
  };

  /**
   * callBack for onClickPrintCancel to set hasBusCoordinatorsError true
   */
  onClickPrintCanceled = () => {
    this.onClickPrintCancel(true);
  };

  /**
   * callBack for onClickPrintCancel to set hasBusCoordinatorsError false
   */
  onClickPrintNotCanceled = () => {
    this.onClickPrintCancel(false);
  };
  /**
   * renderExportClassName method return the className
   * Export button as per students selected or not.
   * @return {string} className
   */
  renderExportClassName() {

    const { selectedStudents } = this.props;

    if (isEmpty(selectedStudents)) {
      return 'disable-link';
    }
    return 'export';
  }

  /**
   * getPrintNowClassName method return the className
   * Print Now button as per students selected or not.
   * @return {string} className
   */
  getPrintNowClassName() {

    const { selectedStudents } = this.props;

    if (isEmpty(selectedStudents)) {
      return 'disable-link-button-new';
    }
    return 'linkButton';
  }

  render() {

    const { metaData, selectedStudents, isCoordinatorsFailed } = this.props;
    const filterHeader = metaData.headerConfig.filter(headerConfigObject =>
      headerConfigObject.excludeFromExport !== true);

    const header = filterHeader.map(item =>
      ({ label: item.label, key: item.key, disable: item.disable }),
    );

    return (
      <div>
        <div className="id-card-wrapper print-media-none">
          <div className="selected-student-buttons">
            <div className="button-container">
              <CSVLink
                headers={header}
                data={selectedStudents}
                className={this.renderExportClassName()}
                filename={`StudentData-${moment().format('DD-MM-YYYY-LT')}.csv`}
              >
                <i className="fa fa-download card-icon" />Export
              </CSVLink>
            </div>
            <div className="button-container">
              <button
                className={this.getPrintNowClassName()}
                onClick={
                  () => {
                    isCoordinatorsFailed
                      ? this.onClickPrintCanceled() : window.print();
                  }}
              >
                <i className="fa fa-print card-icon" />Print Now
              </button>
            </div>
            <UpdateIdCardStatusSelectedStudents
              selectedStudents={selectedStudents}
            />
            <MarkSelectedStudentAttendance
              selectedStudents={selectedStudents}

            />
            {/* <MarkOptInOrOptOutButton
              selectedStudents={this.props.selectedStudents}
              clearSelectedStudents={this.props.clearSelectedStudents}
            />*/}
            {this.renderCoordinatorUnavailableWarningPopup()}
          </div>
        </div>
        <StudentIdCardModal
          selectedStudents={selectedStudents}
        />
      </div>
    );
  }
}

SelectedStudentsActionWrapper.propTypes = {
  clearSelectedStudents: PropTypes.func,
  isCoordinatorsFailed: PropTypes.bool,
  metaData: PropTypes.object,
  selectedStudents: PropTypes.array,
};

SelectedStudentsActionWrapper.defaultProps = {
  clearSelectedStudents: () => {},
  isCoordinatorsFailed: false,
  metaData: {},
  selectedStudents: [],
};

const mapStateToProps = state => ({
  isCoordinatorsFailed: isBusCoordinatorsDataFailed(state),
});

export default connect(mapStateToProps, {})(SelectedStudentsActionWrapper);

