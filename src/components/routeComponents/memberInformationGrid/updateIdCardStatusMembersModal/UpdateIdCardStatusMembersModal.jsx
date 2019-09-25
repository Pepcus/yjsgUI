/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Form from 'pepcus-core/lib/Form';
import Modal from 'pepcus-core/lib/Modal';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import {
  resetIsUpdateIdCardStatusSuccessAction,
  updateIdCardStatusSelectedMembersAction,
} from 'actions/memberRegistrationActions';
import {
  getSecretKey,
  isUpdateIdCardStatusSuccess,
  isUpdateIdCardStatusFailed,
} from 'reducers/memberRegistrationReducer';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import { extractMembersId } from 'utils/dataGridUtils';

import { schema, uiSchema } from './modalFormShema.json';
import Message from './Message';
import ModalHeader from './ModalHeader';

const CloseButtonStyled = styled(Button)`
     float: right;
`;

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('lg')`
     display: none;
   `};
`;

const MembersIdStyled = styled(Typography)`
    display: inline-block;
    word-break: break-word;
`;

/**
 * TODO: Rename this component in future.
 */
/**
 * UpdateIdCardStatusMembersModal render modal of update Id cards of selected members.
 * @type {Class}
 */
class UpdateIdCardStatusMembersModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      isModalOpen: false,
      hasError: false,
    };
  }

  /**
   * Method set isModalOpen to true
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
   * Method open the modal on the basis of selectedMembers
   */
  checkOpenModalCondition = () => {
    const { selectedMembers } = this.props;
    !isEmpty(selectedMembers) ? this.openModal() : null;
  };

  /**
   * Method set isModalOpen to false
   * and selectedCardOption to empty string
   */
  closeModal = () => {
    const { resetIsUpdateIdCardStatusSuccess } = this.props;
    this.setState({
      isModalOpen: false,
      formData: {},
    });
    resetIsUpdateIdCardStatusSuccess();
  };

  /**
   * transformErrors method return error message object
   * @param {Array} errors
   * @return {Array} error message object
   */
  transformErrors = (errors) => {
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
   * Method set the object with printStatus property value to selectedCardOption
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
   * Method mark the selected members Id card status by
   * calling updateIdCardStatusSelectedMembers action
   * @param {Object} event
   */
  onFormSubmit = (event) => {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const { secretKey, updateIdCardStatusSelectedMembers } = this.props;
    const { formData, hasError } = this.state;

    if (!hasError) {
      updateIdCardStatusSelectedMembers({
        secretKey,
        selectedMembersId: formData.membersId,
        IdCardStatus: { printStatus: formData.selectedCardOption },
      });
    }
  };

  /**
   * Method render the modal of update Id card status of selected members.
   * @return {HTML} modal
   */
  renderModal = () => {
    const { formData, isModalOpen } = this.state;
    const { isIdCardUpdateStatusSuccess, isIdCardUpdateStatusFailed } = this.props;

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
            borderColor="tertiary"
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
              isIdCardUpdateStatusSuccess={isIdCardUpdateStatusSuccess}
              isIdCardUpdateStatusFailed={isIdCardUpdateStatusFailed}
            />
            <Row margin="0 0 0 30px">
              <Col size={9}>
                <CloseButtonStyled
                  color="secondary"
                  border
                  noMinWidth
                  margin="0 0 20px 0"
                  onClick={this.closeModal}
                >Close
                </CloseButtonStyled>
              </Col>
              <Col size={3}>
                <Button
                  margin="0 0 20px 0px"
                  noMinWidth
                  onClick={this.onFormSubmit}
                >
                  Submit
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
    const { selectedMembers } = this.props;
    return (
      <Row display="inline-block" margin="0 0 0 10px">
        <ButtonStyled
          softDisable={isEmpty(selectedMembers)}
          color="tertiary"
          noMinWidth
          onClick={this.checkOpenModalCondition}
        >
          <FaIcon icon={faPrint} />Print Later
        </ButtonStyled>
        {this.renderModal()}
      </Row>
    );
  }
}

UpdateIdCardStatusMembersModal.propTypes = {
  isIdCardUpdateStatusFailed: PropTypes.bool,
  isIdCardUpdateStatusSuccess: PropTypes.bool,
  resetIsUpdateIdCardStatusSuccess: PropTypes.func,
  secretKey: PropTypes.string,
  selectedMembers: PropTypes.array,
  updateIdCardStatusSelectedMembers: PropTypes.func,
};

UpdateIdCardStatusMembersModal.defaultProps = {
  isIdCardUpdateStatusFailed: false,
  isIdCardUpdateStatusSuccess: false,
  resetIsUpdateIdCardStatusSuccess: () => {},
  secretKey: '',
  selectedMembers: [],
  updateIdCardStatusSelectedMembers: () => {},
};

const mapStateToProps = state => ({
  isIdCardUpdateStatusFailed: isUpdateIdCardStatusFailed(state),
  isIdCardUpdateStatusSuccess: isUpdateIdCardStatusSuccess(state),
  secretKey: getSecretKey(state),
});

const mapDispatchToProps = dispatch => ({
  resetIsUpdateIdCardStatusSuccess: () => dispatch(resetIsUpdateIdCardStatusSuccessAction()),
  updateIdCardStatusSelectedMembers: ({ secretKey, selectedMembersId, IdCardStatus }) =>
    dispatch(updateIdCardStatusSelectedMembersAction({ secretKey, selectedMembersId, IdCardStatus })),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(UpdateIdCardStatusMembersModal);
