import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import Button from 'pepcus-core/lib/Button';
import { getThemeProps } from 'pepcus-core/utils/theme';

import FormGroupTitle from './FormGroupTitle';
import FaIcon from 'pepcus-core/lib/FaIcon';

const ArrayFieldTemplateStyled = styled.div`
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('ArrayFieldTemplate.styles')};
`;

const ArrayFieldButtons = styled.div`
    padding: 10px 0;
`;

function ArrayFieldTemplate(props) {
  const { canAdd, formContext, idSchema, items, onAddClick, required } = props;

  const schemaId = _get(idSchema, '$id');
  const uiSchemaTitle = _get(props, ['uiSchema', 'ui:title']);
  const propsTitle = _get(props, 'title');
  const titleId = `${schemaId}__title`;

  const renderTitle = () => (
    <FormGroupTitle
      formContext={formContext}
      id={titleId}
      required={required}
      root={schemaId === 'root'}
      title={propsTitle || uiSchemaTitle}
    />
  );

  return (
    <ArrayFieldTemplateStyled>
      {renderTitle()}
      {items.map(item => (
        <div key={item.index}>
          <div>{item.children}</div>
          <ArrayFieldButtons>
            {item.hasMoveDown && (
              <Button
                noMinWidth
                noPaddingY
                onClick={item.onReorderClick(item.index, item.index + 1)}
                style={{ marginRight: '10px' }}
                width="47px"
              >
                <FaIcon icon={faChevronDown} />
              </Button>
            )}
            {item.hasMoveUp && (
              <Button
                noMinWidth
                noPaddingY
                onClick={item.onReorderClick(item.index, item.index - 1)}
                style={{ marginRight: '10px' }}
                width="47px"
              >
                <FaIcon icon={faChevronUp} />
              </Button>
            )}
            <Button
              noMinWidth
              noPaddingY
              onClick={item.onDropIndexClick(item.index)}
              color="error"
            >
              <FaIcon icon={faTrash} />
            </Button>
          </ArrayFieldButtons>
        </div>
      ))}

      {canAdd && (
        <div>
          <Button onClick={onAddClick}>
            <FaIcon icon={faPlus} />
          </Button>
        </div>
      )}
    </ArrayFieldTemplateStyled>
  );
}

ArrayFieldTemplate.propTypes = {
  canAdd     : PropTypes.bool,
  formContext: PropTypes.object,
  idSchema   : PropTypes.object,
  items      : PropTypes.array,
  onAddClick : PropTypes.func,
  required   : PropTypes.bool
};

ArrayFieldTemplate.defaultProps = {
  canAdd     : false,
  formContext: null,
  idSchema   : {},
  items      : [],
  onAddClick : () => {},
  required   : false
};

export default ArrayFieldTemplate;
