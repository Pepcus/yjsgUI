/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty'


import * as shortId from 'shortid';
import {
  Col,
  Input,
  Row,
  List,
  ListItem,
} from 'ravenjs';

const defaultTitleStyle = {
  'fontWeight': 'bold',
  'display': 'block',
  'marginBottom': '7px',
  'color': '#4c4c4c',
  'fontSize': '14px',
};

function InputField(props) {

  const {
    schema,
    uiSchema,
    name,
    onChange,
    readonly,
    disabled,
    required,
    rawErrors,
    autofocus,
    idSchema,
    registry,
  } = props;

  const title = get(schema, 'title', name);

  const type = get(schema, 'type', 'number');

  const minLength = get(schema, 'minLength');

  const maxLength = get(schema, 'maxLength');

  const titleStyle = get(uiSchema, 'ui:options.style.titleStyle');

  const fieldStyle = get(uiSchema, 'ui:options.style.fieldStyle');

  const colProps = get(props, 'content.props.uiSchema.ui:options.col', {});

  const placeholder = get(uiSchema, 'ui:placeholder', '');

  const errorList = () => (
    <List>
      {rawErrors ? rawErrors.map(error => (
        <ListItem key={shortId.generate()}>
          {error}
        </ListItem>)) : null}
    </List>
  );

  function handleOnChange(event) {
    // form validation for required filed not work is case the value of field is empty or null
    const value = event ? event.target.value : '';

    if (isEmpty(value) || value === null) {
      onChange(undefined);
    } else {
      onChange(event.target.value);
    }
  }

  return (
    <Col {...colProps}>
      <Row width="auto" >
        <label style={{ ...defaultTitleStyle, ...titleStyle }}>
          {title}{required ? '*' : ''}
        </label>
      </Row>
      <Row width="auto">
        <Input
          id={idSchema.$id}
          autoFocus={autofocus}
          style={fieldStyle}
          disabled={disabled}
          readonly={readonly}
          onChange={handleOnChange}
          type={type}
          min={minLength}
          max={maxLength}
          placeholder={placeholder}
        />
      </Row>
    </Col>
  );
}

InputField.propTypes = {
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
   * The array of field errors
   */
  rawErrors: PropTypes.array,
  /**
   * If `true`, the field will be readonly.
   */
  readonly: PropTypes.bool,
  /**
   * The form's registry object, containing the registered custom fields and widgets.
   */
  registry: PropTypes.object,
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

InputField.defaultProps = {
  autofocus: false,
  disabled: false,
  idSchema: {},
  name: '',
  onChange: () => {},
  rawErrors: [],
  readonly: false,
  registry: {},
  required: false,
  schema: {},
  uiSchema: {},
};

export default InputField;
