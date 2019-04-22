import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import * as shortId from 'shortid';
import Barcode from 'react-barcode';
import { YJSG_ID_CARD_SMALL_HEADING, YJSG_ID_CARD_MAIN_HEADING } from '../utils/textConstants';

import { getFormattedStudentId } from '../utils/dataGridUtils';
import { getBusCoordinators } from '../reducers/assetFilesReducer';

/**
 * StudentIdCardModal render student IdCards
 * @type {Class}
 */
class StudentIdCardModal extends Component {
  constructor(props) {
    super(props);
    this.renderStudentIdCards = this.renderStudentIdCards.bind(this);
  }
  getCoordinatorName = (busNumber) => {
    if (busNumber && !isEmpty(this.props.busCoordinators) && this.props.busCoordinators[busNumber].coordinatorName) {
      return (
        <div className="card-text">
          <span className="card-text-bold">Coordinator name:</span>
          <span className="card-title-text"> { this.props.busCoordinators[busNumber].coordinatorName }</span>
        </div>
      );
    } return (
      <div className="card-text card-text-width">
        <span className="card-text-bold">Coordinator name:</span>
      </div>
    );
  };
  getCoordinatorContactNumber = (busNumber) => {
    if (busNumber && !isEmpty(this.props.busCoordinators) && this.props.busCoordinators[busNumber].contactNumber) {
      return (
        <div className="card-text">
          <span className="card-text-bold ">Coordinator contact:</span>
          <span className="card-title-text">{this.props.busCoordinators[busNumber].contactNumber}</span>
        </div>
      );
    } return (
      <div className="card-text card-text-width">
        <span className="card-text-bold">Coordinator contact:</span>
      </div>
    );
  };
  renderStudentIdCards(student) {
    const studentsIdCards = student.map((object) => {
      const name = object.name.split(' ');
      const studentId = getFormattedStudentId(object.studentId);
      name.forEach((element, index) => {
        name[index] = upperFirst(`${name[index].toLocaleLowerCase()} `);
      });
      const fatherName = object.fatherName.split(' ');
      fatherName.forEach((element, index) => {
        fatherName[index] = upperFirst(`${fatherName[index].toLocaleLowerCase()} `);
      });
      const addressString = object.address.replace(/,/g, ', ');
      const address = addressString.split(' ');
      address.forEach((element, index) => {
        address[index] = upperFirst(`${address[index].toLocaleLowerCase()} `);
      });
      return (
        <div key={shortId.generate()} className="student-id-cards">
          <div className="student-id-card-wrapper">
            <div className="student-card-text-wrapper">
              <div className="image-id-card">
                <img src="../../LOGO.png" alt="yjsg-logo" />
              </div>
              <div className="student-small-heading">
                <p>{ YJSG_ID_CARD_SMALL_HEADING }</p>
              </div>
              <div className="student-heading-block">
                <h2 className="student-id-cards-header">{ YJSG_ID_CARD_MAIN_HEADING }</h2>
              </div>
            </div>
          </div>
          <div className="card-content-wrapper">
            <div className="card-content">
              <div className="card-fields-wrapper">
                <div className="card-text card-display-inline">
                  <span className="card-text-bold card-text-name">Name:</span>
                  <span className="card-text-content card-name-content card-title-text"> {name}</span>
                </div>
                <div className="card-text"><span className="card-text-bold">Class:</span>
                  <span className="card-title-text">{object.education}</span>
                </div>
                <div className="card-text"><span className="card-text-bold">Room:</span>
                  <span className="card-title-text">{object.classRoomNo2019}</span>
                </div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text"><span className="card-text-bold">Father Name:</span>
                  <span className="card-title-text">{fatherName}</span>
                </div>
                <div className="card-text card-text-spacing"><span className="card-text-bold">Mobile No:</span>
                  <span className="card-title-text">{object.mobile}</span>
                </div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text card-text-bus-stop card-flex">
                  <span className="card-text-bold card-bus-stop">Bus Stop:</span>
                  <span className="card-name-content card-title-text">{object.busStop}</span>
                </div>
                <div className="card-text card-text-spacing">
                  <span className="card-text-bold">Bus No:</span>
                  <span className="card-title-text">{object.busNumber}</span>
                </div>
              </div>
              <div className="card-fields-wrapper">
                <div className="card-text card-display-inline">
                  <span className="card-text-bold">Address:</span>
                  <span className="card-name-content card-title-text">{address}</span>
                </div>
              </div>
              <div className="card-fields-wrapper card-field-student-wrapper">
                <div className="card-text card-text-student card-student-flex">
                  <span className="card-text-bold">Student Id:</span>
                  <span className="card-student-num card-title-text">{object.studentId}</span>
                </div>
                <div className="card-text card-barcode" >
                  <Barcode height={25} width={3} format="CODE128" background="transparent" fontSize={16} textPosition="left" value={studentId} />
                </div>
              </div>
            </div>
          </div>
          <div className="student-id-cards-footer">
            {this.getCoordinatorName(object.busNumber)}
            {this.getCoordinatorContactNumber(object.busNumber)}
          </div>
        </div>);
    });
    const studentsTemplate = [];
    let groupOfTwoStudents = [];

    studentsIdCards.forEach((obj) => {
      if (groupOfTwoStudents.length !== 2) {
        groupOfTwoStudents.push(obj);
      } else {
        studentsTemplate.push((
          <div key={shortId.generate()} className="group-of-two-students">{groupOfTwoStudents}</div>
        ));
        groupOfTwoStudents = [];
        groupOfTwoStudents.push(obj);
      }
    },
    );
    if (!isEmpty(groupOfTwoStudents)) {
      studentsTemplate.push((<div key={shortId.generate()} className="group-of-two-students">{groupOfTwoStudents}</div>));
    }
    if (!isEmpty(studentsTemplate)) {
      return (
        <div>
          <div className="students-id-card-wrapper">
            {studentsTemplate}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>{this.renderStudentIdCards(this.props.selectedStudents)}</div>
    );
  }
}

StudentIdCardModal.propTypes = {
  selectedStudents: PropTypes.array,
  busCoordinators: PropTypes.object,
};
StudentIdCardModal.defoultProps = {
  selectedStudents: [],
  busCoordinators: {},
};
const mapStateToProps = state => ({
  busCoordinators: getBusCoordinators(state),
});
export default connect(mapStateToProps, {})(StudentIdCardModal);
