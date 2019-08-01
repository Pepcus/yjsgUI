/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Col from 'ravenjs/lib/Col';
import Row from 'ravenjs/lib/Row';
import {
  Select,
  SelectOption,
} from 'ravenjs/lib/Input';

import InputField from 'components/common/fields/InputField';

const defaultTitleStyle = {
  'fontWeight': 'bold',
  'display': 'block',
  'marginBottom': '7px',
  'color': '#4c4c4c',
  'fontSize': '14px',
};

const SelectStyled = styled(Select)`
border-radius: 4px;
&:invalid {
    color: gray;
  }
`;

const SelectOptionStyled = styled(SelectOption)`
color: black;
`;

/**
 * InputField if inputField for JSON form
 * @param {Object} props
 * @return {HTML}
 * @constructor
 */

function SelectList(props) {

  const {
    disabled,
    idSchema,
    name,
    onChange,
    required,
    schema,
    uiSchema,
  } = props;

  const title = get(schema, 'title', name);

  const defaultValue = get(schema, 'default', '');

  const enumNames = get(schema, 'enumNames', []);

  const enums = get(schema, 'enum', []);

  const titleStyle = get(uiSchema, 'ui:options.style.titleStyle');

  const fieldStyle = get(uiSchema, 'ui:options.style.fieldStyle');

  const colProps = get(props, 'content.props.uiSchema.ui:options.col', {});

  const placeholder = get(uiSchema, 'ui:placeholder', '');

  function handleOnChange(event) {
    // form validation for required filed not work is case the value of field is empty or null
    const values = event ? event.target.value : '';

    if (isEmpty(values) || values === null) {
      onChange(undefined);
    } else {
      onChange(values);
    }
  }

  const renderOptionStatements = () => {
    if (enumNames) {
      return enums.map((iterator, index) =>
        (
          <SelectOptionStyled value={iterator} key={index}>
            {enumNames[index]}
          </SelectOptionStyled>),
      );
    }
    return enums.map((iterator, index) =>
      (
        <SelectOptionStyled value={iterator} key={index}>
          {iterator}
        </SelectOptionStyled>),
    );
  };

  const getSelectList = () => {
    if (enums) {
      return (
        <Col {...colProps}>
          <Row width="auto" margin="0 0 0 0">
            <label style={{ ...defaultTitleStyle, ...titleStyle }}>
              {title}{required ? '*' : ''}
            </label>
          </Row>
          <Row width="100%" margin="0 0 0 0">
            <SelectStyled
              disabled={disabled}
              style={{ ...fieldStyle }}
              width="100%"
              minWidth="100%"
              id={idSchema.$id}
              onChange={handleOnChange}
              required={required}
              defaultValue={defaultValue}
            >
              <SelectOptionStyled
                value=""
                disabled="disabled"
                style={{ display: 'none', color: 'red' }}
              >{placeholder}
              </SelectOptionStyled>
              {renderOptionStatements()}
            </SelectStyled>
          </Row>
        </Col>
      );
    } return <InputField {...props} />;
  };
  return getSelectList();
}

SelectList.propTypes = {
  /**
   *  If `true`, field should automatically get focus when the page loads
   */
  autofocus: PropTypes.bool,
  /**
   * If `true`, the field is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The schema object for identifying the field.
   */
  idSchema: PropTypes.object,
  /**
   * The name for the field.
   */
  name: PropTypes.string,
  /**
   * Callback fired on the change event of the input element.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the field will be readonly.
   */
  readonly: PropTypes.bool,
  /**
   * Is this a required field?
   */
  required: PropTypes.bool,
  /**
   * The JSON Schema for this field.
   */
  schema: PropTypes.object,
  /**
   * The JSON uiSchema for this field.
   */
  uiSchema: PropTypes.object,
};

SelectList.defaultProps = {
  autofocus: false,
  disabled: false,
  idSchema: {},
  name: '',
  onChange: () => {},
  readonly: false,
  required: false,
  schema: {},
  uiSchema: {},
};

export default SelectList;
