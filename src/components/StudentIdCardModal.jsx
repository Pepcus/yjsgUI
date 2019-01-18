import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';

class StudentIdCardModal extends Component {
  constructor(props) {
    super(props);
    this.renderStudentIdCards =this.renderStudentIdCards.bind(this);
  };
  renderStudentIdCards(student){
    const studentsIdCards = student.map( (object) =>{
      let name=object.name.split(' ');
      name.forEach((element, index) => {
        name[index]= upperFirst(name[index].toLocaleLowerCase()+" ");
      });
      let fatherName=object.fatherName.split(' ');
      fatherName.forEach((element, index) => {
        fatherName[index]= upperFirst(fatherName[index].toLocaleLowerCase()+" ");
      });
      let addressString = object.address.replace(/,/g, ", ");
      let address = addressString.split(' ');
      address.forEach((element, index) => {
        address[index]= upperFirst(address[index].toLocaleLowerCase()+" ");
      });
      return(<div className="student-id-cards">
        <h2 className="student-id-cards-header"> Young Jain Study Group</h2>
        <div className="card-fields-wrapper">
          <div>Name: {name}</div>
          <div>Class: {object.education}</div>
          {/*TODO: Use class room no of 2019.*/}
          <div>Room: {object.classRoomNo2017}</div>
        </div>
        <div className="card-fields-wrapper">
          <div>Father Name: {fatherName}</div>
          <div>Mobile No.: {object.mobile}</div>
        </div>
        <div className="card-fields-wrapper">
          <div>Bus Stop: </div>
          <div>Bus No.: </div>
        </div>
        <div className="card-fields-wrapper">
          <div>Address: {address}</div>
        </div>
        <div className="card-fields-wrapper">
          <div>Student ID: {object.studentId} </div>
          <div></div>
        </div>
        <div className="student-id-cards-footer">
          <div>
            {/* TODO: Remove hard coded content.*/}
            Coordinator name: Bhagchand Jain
          </div>
          <div>
            {/* TODO: Remove hard coded content.*/}
            Coordinator contact: 8435534036
          </div>
        </div>
      </div>);
    });
    let studentsTemplate = [];
    let groupOfTwoStudents = [];

    studentsIdCards.forEach(function(obj){
      if(groupOfTwoStudents.length !== 2){
        groupOfTwoStudents.push(obj);
      } else {
        studentsTemplate.push((
          <div className="group-of-two-students">{groupOfTwoStudents}</div>
        ));
        groupOfTwoStudents = [];
        groupOfTwoStudents.push(obj);
      }
    }
      );
    if(!isEmpty(groupOfTwoStudents)){
      studentsTemplate.push((<div className="group-of-two-students">{groupOfTwoStudents}</div>));
    }
    if(!isEmpty(studentsTemplate)) {
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
    return(
      <div>{this.renderStudentIdCards(this.props.selectedStudents)}</div>
    );
  }
}
export default StudentIdCardModal;
