import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import get from 'lodash/get';

const animatedComponents = makeAnimated();

export default function MultipleSelectWidget(props) {
  const { enumOptions } = props.options;
  const { onChange, value, placeholder, uiSchema, schema } = props;
  const style = get(uiSchema, 'ui:options.style', {});
  const { fieldStyle } = style;

  const handleOnChange = (values) => {
    const data = [];
    values.forEach((obj) => {
      data.push(obj.value);
    });
    return onChange(data);
  };

  const formatData = (data) => {
    const dataObj = [];
    data.forEach((str) => {
      (schema.items.enum).forEach((enumValue, index) => {
        if (enumValue === str) {
          dataObj.push({
            label: schema.items.enumNames[index],
            value: enumValue,
          });
        }
      });
    });
    return dataObj;
  };

  return (
    <Select
      style={{ ...fieldStyle }}
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={value ? formatData(value) : undefined}
      isMulti
      onChange={handleOnChange}
      options={enumOptions}
      placeholder={placeholder}
    />
  );
}
