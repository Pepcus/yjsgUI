import PropTypes from 'prop-types';
import React, { Component } from 'react';
import get from 'lodash/get';
import styled from 'styled-components';
import { faFileImport } from '@fortawesome/free-solid-svg-icons/faFileImport';

import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Input from 'pepcus-core/lib/Input';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

const TypographyStyled = styled(Typography)`
   color: ${getThemeProps('typography.titleFieldColor.color')}
   font-weight: bold !important;
   display: block;
  `;

const InputStyled = styled(Input)`
    height: 38;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    zIndex: -1;
`;

/**
 * UploadFileField if UploadFileField for JSON form
 */
class UploadFileField extends Component {
  constructor(props) {
    super(props);

    // Create a reference to the hidden `input` DOM element.
    this.hiddenFileInputRef = React.createRef();

    this.state = {
      filesList: [],
    };
  }

  /**
   * Get the `ui:options` for the current field.
   *
   * @method getUiOptions
   * @private
   * @param  {Object}      schema The schema to extract the options from
   * @return {Object}             The extracted options
   */
  getUiOptions = schema => get(schema, 'ui:options', {});

  /**
   * The label for the rendered `Input` component.
   *
   * @method getInputLabel
   * @return {string}
   */
  getInputLabel = () => {
    const { uiSchema, value } = this.props;
    const { filesList } = this.state;
    // Determine the value based on current formData or internal filesList.
    const files = value || filesList;
    // Get the uiOptions
    const options = this.getUiOptions(uiSchema);
    const { chooseFileLabel = 'Select a file...' } = options;
    const count = (files && files.length) || 0;
    // Based on the `count` value, update the label.
    if (!count) {
      return chooseFileLabel;
    } else if (count > 1) {
      return `${count} files selected.`;
    }
    return get(files, '[0].name', '1 file selected.');
  };

  handleOnUploadClick = (event) => {
    event.preventDefault();
    const { current } = this.hiddenFileInputRef;
    // Invoke the input click() event.
    current && typeof current.click === 'function' && current.click();
  };

  handleOnInputChange = (event) => {
    // Extract the `onChange` handler from props.
    const { onChange } = this.props;
    // Extract the files out of the file input.
    const { current } = this.hiddenFileInputRef;
    const files = (current && current.files) || {};
    // Update the current files list.
    this.setState(
      () => ({
        filesList: files,
      }),
      () => {
        // Invoke the `onChange` handler.
        typeof onChange === 'function' && onChange(files);
      },
    );
  };

  render() {
    const {
      disabled: disabledProps,
      idSchema,
      name,
      readonly,
      registry,
      required,
      schema,
      uiSchema,
    } = this.props;

    const style = get(uiSchema, 'ui:options.style', {});
    const label = get(uiSchema, 'ui:options.label', true);

    const { titleStyle, fieldStyle } = style;

    // Determine if the field is disabled
    const disabled = readonly || disabledProps;
    // Extract couple of fields from the props.
    const options = this.getUiOptions(uiSchema);
    const title = get(schema, 'title', name);
    const { $id: id } = idSchema;
    const {
      accept = '*',
      multiple = false,
      btnProps = {},
      btnLabel = 'Choose File',
      showIcon = true,
    } = options;
    // Render the `FileField` component.
    return (
      <Row width="auto">
        <Col size={12}>
          <TypographyStyled type="label" style={titleStyle}>
            {label ? title : null}
            <Typography fontSize="20px" color="error" type="separator">{required && label ? '*' : null}</Typography>
          </TypographyStyled>
        </Col>
        <Row width="100%">
          <Col size={8} style={{ position: 'relative' }}>
            <Input
              disabled
              required={required}
              type="text"
              value={this.getInputLabel()}
              style={{ ...fieldStyle }}
            />
            <InputStyled
              accept={accept}
              defaultValue=""
              disabled={disabled}
              id={id}
              multiple={multiple}
              onChange={this.handleOnInputChange}
              ref={this.hiddenFileInputRef}
              required={required}
              tabIndex={-1}
              type="file"
            />
          </Col>
          <Col size={4}>
            <Button
              disabled={disabled}
              onClick={this.handleOnUploadClick}
              type="button"
              {...btnProps}
            >
              {showIcon && <FaIcon icon={faFileImport} margin="0 5px 0 0" />}
              {btnLabel}
            </Button>
          </Col>
        </Row>
      </Row>
    );
  }
}

UploadFileField.propTypes = {
  /**
   * If `true`, the field is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The schema object for identifying the field.
   */
  idSchema: PropTypes.object.isRequired,
  /**
   * The name for the field.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback fired on the change event of the input element.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * If `true`, the field will be readonly.
   */
  readonly: PropTypes.bool,
  /**
   * The form's registry object, containing the registered custom fields and widgets.
   */
  registry: PropTypes.object.isRequired,
  /**
   * Is this a required field?
   */
  required: PropTypes.bool,
  /**
   * The JSON Schema for this field.
   */
  schema: PropTypes.object.isRequired,
  /**
   * The JSON uiSchema for this field.
   */
  uiSchema: PropTypes.object.isRequired,
  /**
   * The value for this field.
   */
  value: PropTypes.object,
};

UploadFileField.defaultProps = {
  disabled: null,
  readonly: null,
  required: null,
  value: null,
};

export default UploadFileField;
