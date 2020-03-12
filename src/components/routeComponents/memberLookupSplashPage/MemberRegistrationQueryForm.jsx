import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Container from 'pepcus-core/lib/Container';
import Form from 'pepcus-core/lib/Form';
import { getThemeProps } from 'pepcus-core/utils/theme';

import fields from 'components/common/fields';

const BoxStyled = styled(Box)`
  margin: '80px auto 70px auto';
  width: 'auto';
  align-items: center;
  background-color: ${getThemeProps('palette.policyMuted.color')};
  overflow-x: hidden;
  overflow-y: auto;
  ${({ theme }) => theme.media.down('xl')`
      height: 100%;
      margin: '80px auto 70px auto';
      width: 'auto';
  `}
  ${({ theme }) => theme.media.down('lg')`
      height: 'auto';
      margin: '0 auto 0 auto';
      width: 'auto';
  `}
  ${({ theme }) => theme.media.down('sm')`
      height: auto;
      margin: 0 auto 0 auto;
      width: auto;
  `};
  @media (max-width: 1200px) and (orientation: landscape) {
      margin: '80px auto 70px auto';
      width: '50%' : 'auto';
  }
  @media (max-width: 992px) and (orientation: landscape) {
      margin: '0 auto 0 auto';
      width: 'auto';
  }
  `;

const ContainerStyled = styled(Container)`
  height: max-content;
  display: flex;
  ${({ theme }) => theme.media.down('lg')`
      min-height: 100%;
  `}
`;

/**
 * MemberRegistrationQueryForm is functional component which render the form regarding his/her registration
 * @param {Function} changeIsOnlyOptIn
 * @param {Node} children
 * @param {Object} formConfig
 * @param {Object} formData
 * @param {Object} formRef
 * @param {Function} onChange
 * @param {Function} validate
 * @return {HTML} MemberRegistrationQueryForm form
 * @constructor
 */
const MemberRegistrationQueryForm = ({
   children,
   formConfig,
   formData,
   formRef,
   onChange,
   validate,
 }) => {


  if (formConfig) {
    return (
      <ContainerStyled width="100%" ref={formRef}>
        <BoxStyled
          borderStyle="none"
          elevation={5}
          maxHeight="100%"
          maxWidth="1170px"
          padding="40px 20px 0 20px"
        >
          <Form
            externalSubmission
            fields={fields}
            formData={formData}
            liveValidate
            onChange={onChange}
            schema={formConfig.schema}
            showErrorList={false}
            validate={validate}
            uiSchema={formConfig.uiSchema}
          />
          { children }
        </BoxStyled>
      </ContainerStyled>
    );
  }
  return null;
};

MemberRegistrationQueryForm.propTypes = {
  children: PropTypes.node,
  formConfig: PropTypes.object,
  formData: PropTypes.object,
  formRef: PropTypes.object,
  onChange: PropTypes.func,
  transformErrors: PropTypes.func,
  validate: PropTypes.func,
};

MemberRegistrationQueryForm.defaultProps = {
  children: null,
  formConfig: {},
  formData: {},
  formRef: {},
  onChange: () => {},
  transformErrors: () => {},
  validate: () => {},
};

export default MemberRegistrationQueryForm;
