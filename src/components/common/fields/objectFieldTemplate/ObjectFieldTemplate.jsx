import PropTypes from 'prop-types';
import React from 'react';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import Col from 'pepcus-core/lib/Col';
import Row from 'pepcus-core/lib/Row';
import { getThemeProps } from 'pepcus-core/utils/theme';

import FormGroupContent from './FormGroupContent';

const ObjectFieldTemplateStyled = styled.div`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('ObjectFieldTemplate.styles')};
`;

const RowStyled = styled(Row)`
    border: 1px solid;
    border-color: ${getThemeProps('colors.smallHeader')}
    border-style: outset;
    padding: 10px;`;

function ObjectFieldTemplate(props) {
  const {
    DescriptionField,
    TitleField,
    description,
    formContext,
    idSchema,
    properties,
    required,
    schema,
  } = props;
  const formGroup = _get(schema, 'formGroup', false);
  const uiSchemaTitle = _get(props, 'uiSchema.ui:title');
  const propsTitle = _get(props, 'title');
  const schemaId = _get(idSchema, '$id');
  const titleId = `${schemaId}__title`;
  const descriptionId = `${schemaId}__description`;
  const rowProps = _get(props, 'uiSchema.ui:options.row', {});
  const isRoot = schemaId === 'root';
  const gutter = typeof rowProps.gutter === 'undefined' ? false : rowProps.gutter;
  const displayTitle = _get(props, 'uiSchema.ui:options.label', true);
  const renderTitle = () =>
    displayTitle && (
      <TitleField
        formContext={formContext}
        id={titleId}
        required={required}
        root={isRoot}
        title={propsTitle || uiSchemaTitle}
      />
    );
  const renderProperty = (prop) => {
    // Extract the `col` props, if available.
    const colProps = _get(prop, 'content.props.uiSchema.ui:options.col', {});
    // Extract the gutter from `colProps`.
    const colGutterProp = _get(colProps, 'gutter');
    // Define the gutter for the column.
    const colGutter = typeof colGutterProp === 'undefined' ? true : colGutterProp;
    // Extract the content to render.
    const content = _get(prop, 'content');
    // To fix the margins, we need to match the last index with current index.
    const currentIndex = _findIndex(properties, prop);
    // Should we remove the bottom margin?
    const removeBottomMargin = currentIndex === properties.length - 1;
    // Return the Column
    return (
      <Col
        key={prop.name}
        gutter={isRoot ? false : colGutter}
        {...colProps}
        margin={removeBottomMargin ? '0 0 -15px 0' : colProps.margin || ''}
        size={colProps.size || 12}
      >
        {content}
      </Col>
    );
  };
  const renderRow = (items, boxBorder) => {
    if (boxBorder) {
      return (
        <RowStyled margin="10px 10px 0px 10px" justify="space-between" {...rowProps} gutter={gutter}>
          {items.map(prop => renderProperty(prop))}
        </RowStyled>
      );
    }
    return (
      <Row margin="10px 10px 0px 10px" justify="space-between" {...rowProps} gutter={gutter}>
        {items.map(prop => renderProperty(prop))}
      </Row>
    );
  };
  const renderContent = () => {
    const boxBorder = _get(schema, 'boxBorder', false);
    return (formGroup ? (
      <FormGroupContent schema={schema}>{renderRow(properties, boxBorder)}</FormGroupContent>
    ) : (
      renderRow(properties, boxBorder)
    ));
  };
  const renderDescription = () =>
    !_isEmpty(description) && (
      <DescriptionField
        description={description}
        formContext={formContext}
        id={descriptionId}
        root={isRoot}
      />
    );

  return (
    <ObjectFieldTemplateStyled>
      {renderTitle()}
      {isRoot && renderDescription()}
      {renderContent()}
    </ObjectFieldTemplateStyled>
  );
}

ObjectFieldTemplate.propTypes = {
  DescriptionField: PropTypes.func,
  TitleField: PropTypes.func,
  description: PropTypes.string,
  formContext: PropTypes.object,
  idSchema: PropTypes.object,
  properties: PropTypes.array,
  required: PropTypes.bool,
  schema: PropTypes.object.isRequired,
};

ObjectFieldTemplate.defaultProps = {
  DescriptionField: null,
  TitleField: null,
  description: '',
  formContext: {},
  idSchema: {},
  properties: [],
  required: false,
};

export default ObjectFieldTemplate;
