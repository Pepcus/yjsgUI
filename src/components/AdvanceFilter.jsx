import React, { Component } from 'react';
import Modal from 'react-modal';

const customAdvanceFilterStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AdvanceFilter extends Component {

  render(){
    return(
      <Modal
        isOpen={this.props.advanceFilterIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeAdvanceFilter}
        style={customAdvanceFilterStyles}
        contentLabel="Advance Filter"
      >

        <h2> Enter fields to filter</h2>
        <form>
          <div className="column-group">
            <div className="column-left">
              <div>
                <label className="label" for="name">Name:</label>
                <input className="filter-input-filed" type="text" key="name" id="name" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="fatherName">Father Name:</label>
                <input className="filter-input-filed" type="text" key="fatherName" id="fatherName" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="mobile">
                  Mobile No.:
                </label>
                <input className="filter-input-filed" type="text" key="mobile" id="mobile" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="email">
                  Email ID:
                </label>
                <input className="filter-input-filed" type="text" key="email" id="email" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="gender">
                  Gender:</label>
                <input className="filter-input-filed" type="text" key="gender" id="gender" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="age">
                  Age:
                </label>
                <input className="filter-input-filed" type="text" key="age" id="age" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="address">
                  Address:</label>
                <input className="filter-input-filed" type="text" key="address" id="address" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="education">
                  Education:
                </label>
                <input className="filter-input-filed" type="text" id="education" key="education" name="advance-filter-filed" />
              </div>
            </div>
            <div className="column-right">
              <div>
                <label className="label" for="classAttended2016">
                  Class Attended 2016:
                </label>
                <input className="filter-input-filed" type="text" key="classAttended2016" id="classAttended2016" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="classAttended2017">
                  Class Attended 2017:
                </label>
                <input className="filter-input-filed" type="text" id="classAttended2017" key="classAttended2017" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="attendance2016">
                  Attendance 2016:
                </label>
                <input className="filter-input-filed" type="text" id="attendance2016" key="attendance2016" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="attendance2017">
                  Attendance 2017:
                </label>
                <input className="filter-input-filed" type="text" key="attendance2017" id="attendance2017" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="classRoomNo2016">
                  Class Room No. 2016:
                </label>
                <input className="filter-input-filed" type="text" key="classRoomNo2016" id="classRoomNo2016" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="classRoomNo2017" >
                  Class Room No. 2017:
                </label>
                <input className="filter-input-filed" type="text" id="classRoomNo2017" key="classRoomNo2017" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="marks2016">
                  Marks 2016:
                </label>
                <input className="filter-input-filed" type="text" id="marks2016" key="marks2016" name="advance-filter-filed" />
              </div>
              <div>
                <label className="label" for="marks2017">
                  Marks 2017:
                </label>
                <input className="filter-input-filed" type="text" id="marks2017" key="marks2017" name="advance-filter-filed" />
              </div>
            </div>
          </div>
        </form>
        <button onClick={this.props.closeAdvanceFilter}>Close</button>
        <button className="save-buttom" >Filter</button>
      </Modal>
    );
  }
}

export default AdvanceFilter;
