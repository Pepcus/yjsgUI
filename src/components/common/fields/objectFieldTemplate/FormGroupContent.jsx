import PropTypes from 'prop-types';
import React from 'react';
import _get from 'lodash/get';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import { themeGet } from 'pepcus-core/utils/theme';

const FormGroupContentStyled = styled(Box)`
    /**
     * Add all of the remaining styles from theme
     */
    ${themeGet('FormGroupContent.styles')};
`;

function FormGroupContent(props) {
  const { children, schema } = props;
  // Extract the `boxProps` from the schema.
  const boxProps = _get(schema, 'boxProps', {});
  // Render the styled FormGroupContent.
  return (
    <FormGroupContentStyled
      elevation={5}
      margin="0 0 20px 0"
      padding="20px 7.5px"
      {...boxProps}
    >
      {children}
    </FormGroupContentStyled>
  );
}

FormGroupContent.propTypes = {
  children: PropTypes.node,
  schema: PropTypes.object,
};

FormGroupContent.defaultProps = {
  children: null,
  schema: null,
};

export default FormGroupContent;
