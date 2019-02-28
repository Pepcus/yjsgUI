import React from 'react';
import PropTypes from 'prop-types';

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

export default Radios;

Radios.propTypes = {
  style: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

Radios.defaultProps = {
  onChange: () => {},
  style: {
    'width': '400px',
    'padding': '10px',
    'margin': '5px',
    'border': '1px solid #cccccc',
    'borderRadius': '4px',
  },
  value: 0,
  checked: '',
};
