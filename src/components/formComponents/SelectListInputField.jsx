import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/ErrorMessage';
import {
  PLEASE_SELECT_ANY_ONE_TEXT,
} from '../../constants/text';

/**
 * SelectListInputField render dropdown list.
 * @type {Class}
 * */
class SelectListInputField extends Component {

  constructor(props) {
    super(props);

    this._handleOnChange = this.handleOnChange.bind(this);
    this._populateValue = this.populateValue.bind(this);
  }

  /**
   * renderOptionStatements method render options
   * @return {*[]} options
   */
  renderOptionStatements() {
    return this.props.options.map((iterator, index) =>
      (
        <option value={iterator.value} key={index}>
          {iterator.text}
        </option>),
    );
  }

  /**
   * populateValue method return conditional value into option
   * @param {String} value
   * @return {String}
   */
  populateValue(value) {
    if (!value) {
      return 'select';
    } return value;
  }

  /**
   * handleOnChange handle onChange value in drop down option
   * @param {Object} event
   */
  handleOnChange(event) {
    this.props.onInputChange(event.target.value, this.props.name);
  }

  render() {

    const {
      name,
      value,
      label,
      isRequired,
      errorMessage,
      disabled,
      style,
    } = this.props;

    const newLabel = isRequired ? `${label} * ` : label;

    if (errorMessage) {

      return (
        <div className="inputWrapper">
          <div className="has-error inputWrapperContainer errorInputField">
            <div className="inputLabel">
              <label>{newLabel}</label>
            </div>
            <div>
              <select
                className="selectInputText"
                name={name}
                onChange={this._handleOnChange}
                value={this._populateValue(value)}
                disabled={disabled}
                style={style}
              >
                <option value="select" disabled>{PLEASE_SELECT_ANY_ONE_TEXT}</option>
                {this.renderOptionStatements()}
              </select>
            </div>
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      );
    }

    return (
      <div className="inputWrapper">
        <div className="inputWrapperContainer">
          <div className="inputLabel">
            <label>{newLabel}</label>
          </div>
          <div>
            <select
              className="selectInputText"
              name={name}
              onChange={this._handleOnChange}
              value={this._populateValue(value)}
              disabled={disabled}
              style={style}
            >
              <option value="select" disabled>{PLEASE_SELECT_ANY_ONE_TEXT}</option>
              {this.renderOptionStatements()}
            </select>
          </div>
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    );
  }
}

SelectListInputField.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  options: PropTypes.array,
  style: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

SelectListInputField.defaultProps = {
  disabled: false,
  errorMessage: '',
  isRequired: false,
  label: '',
  name: '',
  onInputChange: () => {},
  options: [],
  style: {},
  value: '',
};

export default SelectListInputField;
