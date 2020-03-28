import React, { Component } from 'react';
import ReactSelect from 'react-select';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// const TypographyStyled = styled(Typography)`
//    color: ${getThemeProps('typography.titleFieldColor.color')}
//    font-weight: bold !important;
//    display: block;
//   `;

function MultiSelect(props) {
  const { options, onChange, value, placeholder, schema, uiSchema } = props;
  const { enumOptions } = options;
  const style = get(uiSchema, 'ui:options.style', {});
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


  return (
    <ReactSelect
      isMulti
      style={{ ...fieldStyle }}
      onChange={(event) => onChange(event)}
      options={getEnumOptions()}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default MultiSelect;
