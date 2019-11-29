import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from 'pepcus-core/lib/Row';
import Input from 'pepcus-core/lib/Input';
import Button from 'pepcus-core/lib/Button';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

const TypographyStyled = styled(Typography)`
   font-size: 25px !important;
   ${({ theme }) => theme.media.down('sm')`
        font-size: 16px !important;
    `}
`;

const LabelStyled = styled(Typography)`
   margin-top: 5px;
   color: ${getThemeProps('typography.titleFieldColor.color')}
   font-weight: bold !important;
   display: block;
  `;

function FieldInput({
  error,
  idSchema,
  autofocus,
  fieldStyle,
  disabled,
  readonly,
  handleOnChange,
  type,
  minLength,
  maxLength,
  placeholder,
  setValue,
  fieldValue,
  inputFieldTitle,
}) {
  const onChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Row height="100%" width="100%" margin="0">
      <Row height="100%" width="100%" margin="0" display="flex">
        <LabelStyled fullWidth type="label">
          {inputFieldTitle}
        </LabelStyled>
        <Input
          id={idSchema.$id}
          autoFocus={autofocus}
          style={{ 'height': '35px !important', 'width': '94%', 'borderRadius': '4px 0px 0px 4px', ...fieldStyle }}
          disabled={disabled}
          readonly={readonly}
          onChange={onChange}
          type={type}
          min={minLength}
          max={maxLength}
          placeholder={placeholder}
          value={fieldValue || ''}
          color="primary"
        />
        <Button
          borderRadius="0 4px 4px 0"
          width="6%"
          noMinHeight
          noMinWidth
          height="35px"
          padding="5px"
          onClick={handleOnChange}
        >
          <TypographyStyled lineHeight="0" gutterBottom="0">+</TypographyStyled>
        </Button>
      </Row>
      <Typography gutterTop="10px" backgroundColor="unset" color="text" gutterBottom="0">
        {error}
      </Typography>
    </Row>
  );
}

FieldInput.propTypes = {
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
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The schema object for identifying the field.
   */
  idSchema: PropTypes.object,
  /**
   * inputFieldTitle is the title of add item input field
   */
  inputFieldTitle: PropTypes.string,
  /**
   * The name for the field.
   */
  type: PropTypes.string,
  /**
   * Callback fired on the change event of the input element.
   */
  handleOnChange: PropTypes.func,
  /**
   * If `true`, the field will be readonly.
   */
  readonly: PropTypes.bool,
  /**
   * Is this a required field?
   */
  /**
   * The JSON Schema for this field.
   */
  fieldStyle: PropTypes.object,

  placeholder: PropTypes.string,

  setValue: PropTypes.func,

  minLength: PropTypes.string,

  maxLength: PropTypes.string,
};

FieldInput.defaultProps = {
  autofocus: false,
  disabled: false,
  fieldValue: undefined,
  idSchema: {},
  inputFieldTitle: '',
  type: '',
  handleOnChange: () => {},
  readonly: false,
  fieldStyle: {},
  placeholder: '',
  setValue: () => {},
  minLength: '',
  maxLength: '',
};

export default FieldInput;
