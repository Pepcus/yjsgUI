import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import { accessControl } from 'pepcus-core/utils';
import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Form from 'pepcus-core/lib/Form';
import Modal from 'pepcus-core/lib/Modal';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  resetIsMarkOptInOrOptOutSuccessAction,
  markSelectedMembersOptInOrOptOutAction,
} from 'actions/allMembersDataActions';
import {
  getSecretKey,
} from 'reducers/loginReducer';
import {
  isMarkOptInOrOptOutSuccess,
  isMarkOptInOrOptOutFailed,
} from 'reducers/allMembersDataReducer';
import { extractMembersId } from 'utils/common';
import { getConstants } from 'reducers/constants';

import ModalHeader from './ModalHeader';
import Message from './Message';

const MembersIdStyled = styled(Typography)`
    display: inline-block;
    word-break: break-word;
`;

const CloseButtonStyled = styled(Button)`
     float: right;
`;

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('md')`
     display: none;
   `};
`;

/**
 *  MarkOptInOrOptOutSelectedMember component render mark selected student optIn or optOut modal
 * @type {Class}
 */
class MarkOptInOrOptOutSelectedMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      hasError: false,
      isModalOpen: false,
    };
  }

  /**
   * Method on Onclick optIn or optOut button set the value of
   * isModalOpen to true.
   * And on the basis of this render the mark optIn/optOut modal
   */
  openModal = () => {
    const { selectedMembers } = this.props;
    const { formData } = this.state;

    this.setState({
      isModalOpen: true,
      formData: {
        ...formData,
        membersId: extractMembersId({ selectedMembers }),
      },
    });
  };

  /**
   * Method on Onclick close button set the value of
   * isModalOpen to false.
   * And on the basis of this close the mark optIn/optOut modal
   * @param {Object} event
   */
  closeModal = (event) => {
    const { resetIsMarkOptInOrOptOutSuccess, clearSelectedMembers } = this.props;

    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.setState({
      isModalOpen: false,
      formData: {},
    });
    resetIsMarkOptInOrOptOutSuccess();
    clearSelectedMembers();
  };

  /**
   * Method return error message object
   * @param {Array} errors
   * @return {Array} error message object
   */
  transformErrors = (errors) => {
    const { constants } = this.props;
    const { THIS_INFORMATION_IS_COMPULSORY_MESSAGE } = constants;
    const transformErrors = {
      'required': THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
    };
    const formattedError = [];

    errors.forEach((error) => {
      if (error.name === 'required') {
        formattedError.push({ ...error, message: transformErrors[error.name] });
      }
    });
    return formattedError;
  };

  /**
   * Method set the value of optIn2019 onChange of radio button.
   * @param {Object} formData
   * @param {Array} errors
   */
  onClickRadioButton = ({ formData, errors }) => {
    this.setState({
      formData,
      hasError: !isEmpty(errors),
    });
  };

  /**
   * Method call on submission of selected student optIn/optOut
   * @param {Object} event
   */
  onFormSubmit = (event) => {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const { secretKey, markSelectedMembersOptInOrOptOut } = this.props;
    const { formData, hasError } = this.state;

    if (!hasError) {
      markSelectedMembersOptInOrOptOut({
        secretKey,
        selectedMembersId: formData.membersId,
        opt: { 'optIn2019': formData.selectedOptOption },
      });
    }
  };

  /**
   * Method open the modal on the basis of selectedMembers
   */
  checkOpenModalCondition = () => {
    const { selectedMembers } = this.props;
    !isEmpty(selectedMembers) ? this.openModal() : null;
  };

  /**
   * Method render mark selected members optIn/optOut modal
   * @return {HTML} modal
   */
  renderModal = () => {
    const { formData, isModalOpen } = this.state;
    const { isMarkOptOutOrOptInSuccess, isMarkOptOutOrOptInFailed, constants, opInModalFormSchema } = this.props;
    const { schema, uiSchema } = opInModalFormSchema;
    const { CLOSE, SUBMIT } = constants;

    const UiSchema = {
      ...uiSchema,
      membersId: {
        ...uiSchema.membersId,
        'ui:widget': () => (
          <Box
            borderRadius="0"
            maxHeight="200px"
            overflow="auto"
            margin="5px 20px"
            width="auto"
          >
            {
              formData.membersId.map(member =>
                (
                  <MembersIdStyled
                    fontSize="14px"
                    type="caption"
                    padding="5px"
                  >
                    {member},
                  </MembersIdStyled>))
            }
          </Box>
        ),
      },
    };

    if (isModalOpen) {
      return (
        <Modal
          open={isModalOpen}
          onClose={this.closeModal}
          style={{ padding: '0' }}
        >
          <Box
            backgroundColor="modal"
            padding="0"
            borderColor="modal"
            margin="0"
            width="auto"
          >
            <ModalHeader />
            <Form
              externalSubmission
              showErrorList={false}
              liveValidate
              schema={schema}
              uiSchema={UiSchema}
              formData={formData}
              onChange={this.onClickRadioButton}
              transformErrors={this.transformErrors}
              onSubmit={this.onFormSubmit}
            />
            <Message
              isMarkOptOutOrOptInSuccess={isMarkOptOutOrOptInSuccess}
              isMarkOptOutOrOptInFailed={isMarkOptOutOrOptInFailed}
            />
            <Row margin="0 0 0 30px">
              <Col size={9}>
                <CloseButtonStyled
                  color="secondary"
                  border
                  noMinWidth
                  margin="0 0 20px 0"
                  onClick={this.closeModal}
                >{CLOSE}
                </CloseButtonStyled>
              </Col>
              <Col size={3}>
                <Button
                  margin="0 0 20px 0px"
                  noMinWidth
                  onClick={this.onFormSubmit}
                >
                  {SUBMIT}
                </Button>
              </Col>
            </Row>
          </Box>
        </Modal>
      );
    }
    return null;
  };

  render() {
    const { selectedMembers, constants } = this.props;
    const { MARK_OPT_IN_OR_OUT } = constants;
    return (
      <Row display="inline-block" margin="0 0 0 10px">
        <ButtonStyled
          softDisable={isEmpty(selectedMembers)}
          color="tertiary"
          noMinWidth
          onClick={this.checkOpenModalCondition}
        >
          <FaIcon icon={faInfoCircle} />{MARK_OPT_IN_OR_OUT}
        </ButtonStyled>
        {this.renderModal()}
      </Row>
    );
  }
}

MarkOptInOrOptOutSelectedMember.propTypes = {
  constants: PropTypes.object,
  clearSelectedMembers: PropTypes.func,
  isMarkOptOutOrOptInFailed: PropTypes.bool,
  isMarkOptOutOrOptInSuccess: PropTypes.bool,
  markSelectedMembersOptInOrOptOut: PropTypes.func,
  opInModalFormSchema: PropTypes.object,
  resetIsMarkOptInOrOptOutSuccess: PropTypes.func,
  secretKey: PropTypes.string,
  selectedMembers: PropTypes.array,
};

MarkOptInOrOptOutSelectedMember.defaultProps = {
  constants: {},
  clearSelectedMembers: () => {},
  isMarkOptOutOrOptInFailed: false,
  isMarkOptOutOrOptInSuccess: false,
  markSelectedMembersOptInOrOptOut: () => {},
  opInModalFormSchema: {},
  resetIsMarkOptInOrOptOutSuccess: () => {},
  secretKey: '',
  selectedMembers: [],
};

const mapStateToProps = state => ({
  constants: getConstants(state),
  isMarkOptOutOrOptInFailed: isMarkOptInOrOptOutFailed(state),
  isMarkOptOutOrOptInSuccess: isMarkOptInOrOptOutSuccess(state),
  secretKey: getSecretKey(state),
});

const mapDispatchToProps = dispatch => ({
  markSelectedMembersOptInOrOptOut: ({ secretKey, selectedMembersId, opt }) =>
    dispatch(markSelectedMembersOptInOrOptOutAction({ secretKey, selectedMembersId, opt })),
  resetIsMarkOptInOrOptOutSuccess: () => dispatch(resetIsMarkOptInOrOptOutSuccessAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null, { pure: false },
)(accessControl(MarkOptInOrOptOutSelectedMember));
