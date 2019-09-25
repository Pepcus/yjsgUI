import React from 'react';
import PropTypes from 'prop-types';

/*
  TODO: This component is deprecated.
 */
const Radios = (props) => {

  const { name, value, checked, text, onInputChange } = props;

  const handleOnInputChange = (e) => {
    onInputChange(e.target.value);
  };

  return (
    <label className="optionLabel">
      <input
        className="radioInput"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleOnInputChange}
      />
      {text}
    </label>
  );
};

Radios.propTypes = {
  text: PropTypes.string,
  checked: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onInputChange: PropTypes.func,
};

Radios.defaultProps = {
  text: '',
  checked: '',
  name: '',
  value: 0,
  onInputChange: () => {},
};

export default Radios;
