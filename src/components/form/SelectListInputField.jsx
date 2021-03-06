import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorMessage from 'components/common/ErrorMessage';
import { getConstants } from 'reducers/constants';

/*
  TODO: This component is deprecated.
 */
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

  renderOptionStatements() {
    return this.props.options.map((iterator, index) =>
      (
        <option value={iterator.value} key={index}>
          {iterator.text}
        </option>),
    );
  }
  populateValue(value) {
    if (!value) {
      return 'select';
    } return value;
  }

  handleOnChange(e) {
    this.props.onInputChange(e.target.value, this.props.name);
  }

  render() {
    const {
      constants,
      name,
      value,
      label,
      isRequired,
      errorMessage,
      disabled,
      style,
    } = this.props;
    const {
      PLEASE_SELECT_ANY_ONE_TEXT,
    } = constants;

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
  constants: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.array,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  style: PropTypes.object,
};

SelectListInputField.defaultProps = {
  constants: {},
  name: '',
  options: [],
  value: '',
  isRequired: false,
  disabled: false,
  errorMessage: '',
  label: '',
  onInputChange: () => {},
  style: {},
};

const mapStateToProps = state => ({
  constants: getConstants(state),
});

export default connect(mapStateToProps, null)(SelectListInputField);
