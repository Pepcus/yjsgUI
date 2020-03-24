import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import Row from 'pepcus-core/lib/Row';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Tooltip from 'pepcus-core/lib/Tooltip';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

const FormGroupTitleStyled = styled(Typography)`
    align-items: baseline;
    color: #15191d;
    display: flex;
    font-size: 14px;
    font-weight: 400;
    justify-content: space-between;
    margin: 0 !important;
    padding: 0 5px 7.5px 5px;
    /**
     * Add all of the remaining styles from theme
     */
    ${getThemeProps('FormGroupTitle.styles')};
`;

const FormGroupTitle = (props) => {
  const { id, required, title, helpText } = props;
  const { icon = {}, ...tooltip } = helpText;

  return (
    title && (
    <FormGroupTitleStyled type="separator" htmlFor={id}>
      <Row alignItems="flex-start" gutter={false} margin="0" wrap="nowrap">
        <Typography type="separator" style={{ marginRight: 5, fontWeight: 'bold' }}>{title}</Typography>
        {typeof helpText === 'object'
                        && !_isEmpty(helpText) && (
                        <Tooltip {...tooltip}>
                          <FaIcon {...icon} icon={faInfoCircle} />
                        </Tooltip>
                    )}
        {required && (
          <Typography fontSize="20px" as="span" color="error" type="required" gutterBottom="0">
            *
          </Typography>
        )}
      </Row>

    </FormGroupTitleStyled>
    )
  );
};

FormGroupTitle.propTypes = {
  helpText: PropTypes.object,
  id: PropTypes.string,
  title: PropTypes.string,
};

FormGroupTitle.defaultProps = {
  helpText: {},
  id: null,
  title: null,
};

export default FormGroupTitle;
