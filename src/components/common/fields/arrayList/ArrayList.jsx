import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

import Box from 'pepcus-core/lib/Box';
import Col from 'pepcus-core/lib/Col';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import { getThemeProps } from 'pepcus-core/utils/theme';
import FaIcon from 'pepcus-core/lib/FaIcon';

import * as customValidators from 'utils/validations';
import { getConstants } from 'reducers/constants';

import FieldInput from './FieldInput';

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('typography.titleFieldColor.color')}
   font-weight: bold !important;
   display: block;
  `;

const ColStyled = styled(Col)`
   display: flex;
   padding: 0;
   @media (max-width: 1024px){
        display: flex;
    }
   @media (max-width: 414px){
        display: block;
        padding: 0;
    }
`;

const MemberListStyled = styled(Typography)`
   width: 100%
`;
const RowStyled = styled(Row)`
    width: 50%;
    @media (max-width: 414px){
        width: 100%
        padding: 0;
        margin: 0;
    } 
`;
/**
 * ArrayList if array list for JSON form
 */
class ArrayList extends Component {
  constructor(props) {
    const { formData } = props;
    super(props);
    this.state = {
      data: formData ? [...formData] : [],
      fieldValue: '',
      error: '',
    };
  }

  handleOnChange = () => {
    const { data, fieldValue } = this.state;
    const { constants, schema } = this.props;
    const validationFunction = get(schema, 'items.validationFunction', '');
    const test = customValidators[validationFunction](fieldValue, constants);
    const { onChange } = this.props;
    if (!isEmpty(fieldValue) && isEmpty(test)) {
      const temporaryData = data;
      temporaryData.push(fieldValue);
      onChange(temporaryData);
      this.setState({
        data: temporaryData,
        fieldValue: '',
        error: '',
      });
    } else if (!isEmpty(fieldValue) && !isEmpty(test)) {
      // Form validation does not work for required filed because the value of the field is empty or null.
      onChange();
      this.setState({
        error: test,
      });
    }
  };

  removeMember = (index) => {
    const { data } = this.state;
    const { onChange } = this.props;
    const temporaryData = data;
    temporaryData.splice(index, 1);
    this.setState({
      data: temporaryData,
    });
    onChange(temporaryData);
  };

  getData = () => {
    const { data } = this.state;
    if (!isEmpty(data)) {
      return data.map((item, index) =>
        (
          <MemberListStyled gutterBottom="5px">
            {index + 1}. {item}
            <FaIcon
              color="primary"
              icon={faTimesCircle}
              onClick={() => { this.removeMember(index); }}
            />
          </MemberListStyled>));
    }
    return null;
  };

  setValue = (value) => {
    this.setState({
      fieldValue: value,
      error: '',
    });
  };

  render() {
    const { schema, name, uiSchema, required, idSchema, autofocus, disabled, readonly } = this.props;

    const { fieldValue, error } = this.state;

    const title = get(schema, 'title', name);

    const inputFieldTitle = get(schema, 'inputFieldTitle', 'Add Items');

    const label = get(uiSchema, 'ui:options.label', true);

    const type = get(schema, 'items.type', 'number');

    const minLength = get(schema, 'minLength');

    const maxLength = get(schema, 'maxLength');

    const style = get(uiSchema, 'ui:options.style', {});

    const { titleStyle, fieldStyle, fieldWrapper } = style;

    const placeholder = get(uiSchema, 'ui:placeholder', '');

    return (
      /* This Col is used for adjust the position of field in form */
      <ColStyled {...fieldWrapper} padding="0px">
        <RowStyled margin="0 15px 0 0">
          <TypographyStyled fullWidth type="label" style={titleStyle}>
            {label ? title : null}
            <Typography fontSize="20px" color="error" type="separator">{required && label ? '*' : null}</Typography>
          </TypographyStyled>
          <Box
            backgroundColor="unset"
            borderColor="unset"
            padding="0"
            borderStyle="none"
            borderRadius="none"
            margin="0"
          >
            {this.getData()}
          </Box>
        </RowStyled>
        <RowStyled height="100%" margin="0">
          <FieldInput
            error={error}
            inputFieldTitle={inputFieldTitle}
            idSchema={idSchema}
            autofocus={autofocus}
            fieldStyle={fieldStyle}
            disabled={disabled}
            readonly={readonly}
            handleOnChange={this.handleOnChange}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            placeholder={placeholder}
            fieldValue={fieldValue}
            setValue={this.setValue}
          />
        </RowStyled>
      </ColStyled>
    );
  }
}

ArrayList.propTypes = {
  /**
   *  If `true`, field should automatically get focus when the page loads
   */
  autofocus: PropTypes.bool,

  constants: PropTypes.object,
  /**
   * If `true`, the field is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The field data.
   */
  formData: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
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

ArrayList.defaultProps = {
  autofocus: false,
  constants: {},
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

const mapStateToProps = state => ({
  constants: getConstants(state),
});
export default connect(mapStateToProps, null)(ArrayList);
