import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../commonComponents/ErrorMessage';

class InputField extends Component {

  constructor(props) {
    super(props);

    this._handleOnChange = this.handleOnChange.bind(this);
    this._populateValue = this.populateValue.bind(this);
  }

  handleOnChange(e) {
    this.props.onInputChange(e.target.value, this.props.name);
  };

  populateValue() {
    if (this.props.value) {
      return this.props.value;
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

    if(errorMessage) {
      return (
        <div className={'inputWrapper'}>
          <div className={'has-error inputWrapperContainer errorInputField'}>
            <div className={'inputLabel'}><label>{newLabel}</label></div>
            <div>
              <input
                className={'inputText'}
                type={type}
                placeholder={placeholder}
                onChange={this._handleOnChange}
                value={this._populateValue()}
                disabled={disabled}
              />
            </div>
            <ErrorMessage errorMessage={errorMessage}/>
          </div>
        </div>
      );
    }
    return (
      <div className={'inputWrapper'}>
        <div className={'inputWrapperContainer'}>
          <div className={'inputLabel'}><label>{newLabel}</label></div>
          <div>
            <input
              className={'inputText'}
              type={type}
              placeholder={placeholder}
              onChange={this._handleOnChange}
              value={this._populateValue()}
              disabled={disabled}
            />
          </div>
          <ErrorMessage errorMessage={errorMessage}/>
        </div>
      </div>
    );
  }
}

export default InputField;

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.object,
  value:PropTypes.oneOfType([
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

InputField.defaultProps = {
  type: 'text',
  label: '',
  name: '',
  placeholder: '',
  onInputChange: () => {},
  errorMessage: '',
  value: '',
  isRequired: false,
  disabled: false,
};