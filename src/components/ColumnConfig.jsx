import React, { Component } from 'react';
import Modal from 'react-modal';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';

const customColumnOptionStyles = {
  overlay: {
    zIndex: '999',
    backgroundColor: 'rgba(21, 20, 20, 0.75)',
  },
  content: {
    top: '50%',
    position: 'absolute',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: '1px solid rgb(205, 68, 3)',
    boxShadow: 'rgb(99, 99, 99) 0px 2.3px 3px 0px',
    padding: '0px !important',
    marginRight: '-50%',
    width: '80%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
  },
};

/**
 * ColumnConfig component render column config option
 * @type {Class}
 */
class ColumnConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleColumnConfig: {},
      selectValue: '',
    };
  }

  componentWillMount() {
    this.setState({
      visibleColumnConfig: this.props.visibleColumnConfig,
      selectValue: this.props.selectValue,
    });
  }

  /**
   * setValuesOfVisibleColumnConfig method call callBack setValuesOfVisibleColumnConfig()
   * and call closeColumnOption() method.
   */
  setValuesOfVisibleColumnConfig = () => {
    this.props.setValuesOfVisibleColumnConfig(this.state.visibleColumnConfig, this.state.selectValue);
    this.props.closeColumnOption();
  };

  /**
   * setCheckValue method set value of selectValue(select all)(true or false) and on the basis
   * of selectValue value set the value of visibleColumnConfig(all column value)
   */
  setCheckValue = () => {
    const temporarySelectValue = this.state.selectValue !== true;
    const temporaryVisibleColumnConfig = cloneDeep(this.props.visibleColumnConfig);
    if (temporarySelectValue) {
      for (const key in temporaryVisibleColumnConfig) {
        temporaryVisibleColumnConfig[key] = true;
      }
      this.setState({
        selectValue: temporarySelectValue,
        visibleColumnConfig: temporaryVisibleColumnConfig,
      });
    } else if (!temporarySelectValue) {
      for (const key in temporaryVisibleColumnConfig) {
        temporaryVisibleColumnConfig[key] = false;
      }
      this.setState({
        selectValue: temporarySelectValue,
        visibleColumnConfig: temporaryVisibleColumnConfig,
      });
    }
  };

  /**
   * handleChange method set value of visibleColumnConfig(all columns value)
   * @param {Object} event
   */
  handleChange = (event) => {
    if (event.target.checked) {
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: true,
        },
      });
    } else if (!event.target.checked) {
      this.setState({
        visibleColumnConfig: {
          ...this.state.visibleColumnConfig,
          [event.target.name]: false,
        },
      });
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.columnOptionIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.props.closeColumnOption}
        style={customColumnOptionStyles}
        contentLabel="Column Options"
        overlayLabel="Overlay Options"
        className="custom-modal"
      >
        <div>
          <div className="column-modal">
            <h2 className="column-modal-container">कृपया स्तंभों का चयन करे</h2>
          </div>
          <form>
            <div className="column-group-wrapper">
              <div className="select-button-wrapper">
                <label className="label">
                  <input type="checkbox" onChange={() => this.setCheckValue()} checked={this.state.selectValue ? 'checked' : ''} />
                  <span className="select-none-wrapper">Select All</span>
                </label>
              </div>
              <div className="column-group">
                <div className="column-group-container">
                  <label className="label">
                    <input type="checkbox" name="studentId" onChange={this.handleChange} checked={this.state.visibleColumnConfig.studentId ? 'checked' : ''} />
                    <span>ID</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="name" onChange={this.handleChange} checked={this.state.visibleColumnConfig.name ? 'checked' : ''} />
                    <span>Name</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="fatherName" onChange={this.handleChange} checked={this.state.visibleColumnConfig.fatherName ? 'checked' : ''} />
                    <span>Father Name</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="gender" onChange={this.handleChange} checked={this.state.visibleColumnConfig.gender ? 'checked' : ''} />
                    <span>Gender</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="age" onChange={this.handleChange} checked={this.state.visibleColumnConfig.age ? 'checked' : ''} />
                    <span>Age</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="education" onChange={this.handleChange} checked={this.state.visibleColumnConfig.education ? 'checked' : ''} />
                    <span>Education</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="occupation" onChange={this.handleChange} checked={this.state.visibleColumnConfig.occupation ? 'checked' : ''} />
                    <span>Occupation</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="motherMobile" onChange={this.handleChange} checked={this.state.visibleColumnConfig.motherMobile ? 'checked' : ''} />
                    <span>Mother Mobile No.</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="mobile" onChange={this.handleChange} checked={this.state.visibleColumnConfig.mobile ? 'checked' : ''} />
                    <span>Mobile No.</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="email" onChange={this.handleChange} checked={this.state.visibleColumnConfig.email ? 'checked' : ''} />
                    <span>Email ID</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="address" onChange={this.handleChange} checked={this.state.visibleColumnConfig.address ? 'checked' : ''} />
                    <span>Address</span>
                  </label>
                </div>
                <div className="column-group-container">
                  <label className="label">
                    <input type="checkbox" name="busNumber" onChange={this.handleChange} checked={this.state.visibleColumnConfig.busNumber ? 'checked' : ''} />
                    <span>Bus Number</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="busStop" onChange={this.handleChange} checked={this.state.visibleColumnConfig.busStop ? 'checked' : ''} />
                    <span>Bus Stop</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="printStatus" onChange={this.handleChange} checked={this.state.visibleColumnConfig.printStatus ? 'checked' : ''} />
                    <span>Print Status</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="remark" onChange={this.handleChange} checked={this.state.visibleColumnConfig.remark ? 'checked' : ''} />
                    <span>Remark</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="secretKey" onChange={this.handleChange} checked={this.state.visibleColumnConfig.secretKey ? 'checked' : ''} />
                    <span>Secret Key</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classAttended2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2016 ? 'checked' : ''} />
                    <span>Class Attended 2016</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classAttended2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2017 ? 'checked' : ''} />
                    <span>Class Attended 2017</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classAttended2018" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2018 ? 'checked' : ''} />
                    <span>Class Attended 2018</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classAttended2019" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classAttended2019 ? 'checked' : ''} />
                    <span>Class Attended 2019</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classRoomNo2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2016 ? 'checked' : ''} />
                    <span>Class Room No. 2016</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classRoomNo2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2017 ? 'checked' : ''} />
                    <span>Class Room No. 2017</span>
                  </label>
                </div>
                <div className="column-group-container">
                  <label className="label">
                    <input type="checkbox" name="classRoomNo2018" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2018 ? 'checked' : ''} />
                    <span>Class Room No. 2018</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="classRoomNo2019" onChange={this.handleChange} checked={this.state.visibleColumnConfig.classRoomNo2019 ? 'checked' : ''} />
                    <span>Class Room No. 2019</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="attendance2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2016 ? 'checked' : ''} />
                    <span>Attendance 2016</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="attendance2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2017 ? 'checked' : ''} />
                    <span>Attendance 2017</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="attendance2018" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2018 ? 'checked' : ''} />
                    <span>Attendance 2018</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="attendance2019" onChange={this.handleChange} checked={this.state.visibleColumnConfig.attendance2019 ? 'checked' : ''} />
                    <span>Attendance 2019</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="marks2016" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2016 ? 'checked' : ''} />
                    <span>Marks 2016</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="marks2017" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2017 ? 'checked' : ''} />
                    <span>Marks 2017</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="marks2018" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2018 ? 'checked' : ''} />
                    <span>Marks 2018</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="marks2019" onChange={this.handleChange} checked={this.state.visibleColumnConfig.marks2019 ? 'checked' : ''} />
                    <span>Marks 2019</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="optIn2018" onChange={this.handleChange} checked={this.state.visibleColumnConfig.optIn2018 ? 'checked' : ''} />
                    <span>Opt In 2018</span>
                  </label>
                </div>
                <div className="column-group-container">
                  <label className="label">
                    <input type="checkbox" name="optIn2019" onChange={this.handleChange} checked={this.state.visibleColumnConfig.optIn2019 ? 'checked' : ''} />
                    <span>Opt In 2019</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day1" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day1 ? 'checked' : ''} />
                    <span>Day 1</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day2" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day2 ? 'checked' : ''} />
                    <span>Day 2</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day3" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day3 ? 'checked' : ''} />
                    <span>Day 3</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day4" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day4 ? 'checked' : ''} />
                    <span>Day 4</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day5" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day5 ? 'checked' : ''} />
                    <span>Day 5</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day6" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day6 ? 'checked' : ''} />
                    <span>Day 6</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day7" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day7 ? 'checked' : ''} />
                    <span>Day 7</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="day8" onChange={this.handleChange} checked={this.state.visibleColumnConfig.day8 ? 'checked' : ''} />
                    <span>Day 8</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="createdDate" onChange={this.handleChange} checked={this.state.visibleColumnConfig.createdDate ? 'checked' : ''} />
                    <span>Created Date</span>
                  </label>
                  <label className="label">
                    <input type="checkbox" name="lastModifiedDate" onChange={this.handleChange} checked={this.state.visibleColumnConfig.lastModifiedDate ? 'checked' : ''} />
                    <span>Last Modified Date</span>
                  </label>
                </div>
              </div>
              <div className="modal-save-container">
                <div className="save-button-wrapper">
                  <button className="button-modal button-close" onClick={this.props.closeColumnOption}>Close</button>
                  <button className="button-modal button-save" onClick={this.setValuesOfVisibleColumnConfig}>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

ColumnConfig.propTypes = {
  visibleColumnConfig: PropTypes.object,
  setValuesOfVisibleColumnConfig: PropTypes.func,
  selectValue: PropTypes.bool,
  closeColumnOption: PropTypes.func,
  columnOptionIsOpen: PropTypes.bool,
};

ColumnConfig.defaultProps = {
  visibleColumnConfig: {},
  setValuesOfVisibleColumnConfig: () => {},
  selectValue: true,
  closeColumnOption: () => {},
  columnOptionIsOpen: false,
};
export default ColumnConfig;
