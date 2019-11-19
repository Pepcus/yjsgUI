import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';

import { accessControl } from 'pepcus-core/utils';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Button from 'pepcus-core/lib/Button';

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('lg')`
     display: none;
   `};
`;

const IdCardPrintButton = ({
  constants,
  selectedMembers,
  checkCoordinators,
}) => {
  const { PRINT_NOW } = constants;
  return (
    <ButtonStyled
      margin="0 0 0 10px"
      softDisable={isEmpty(selectedMembers)}
      color="tertiary"
      noMinWidth
      onClick={checkCoordinators}
    >
      <FaIcon icon={faPrint} />
      {PRINT_NOW}
    </ButtonStyled>
  );
};

IdCardPrintButton.propTypes = {
  constants: PropTypes.object,
  selectedMembers: PropTypes.array,
  checkCoordinators: PropTypes.func,
};

IdCardPrintButton.defaultProps = {
  constants: {},
  selectedMembers: [],
  checkCoordinators: () => {},
};

export default accessControl(IdCardPrintButton);
