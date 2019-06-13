import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/ErrorMessage';

/**
 * TextAreaField render textArea field with custom properties
 * @type {Class}
 */
class TextAreaField extends Component {

  constructor(props) {
    super(props);

    this._handleOnChange = this.handleOnChange.bind(this);
    this._populateValue = this.populateValue.bind(this);
  }

  /**
   * handleOnChange handle onChange of text area input field
   * @param {Object} event
   */
  handleOnChange(event) {
    this.props.onInputChange(event.target.value, this.props.name);
  }

  /**
   * populateValue method populate value of text area input field
   * @return {*}
   */
  populateValue() {
    const { value } = this.props;
    if (value) {
      return value;
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
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

TextAreaField.defaultProps = {
  disabled: false,
  errorMessage: '',
  isRequired: false,
  label: '',
  min: 0,
  max: 0,
  name: '',
  onInputChange: () => {},
  placeholder: '',
  style: {},
  type: 'text',
  value: '',
};


export default TextAreaField;
