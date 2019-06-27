import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import Fuse from 'fuse.js';
import isEmpty from 'lodash/isEmpty';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';

import { THRESHOLD_VALUE } from '../constants/yjsg';

const {
  DEEP_SEARCH,
  NORMAL_SEARCH,
} = THRESHOLD_VALUE;

/**
 * AdvanceSearch component render common search react component
 * @type {class}
 */
class AdvanceSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      thresholdValue: NORMAL_SEARCH,
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

  componentDidMount() {

    const { checkedIds } = this.props;

    this.setState({
      checkedIds,
    });
  }

  componentWillReceiveProps(nextProps) {

    const { checkedIds } = nextProps;

    this.setState({
      checkedIds,
    });
  }

  /**
   * setInputValue method assign search value to inputValue in state
   * and maintained the check and uncheck students.
   * And in case search value is empty then reassign all student data.
   * @param {Object} event
   */
  setInputValue(event) {

    const { checkedIds } = this.state;
    const { students } = this.props;

    if (isEmpty(event.target.value)) {
      const studentsData = students.map((student) => {
        let finalStudentObject = cloneDeep(student);
        checkedIds.forEach((checkedUncheckedIdObject) => {
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
      this.props.onFilter(this.props.formatStudents(studentsData));
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

    const { inputValue, checkedIds } = this.state;
    const { students } = this.props;

    // set the search input value to empty string
    if (!isEmpty(inputValue)) {
      this.setState({
        inputValue: '',
      });
    }

    // assign default thresholdValue to 0.0
    // And set isMultipleIdSearchCheck to false.
    this.setState({
      thresholdValue: NORMAL_SEARCH,
      isMultipleIdSearchCheck: false,
      isDeepSearchCheck: false,
    });

    const studentsData = students.map((student) => {
      let finalStudentObject = cloneDeep(student);
      checkedIds.forEach((checkedUncheckedIdObject) => {
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

    this.props.onFilter(this.props.formatStudents(studentsData));
    // this.props.onFilter(this.props.formatStudents(this.props.students));
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
        thresholdValue: DEEP_SEARCH,
        isDeepSearchCheck: true,
        isMultipleIdSearchCheck: false,
      });

    } else {
      this.setState({
        thresholdValue: NORMAL_SEARCH,
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
        thresholdValue: NORMAL_SEARCH,
        isDeepSearchCheck: false,
        isMultipleIdSearchCheck: true,
      });

    } else {
      this.setState({
        isMultipleIdSearchCheck: false,
      });
    }
  }

  /**
   * clearButton method return clear button when inputValue is not empty.
   * @return {HTML} clear button
   */
  clearButton() {

    const { inputValue } = this.state;

    if (!isEmpty(inputValue)) {
      return <span className="clear-search"><i className="fa fa-times-circle" onClick={this._clearFilter} /></span>;
    } return null;
  }

  /**
   * advanceSearch method find the search result and also maintained check and uncheck students.
   * @param {Object} event
   */
  advanceSearch(event) {

    const {
      isMultipleIdSearchCheck,
      thresholdValue,
      inputValue,
      checkedIds,
    } = this.state;
    const { metaData, students } = this.props;

    event.preventDefault();

    // isMultipleIdSearchCheck is uncheck it do the search result according to search string
    // type of search (thresholdValue)
    if (!isMultipleIdSearchCheck) {
      const foundKeys = metaData.headerConfig.map(headerConfigObj => headerConfigObj.key,
      );
      const options = {
        shouldSort: true,
        threshold: thresholdValue,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: foundKeys,
      };

      if (!isEmpty(inputValue)) {

        const fuse = new Fuse(students, options);
        const result = fuse.search(inputValue);

        const studentsData = result.map((student) => {
          let finalStudentObject = cloneDeep(student);
          checkedIds.forEach((checkedUncheckedIdObject) => {
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
        this.props.onFilter(this.props.formatStudents(studentsData));
      }

    } else if (!isEmpty(inputValue)) {
      // isMultipleIdSearchCheck is check it do the search result according to search Ids.

      const searchStudentsIds = inputValue.split(',');
      const searchResult = [];

      for (const index in searchStudentsIds) {
        const result = students.filter(student =>
          student.id === Number(searchStudentsIds[index]));
        searchResult.push(...result);
      }

      const uniqSearchResult = uniqWith(searchResult, isEqual);

      const studentsData = uniqSearchResult.map((student) => {
        let finalStudentObject = cloneDeep(student);
        checkedIds.forEach((checkedUncheckedIdObject) => {
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

      this.props.onFilter(this.props.formatStudents(studentsData));
    }
  }

  render() {
    const { inputValue, isDeepSearchCheck, isMultipleIdSearchCheck } = this.state;

    return (
      <form id="advanceSearch" className="advanceSearchForm">
        <div className="input-radio">
          <label htmlFor="search_input" className="input-text">
            <input type="text" onChange={this.setInputValue} value={inputValue} className="search-input-advance" />
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
                onChange={this.onChangeDeepSearchCheckBox}
                checked={isDeepSearchCheck}
              />
              <label htmlFor="deep_search">Deep Search</label>
            </div>
            <div className="input-radio-container">
              <input
                type="checkbox"
                name="thresholdValue"
                className="checkbox-input"
                value={isMultipleIdSearchCheck}
                onChange={this.onChangeMultipleIdSearchCheckBox}
                checked={isMultipleIdSearchCheck}
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
  checkedIds: PropTypes.array,
  formatStudents: PropTypes.func,
  metaData: PropTypes.object,
  onFilter: PropTypes.func,
  students: PropTypes.array,
};

AdvanceSearch.defaultProps = {
  checkedIds: [],
  formatStudents: () => {},
  metaData: {},
  onFilter: () => {},
  students: [],
};

export default AdvanceSearch;
