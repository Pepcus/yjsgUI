import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/ErrorMessage';

/**
 * InputField render input field custom properties.
 */
class InputField extends Component {

  constructor(props) {
    super(props);

    this._handleOnChange = this.handleOnChange.bind(this);
    this._populateValue = this.populateValue.bind(this);
  }

  handleOnChange(e) {
    this.props.onInputChange(e.target.value, this.props.name);
  }

  populateValue() {
    const { value } = this.props;
    if (value) {
      return value;
    }
    return '';
  }

  render() {
    const {
      type,
      label,
      placeholder,
      errorMessage,
      isRequired,
      disabled,
    } = this.props;

    const newLabel = isRequired ? `${label} * ` : label;

    if (errorMessage) {
      return (
        <div className="inputWrapper">
          <div className="has-error inputWrapperContainer errorInputField">
            <div className="inputLabel"><label>{newLabel}</label></div>
            <div>
              <input
                className="inputText"
                type={type}
                placeholder={placeholder}
                onChange={this._handleOnChange}
                value={this._populateValue()}
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
            <input
              className="inputText"
              type={type}
              placeholder={placeholder}
              onChange={this._handleOnChange}
              value={this._populateValue()}
              disabled={disabled}
            />
          </div>
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    );
  }
}

export default InputField;

InputField.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

InputField.defaultProps = {
  disabled: false,
  errorMessage: '',
  isRequired: false,
  label: '',
  name: '',
  onInputChange: () => {},
  placeholder: '',
  type: 'text',
  value: '',
};
