import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Container from 'pepcus-core/lib/Container';
import Form from 'pepcus-core/lib/Form';
import { getThemeProps } from 'pepcus-core/utils/theme';

import fields from 'components/common/fields';
import {
  USER_TYPES,
} from 'constants/member';
import MemberMarksDataGrid from 'components/routeComponents/memberRegistrationCorrectionForm/MemberMarksDataGrid';
import Col from 'pepcus-core/lib/Col';
import Row from 'pepcus-core/lib/Row';
import OtherInformationEditLink from './OtherInformationEditLink';
import OnlyOptInSubmitButton from './OnlyOptInSubmitButton';


const { ADMIN } = USER_TYPES;

const BoxStyled = styled(Box)`
  margin: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '190px auto' : '80px auto 70px auto')};
  width: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '30%' : 'auto')};
  align-items: center;
  background-color: ${getThemeProps('palette.policyMuted.color')};
  overflow-x: hidden;
  overflow-y: auto;
  ${({ theme }) => theme.media.down('xl')`
      height: 100%;
      margin: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '190px auto' : '80px auto 70px auto')};
      width: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '50%' : 'auto')};
  `}
  ${({ theme }) => theme.media.down('lg')`
      height: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '100%' : 'auto')};
      margin: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '70px auto' : '0 auto 0 auto')};
      width: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '50%' : 'auto')};
  `}
  ${({ theme }) => theme.media.down('sm')`
      height: auto;
      margin: 0 auto 0 auto;
      width: auto;
  `};
  @media (max-width: 1200px) and (orientation: landscape) {
      margin: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '190px auto' : '80px auto 70px auto')};
      width: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '50%' : 'auto')};
  }
  @media (max-width: 992px) and (orientation: landscape) {
      margin: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '70px auto' : '0 auto 0 auto')};
      width: ${props => (props.onlyOptInForm && props.user !== ADMIN ? '70%' : 'auto')};
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
 * CorrectionsForm is functional component which render the correction form according to user type
 * @param {Object} constants
 * @param {Function} changeIsOnlyOptIn
 * @param {Node} children
 * @param {Object} formConfig
 * @param {Object} formData
 * @param {Object} formRef
 * @param {Function} onChange
 * @param {Boolean} onlyOptInForm
 * @param {Function} submitMemberDataForOnlyOptInCase
 * @param {Function} transformErrors
 * @param {String} user
 * @param {Function} validate
 * @param {Object} memberMarksGridMetaData
 * @return {HTML} correction form
 * @constructor
 */
const CorrectionsForm = ({
  constants,
  changeIsOnlyOptIn,
  children,
  formConfig,
  formData,
  formRef,
  onChange,
  onlyOptInForm,
  submitMemberDataForOnlyOptInCase,
  transformErrors,
  user,
  validate,
  memberMarksGridMetaData,
  renderBackButton,
  renderSubmitButtons,
}) => {

  const renderMemberMarksDataGrid = () => {
    if (onlyOptInForm) {
      return null;
    }
    return (
      <MemberMarksDataGrid
        gridData={[formData]}
        metaData={memberMarksGridMetaData}
      />
    );
  };


  if (formConfig) {
    return (
      <ContainerStyled width="100%" ref={formRef}>
        <BoxStyled
          user={user}
          onlyOptInForm={onlyOptInForm}
          borderStyle="none"
          elevation={5}
          maxHeight="100%"
          maxWidth="1170px"
          padding="40px 20px 0 20px"
        >
          { children }
          <Form
            externalSubmission
            fields={fields}
            formData={formData}
            liveValidate
            onChange={onChange}
            schema={formConfig.schema}
            showErrorList={false}
            transformErrors={transformErrors}
            validate={validate}
            uiSchema={formConfig.uiSchema}
          />
          <Row justify="center" margin="0 0 25px 0">
            <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
              {renderBackButton()}
            </Col>
            <Col size={{ xs: 12, sm: 12, md: 6, lg: 2.3 }} padding="10px 15px 10px 15px">
              {renderSubmitButtons()}
            </Col>
          </Row>
          {
            renderMemberMarksDataGrid()
          }
          <OnlyOptInSubmitButton
            onlyOptInForm={onlyOptInForm}
            submitMemberDataForOnlyOptInCase={submitMemberDataForOnlyOptInCase}
            user={user}
          />
          <OtherInformationEditLink
            changeIsOnlyOptIn={changeIsOnlyOptIn}
            onlyOptInForm={onlyOptInForm}
            user={user}
          />
        </BoxStyled>
      </ContainerStyled>
    );
  }
  return null;
};

CorrectionsForm.propTypes = {
  changeIsOnlyOptIn: PropTypes.func,
  children: PropTypes.node,
  constants: PropTypes.object,
  formConfig: PropTypes.object,
  formData: PropTypes.object,
  formRef: PropTypes.object,
  memberMarksGridMetaData: PropTypes.object,
  onChange: PropTypes.func,
  onlyOptInForm: PropTypes.bool,
  submitMemberDataForOnlyOptInCase: PropTypes.func,
  transformErrors: PropTypes.func,
  user: PropTypes.string,
  validate: PropTypes.func,
  renderBackButton: PropTypes.func,
  renderSubmitButtons: PropTypes.func,
};

CorrectionsForm.defaultProps = {
  changeIsOnlyOptIn: () => {},
  children: null,
  constants: {},
  formConfig: {},
  formData: {},
  formRef: {},
  memberMarksGridMetaData: {},
  onChange: () => {},
  onlyOptInForm: false,
  submitMemberDataForOnlyOptInCase: () => {},
  transformErrors: () => {},
  user: PropTypes.string,
  validate: () => {},
  renderBackButton: () => {},
  renderSubmitButtons: () => {},
};

export default CorrectionsForm;
