import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'pepcus-core/lib/Button';

const ButtonStyled = styled(Button)`
    min-height: 36px;
    min-width: 152px;
   ${({ theme }) => theme.media.down('sm')`
        min-height: auto;
        min-width: auto;
    `}
`;
function FieldButton({ isAddItem, changeIsAddItemFlag }) {
  if (!isAddItem) {
    return (
      <ButtonStyled onClick={changeIsAddItemFlag}>
        Add Iteam
      </ButtonStyled>
    );
  }
  return null;
}

FieldButton.propTypes = {
  isAddItem: PropTypes.bool,
  changeIsAddItemFlag: PropTypes.func,
};

FieldButton.defaultProps = {
  isAddItem: false,
  changeIsAddItemFlag: () => {},
};

export default FieldButton;
