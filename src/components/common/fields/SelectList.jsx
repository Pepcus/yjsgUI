/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Col from 'pepcus-core/lib/Col';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import {
  Select,
  SelectOption,
} from 'pepcus-core/lib/Input';
import { getThemeProps } from 'pepcus-core/utils/theme';


import InputField from 'components/common/fields/InputField';

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('typography.titleFieldColor.color')}
   font-weight: bold !important;
   display: block;
  `;

const SelectStyled = styled(Select)`
  border-radius: 4px;
  &:invalid {
      color: ${getThemeProps('palette.text.color')};
    }
`;

const SelectOptionStyled = styled(SelectOption)`
  color: ${getThemeProps('palette.dark.color')};
  display: ${props => (props.hidden ? 'none' : null)}
`;

/**
 * SelectList if SelectList for JSON form
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
    formData,
  } = props;

  const title = get(schema, 'title', name);

  const label = get(uiSchema, 'ui:options.label', true);

  const enumNames = get(schema, 'enumNames', []);

  const enums = get(schema, 'enum', []);

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

  const renderOptions = () => enums.map((enumValue, index) =>
    (
      <SelectOptionStyled value={enumValue} key={index}>
        {enumNames[index] || enumValue}
      </SelectOptionStyled>),
  );

  const getSelectList = () => {
    if (enums) {
      return (
        /* This Col is used for adjust the position of field in form */
        <Col {...fieldWrapper}>
          <Row width="100%" margin="0">
            <TypographyStyled type="label" style={titleStyle}>
              {label ? title : null}{required && label ? '*' : null}
            </TypographyStyled>
          </Row>
          <Row width="100%" margin="0">
            <SelectStyled
              disabled={disabled}
              style={fieldStyle}
              width="100%"
              minWidth="100%"
              id={idSchema.$id}
              onChange={handleOnChange}
              required={required}
              value={formData || ''}
            >
              <SelectOptionStyled
                value=""
                disabled
                hidden
              >{placeholder}
              </SelectOptionStyled>
              {renderOptions()}
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
