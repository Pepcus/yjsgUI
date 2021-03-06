import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Col from 'pepcus-core/lib/Col';
import Input from 'pepcus-core/lib/Input';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('typography.titleFieldColor.color')}
   font-weight: bold !important;
   display: block;
  `;

/**
 * InputField if inputField for JSON form
 * @param {Object} props
 * @return {HTML}
 * @constructor
 */
function InputField(props) {

  const {
    autofocus,
    disabled,
    idSchema,
    name,
    onChange,
    readonly,
    required,
    schema,
    uiSchema,
    formData,
  } = props;
  const title = get(schema, 'title', name);

  const label = get(uiSchema, 'ui:options.label', true);

  const type = get(schema, 'type', 'number');

  const minLength = get(schema, 'minLength');

  const maxLength = get(schema, 'maxLength');

  const style = get(uiSchema, 'ui:options.style', {});

  const { titleStyle, fieldStyle, fieldWrapper } = style;

  const placeholder = get(uiSchema, 'ui:placeholder', '');

  function handleOnChange(event) {
    // Form validation does not work for required filed because the value of the field is empty or null.
    const value = event ? event.target.value : '';

    if (isEmpty(value)) {
      onChange();
    } else {
      onChange(value);
    }
  }
  return (
    /* This Col is used for adjust the position of field in form */
    <Col {...fieldWrapper} padding="0px">
      <Row width="100%" margin="0" >
        <TypographyStyled type="label" style={titleStyle}>
          {label ? title : null}
          <Typography fontSize="20px" color="error" type="separator">{required && label ? '*' : null}</Typography>
        </TypographyStyled>
      </Row>
      <Row width="100%" margin="0">
        <Input
          id={idSchema.$id}
          autoFocus={autofocus}
          style={{ ...fieldStyle }}
          disabled={disabled}
          readonly={readonly}
          onChange={handleOnChange}
          type={type}
          min={minLength}
          max={maxLength}
          placeholder={placeholder}
          value={formData || ''}
          color="primary"
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
   * The field data.
   */
  formData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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

InputField.defaultProps = {
  autofocus: false,
  disabled: false,
  formData: undefined,
  idSchema: {},
  name: '',
  onChange: () => {},
  readonly: false,
  required: false,
  schema: {},
  uiSchema: {},
};

export default InputField;
