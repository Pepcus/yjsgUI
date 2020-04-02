import React, { Component } from 'react';
import ReactSelect from 'react-select';
import isEmpty from 'lodash/isEmpty';


function MultiSelect(props) {
  const { options, onChange, value, placeholder, schema, uiSchema } = props;
  const { enumOptions, style } = options;
  const { fieldStyle } = style;
  const getEnumOptionsFromEnumValues = ({ enumValues = [], enumNames = [] }) => {
    return enumValues.map((enumValue, index) => ({
      label: enumNames.length ? enumNames[index] : enumValue,
      value: enumValue,
    }))
  };

  const getEnumOptions = () => {
    const { enum: enumValues, enumNames } = schema;
    if (!isEmpty(enumOptions)) {
      return enumOptions;
    } else if (isEmpty(enumOptions) && !isEmpty(enumValues)) {
      return getEnumOptionsFromEnumValues({ enumValues, enumNames })
    } else {
      return [];
    }
  };

  /**
   * For more info on react-select style
   * visit: https://react-select.com/styles
   */
  const getCustomStyles = () => {
    return {
      multiValue: (provided, state) => {
        return {
          ...provided,
          width: '120px',
        };
      },
      menu: (provided, state) => ({
        ...provided,
        textAlign: 'left',
      }),
    }
  };


  return (
    <ReactSelect
      isMulti
      styles={{...getCustomStyles(), ...fieldStyle,}}
      onChange={(event) => onChange(event)}
      options={getEnumOptions()}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default MultiSelect;
