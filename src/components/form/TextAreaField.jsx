import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/ErrorMessage';

/**
 * TextAreaField render textArea field
 * @type {Class}
 */
class TextAreaField extends Component {

  constructor(props) {
    super(props);

    this._handleOnChange = this.handleOnChange.bind(this);
    this._populateValue = this.populateValue.bind(this);
  }

  handleOnChange(e) {
    this.props.onInputChange(e.target.value, this.props.name);
  }

  populateValue() {
    if (this.props.value) {
      return this.props.value;
    }
    return '';
  }

  render() {
    const {
      label,
      placeholder,
      errorMessage,
      isRequired,
      disabled,
      min,
      max,
    } = this.props;

    const newLabel = isRequired ? `${label} * ` : label;

    if (errorMessage) {
      return (
        <div className="inputWrapper">
          <div className="has-error inputWrapperContainer errorInputField">
            <div className="inputLabel"><label>{newLabel}</label></div>
            <div>
              <textarea
                className="textAreaText"
                type="textArea"
                placeholder={placeholder}
                onChange={this._handleOnChange}
                value={this._populateValue()}
                min={min}
                max={max}
                disabled={disabled}
              />
            </div>
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
      );
    }
    return (
      <div className="inputWrapper">
        <div className="inputWrapperContainer">
          <div className="inputLabel"><label>{newLabel}</label></div>
          <div>
            <textarea
              className="textAreaText"
              type="textArea"
              placeholder={placeholder}
              onChange={this._handleOnChange}
              value={this._populateValue()}
              min={min}
              max={max}
              disabled={disabled}
            />
          </div>
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    );
  }
}

TextAreaField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  onInputChange: PropTypes.func,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
};

TextAreaField.defaultProps = {
  style: {},
  type: 'text',
  label: '',
  name: '',
  placeholder: '',
  onInputChange: () => {},
  errorMessage: '',
  value: '',
  isRequired: false,
  disabled: false,
  min: 0,
  max: 0,
};


export default TextAreaField;
