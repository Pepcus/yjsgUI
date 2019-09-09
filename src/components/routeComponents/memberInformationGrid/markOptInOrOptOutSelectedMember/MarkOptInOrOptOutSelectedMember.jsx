/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
// import Modal from 'react-modal';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import Box from 'ravenjs/lib/Box';
import Button from 'ravenjs/lib/Button';
import Col from 'ravenjs/lib/Col';
import FaIcon from 'ravenjs/lib/FaIcon';
import Form from 'ravenjs/lib/Form';
import Modal from 'ravenjs/lib/Modal';
import Row from 'ravenjs/lib/Row';
import Typography from 'ravenjs/lib/Typography';

import {
  resetIsMarkOptInOrOptOutSuccessAction,
  markSelectedMembersOptInOrOptOutAction,
} from 'actions/memberRegistrationActions';
import {
  getSecretKey,
  isMarkOptInOrOptOutSuccess,
  isMarkOptInOrOptOutFailed,
} from 'reducers/memberRegistrationReducer';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import { extractMembersId } from 'utils/dataGridUtils';

import { schema, uiSchema } from './modalFormSchema.json';
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
   * Method render mark selected members optIn/optOut modal
   * @return {HTML} modal
   */
  renderModal = () => {
    const { formData, isModalOpen } = this.state;
    const { isMarkOptOutOrOptInSuccess, isMarkOptOutOrOptInFailed } = this.props;

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
          onClick={() => {
            !isEmpty(selectedMembers) ? this.openModal()
              : null;
          }}
        >
          <FaIcon icon={faInfoCircle} />Mark Opt In / Out
        </ButtonStyled>
        {this.renderModal()}
      </Row>
    );
  }
}

MarkOptInOrOptOutSelectedMember.propTypes = {
  clearSelectedMembers: PropTypes.func,
  isMarkOptOutOrOptInFailed: PropTypes.bool,
  isMarkOptOutOrOptInSuccess: PropTypes.bool,
  markSelectedMembersOptInOrOptOut: PropTypes.func,
  resetIsMarkOptInOrOptOutSuccess: PropTypes.func,
  secretKey: PropTypes.string,
  selectedMembers: PropTypes.array,
};

MarkOptInOrOptOutSelectedMember.defaultProps = {
  clearSelectedMembers: () => {},
  isMarkOptOutOrOptInFailed: false,
  isMarkOptOutOrOptInSuccess: false,
  markSelectedMembersOptInOrOptOut: () => {},
  resetIsMarkOptInOrOptOutSuccess: () => {},
  secretKey: '',
  selectedMembers: [],
};

const mapStateToProps = state => ({
  isMarkOptOutOrOptInFailed: isMarkOptInOrOptOutFailed(state),
  isMarkOptOutOrOptInSuccess: isMarkOptInOrOptOutSuccess(state),
  secretKey: getSecretKey(state),
});

const mapDispatchToProps = dispatch => ({
  markSelectedMembersOptInOrOptOut: ({ secretKey, selectedMembersId, opt }) =>
    dispatch(markSelectedMembersOptInOrOptOutAction({ secretKey, selectedMembersId, opt })),
  resetIsMarkOptInOrOptOutSuccess: () => dispatch(resetIsMarkOptInOrOptOutSuccessAction()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(MarkOptInOrOptOutSelectedMember);
