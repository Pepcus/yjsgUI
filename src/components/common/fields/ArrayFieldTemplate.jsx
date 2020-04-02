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

const ArrayFieldContainer = styled.div`
    display: flex;
    align-items: center;
    @media(max-width:768px) {
       display: block;
       border-bottom: 1px solid #c3b8b8;
    }
`;

const ArrayFieldButtons = styled.div`
    padding: 10px 0;
    width: 50px;
    @media(max-width:768px) {
        width: 100%;
    }
`;

const ArrayFormContainer = styled.div`
    width: calc(100% - 50px);
    @media(max-width:768px) {
       width: 100%;
    }
`;

const buttonStyle = {
  marginRight: "10px",
  marginLeft: "10px",
  minWidth: "50px",
  padding: "0",
  background: "linear-gradient(to top,#f9570a,#f9570a)",
  borderColor: "#d24c0c",
};

const addButtonStyle = {
  minWidth: "50px",
  padding: "0",
  background: "linear-gradient(to top,#f9570a,#f9570a)",
  borderColor: "#d24c0c",
  marginTop: "12px",
  left: "10px",
};

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
        <ArrayFieldContainer key={item.index}>
          <ArrayFormContainer style={{width: "100%"}}>{item.children}</ArrayFormContainer>
          <ArrayFieldButtons>
            {item.hasMoveDown && (
              <Button
                noMinWidth
                noPaddingY
                onClick={item.onReorderClick(item.index, item.index + 1)}
                style={buttonStyle}
              >
                <FaIcon icon={faChevronDown} />
              </Button>
            )}
            {item.hasMoveUp && (
              <Button
                noMinWidth
                noPaddingY
                onClick={item.onReorderClick(item.index, item.index - 1)}
                style={buttonStyle}
              >
                <FaIcon icon={faChevronUp} />
              </Button>
            )}
            <Button
              noMinWidth
              noPaddingY
              onClick={item.onDropIndexClick(item.index)}
              color="error"
              style={buttonStyle}
            >
              <FaIcon icon={faTrash} />
            </Button>
          </ArrayFieldButtons>
        </ArrayFieldContainer>
      ))}
      {canAdd && (
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onAddClick} style={addButtonStyle}>
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
