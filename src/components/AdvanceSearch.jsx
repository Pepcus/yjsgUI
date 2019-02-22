import React, { Component } from 'react';
import Fuse from 'fuse.js';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

/**
 * AdvanceSearch component render common search react component
 * @type {class}
 */
class AdvanceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thresholdValue: '0.0',
      inputValue: '',
      isMultipleIdSearchCheck: false,
      isDeepSearchCheck: false,
      checkedIds: [],
    };
    this.advanceSearch = this.advanceSearch.bind(this);
    this.onChangeDeepSearchCheckBox = this.onChangeDeepSearchCheckBox.bind(this);
    this.setInputValue = this.setInputValue.bind(this);
    this.onChangeMultipleIdSearchCheckBox = this.onChangeMultipleIdSearchCheckBox.bind(this);
    // this may be use in future.
    this._clearFilter = this.clearFilter.bind(this);
    this.clearButton = this.clearButton.bind(this);
  }
  /**
   * setInputValue method assign search value to inputValue in state.
   * And in case search value is empty then reassign all student data.
   * @param {Object} event
   */
  componentDidMount() {
    this.setState({
      checkedIds: this.props.checkedIds,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      checkedIds: nextProps.checkedIds,
    });
  }

  setInputValue(event) {
    if (isEmpty(event.target.value)) {
      const studentsData = this.props.students.map((student) => {
        let finalStudentObject = student;
        this.state.checkedIds.forEach((checkedUncheckedIdObject) => {
          if (String(student.id) === String(checkedUncheckedIdObject.id)) {
            finalStudentObject = { ...student, studentId: String(checkedUncheckedIdObject.id), isChecked: checkedUncheckedIdObject.isChecked };
          }
        });
        return finalStudentObject;
      });
      this.props.onFilter(this.props.formattedStudent(studentsData));
    }
    this.setState({
      inputValue: event.target.value,
    });
  }
  /**
   * clearFilter method clear the search result
   */
  // This may be use in future
   clearFilter() {
    // set the search input value to empty string
    if (!isEmpty(this.state.inputValue)) {
      this.setState({
        inputValue: '',
      });
    }
    // assign default thresholdValue to 0.0
    // And set isMultipleIdSearchCheck to false.
    this.setState({
      thresholdValue: '0.0',
      isMultipleIdSearchCheck: false,
      isDeepSearchCheck: false,
    });
    const studentsData = this.props.students.map((student) => {
      let finalStudentObject = student;
      this.state.checkedIds.forEach((checkedUncheckedIdObject) => {
        if (String(student.id) === String(checkedUncheckedIdObject.id)) {
          finalStudentObject = {
            ...student,
            studentId: String(checkedUncheckedIdObject.id),
            isChecked: checkedUncheckedIdObject.isChecked,
          };
        }
      });
      return finalStudentObject;
    });
    this.props.onFilter(this.props.formattedStudent(studentsData));
    // this.props.onFilter(this.props.formattedStudent(this.props.students));
  }
  /**
   * onChangeDeepSearchCheckBox method on OnChange of search option check box
   * And manage thresholdValue, isDeepSearchCheck and isMultipleIdSearchCheck value
   * according to check and uncheck check box .
   * @param {Object} event
   */
  onChangeDeepSearchCheckBox(event) {
    if (event.target.checked) {
      this.setState({
        thresholdValue: event.target.value,
        isDeepSearchCheck: true,
        isMultipleIdSearchCheck: false,
      });
    } else {
      this.setState({
        thresholdValue: '0.0',
        isDeepSearchCheck: false,
      });
    }
  }
  /**
   * onChangeMultipleIdSearchCheckBox method set the values of
   * thresholdValue, isDeepSearchCheck and isMultipleIdSearchCheck
   * according to check or uncheck of multiple Id search option
   * @param {Object} event
   */
  onChangeMultipleIdSearchCheckBox(event) {
    if (event.target.checked) {
      this.setState({
        thresholdValue: '0.0',
        isDeepSearchCheck: false,
        isMultipleIdSearchCheck: true,
      });
    } else {
      this.setState({
        isMultipleIdSearchCheck: false,
      });
    }
  }
  clearButton() {
    if (!isEmpty(this.state.inputValue)) {
      return <span className="clear-search"><i className="fa fa-times-circle" onClick={this._clearFilter} /></span>;
    }
  }
  /**
   * advanceSearch method find the search result.
   * @param {Object} event
   */
  advanceSearch(event) {
    event.preventDefault();
    // isMultipleIdSearchCheck is uncheck it do the search result according to search string
    // type of search (thresholdValue)
    if (!this.state.isMultipleIdSearchCheck) {
      const foundKeys = this.props.metaData.headerConfig.map(object => object.key,
      );
      const options = {
        shouldSort: true,
        threshold: Number(this.state.thresholdValue),
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: foundKeys,
      };
      if (!isEmpty(this.state.inputValue)) {
        const fuse = new Fuse(this.props.students, options);
        const result = fuse.search(this.state.inputValue);
        const studentsData = result.map((student) => {
          let finalStudentObject = student;
          this.state.checkedIds.forEach((checkedUncheckedIdObject) => {
            if (String(student.id) === String(checkedUncheckedIdObject.id)) {
              finalStudentObject = { ...student, studentId: String(checkedUncheckedIdObject.id), isChecked: checkedUncheckedIdObject.isChecked };
            }
          });
          return finalStudentObject;
        });
        this.props.onFilter(this.props.formattedStudent(studentsData));
      }
    } else {
      // isMultipleIdSearchCheck is check it do the search result according to search Ids.
      const searchStudentsIds = this.state.inputValue.split(',');
      const searchResult = [];
      for (const index in searchStudentsIds) {
        const result = this.props.students.filter(student => student.id === Number(searchStudentsIds[index]));
        searchResult.push(...result);
      }
      const studentsData = searchResult.map((student) => {
        let finalStudentObject = student;
        this.state.checkedIds.forEach((checkedUncheckedIdObject) => {
          if (String(student.id) === String(checkedUncheckedIdObject.id)) {
            finalStudentObject = { ...student, studentId: String(checkedUncheckedIdObject.id), isChecked: checkedUncheckedIdObject.isChecked };
          }
        });
        return finalStudentObject;
      });
      this.props.onFilter(this.props.formattedStudent(studentsData));
    }
  }
  render() {
    return (
      <form id="advanceSearch" className="advanceSearchForm">
        <div className="input-radio">
          <label htmlFor="search_input" className="input-text">
            <input type="text" onChange={this.setInputValue} value={this.state.inputValue} className="search-input-advance" />
            {this.clearButton()}
            <button type="submit" form="advanceSearch" value="Submit" title="Search" className="search" onClick={this.advanceSearch}>
              <i className="fa fa-search" />
            </button>
          </label>
          {/** TODO: this button work when user want to clear a search result.
           This may be use in future. */}
          {/* <button
          type="reset"
          value="Reset"
          onClick={this.clearFilter}
          className = "advance-search-button display-none">
            <i className="fa fa-trash card-icon"/>Clear
          </button>*/}
          <div className="advance-input-radio">
            {/** TODO: thisNormal Search search option(exact search).
             This may be use in future.*/}
            {/* <div className="input-radio-container display-none">
              <input
              type="checkbox"
              name="thresholdValue"
              value="0.0" onClick={this.onClickRadioButton}
              defaultChecked />
              <label htmlFor = "normal_search">Normal Search</label>
            </div>*/}
            <div className="input-radio-container">
              <input
                type="checkbox"
                name="thresholdValue"
                className="checkbox-input"
                value="0.6"
                onChange={this.onChangeDeepSearchCheckBox}
                checked={this.state.isDeepSearchCheck}
              />
              <label htmlFor="deep_search">Deep Search</label>
            </div>
            <div className="input-radio-container">
              <input
                type="checkbox"
                name="thresholdValue"
                className="checkbox-input"
                value={this.state.isMultipleIdSearchCheck}
                onChange={this.onChangeMultipleIdSearchCheckBox}
                checked={this.state.isMultipleIdSearchCheck}
              />
              <label htmlFor="deep_search">Multiple ID Search</label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

AdvanceSearch.propTypes = {
  onFilter: PropTypes.func,
  formattedStudent: PropTypes.func,
  students: PropTypes.array,
  metaData: PropTypes.object,
};

AdvanceSearch.defaultProps = {
  onFilter: () => {},
  formattedStudent: () => {},
  students: [],
  metaData: {},
};
export default AdvanceSearch;
