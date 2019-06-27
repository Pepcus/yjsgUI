import React from 'react';
import PropTypes from 'prop-types';

/**
 * render radio button with custom properties.
 * @param {Object} props
 * @return {HTML}
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
  checked: PropTypes.string,
  name: PropTypes.string,
  onInputChange: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Radios.defaultProps = {
  checked: '',
  name: '',
  onInputChange: () => {},
  text: '',
  value: 0,
};

export default Radios;
