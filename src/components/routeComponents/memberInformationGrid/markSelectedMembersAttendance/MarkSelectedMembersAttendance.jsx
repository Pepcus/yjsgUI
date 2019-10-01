/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Col from 'pepcus-core/lib/Col';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Form from 'pepcus-core/lib/Form';
import Typography from 'pepcus-core/esm/lib/Typography';
import Row from 'pepcus-core/lib/Row';
import Modal from 'pepcus-core/lib/Modal';

import { extractMembersId } from 'utils/common';
import {
  THIS_INFORMATION_IS_COMPULSORY_MESSAGE,
} from 'constants/messages';
import {
  resetIsMarkAttendanceSuccessAction,
  markSelectedMembersAttendanceAction,
} from 'actions/memberRegistrationActions';
import {
  getSecretKey,
} from 'reducers/memberRegistrationReducer';
import {
  isMarkAttendanceSuccess,
  isMarkAttendanceFailed,
} from 'reducers/allMembersDataReducer';
import fields from 'components/common/fields';

import Message from './Message';
import { schema, uiSchema } from './modalFormShema.json';
import ModalHeader from './ModalHeader';

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('lg')`
     width: 100%;
   `};
`;

const MembersIdStyled = styled(Typography)`
    display: inline-block;
    word-break: break-word;
`;

const CloseButtonStyled = styled(Button)`
    float: right;
`;

const RowStyled = styled(Row)`
    ${({ theme }) => theme.media.down('md')`
       width: 100%;
       margin: 0;
    `}
`;

const BoxStyled = styled(Box)`
${({ theme }) => theme.media.down('sm')`
       width: 300px;
    `}
`;

const ColStyled = styled(Col)`
${({ theme }) => theme.media.down('sm')`
      flex-basis: 60%;
      max-width: 60%
    `}`;

/**
 * MarkSelectedMembersAttendance component render mark selected members attendance modal
 * @type {Class}
 */
class MarkSelectedMembersAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      formData: {},
      hasError: false,
    };
  }

  /**
   * Method on Onclick mark as present button set the value of
   * isModalOpen to true.
   * And on the basis of this render the mark selected members modal
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
   * And on the basis of this close the mark selected members modal
   */
  closeModal = () => {
    const { resetIsMarkAttendanceSuccess } = this.props;

    this.setState({
      isModalOpen: false,
      formData: {},
    });
    resetIsMarkAttendanceSuccess();
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
   * Method set the value of selected day in selectedDay.
   * @param {Object} formData
   * @param {Array} errors
   */
  handleSelectChange = ({ formData, errors }) => {
    this.setState({
      formData,
      hasError: !isEmpty(errors),
    });
  };

  /**
   * Method call on submission of selected members attendance
   * @param {Object} event
   */
  onFormSubmit = (event) => {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    const { formData, hasError } = this.state;
    const { secretKey, markSelectedMembersAttendance } = this.props;

    if (!hasError) {
      markSelectedMembersAttendance({
        secretKey,
        selectedMembersId: formData.membersId,
        day: { 'day': formData.selectedDay } });
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
   * Method render mark selected members attendance modal
   * @return {HTML} modal
   */
  renderModal = () => {
    const { isModalOpen, formData } = this.state;
    const { isAttendanceMarkSuccess, isAttendanceMarkFailed } = this.props;

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
          <BoxStyled
            backgroundColor="modal"
            padding="0"
            borderColor="tertiary"
            margin="0"
            width="auto"
          >
            <ModalHeader />
            <Form
              fields={fields}
              externalSubmission
              showErrorList={false}
              liveValidate
              schema={schema}
              uiSchema={UiSchema}
              formData={formData}
              onChange={this.handleSelectChange}
              transformErrors={this.transformErrors}
              onSubmit={this.onFormSubmit}
            />
            <Message
              isAttendanceMarkSuccess={isAttendanceMarkSuccess}
              isAttendanceMarkFailed={isAttendanceMarkFailed}
            />
            <Row margin="0 0 0 30px">
              <ColStyled size={9}>
                <CloseButtonStyled
                  color="secondary"
                  border
                  noMinWidth
                  margin="0 0 20px 0"
                  onClick={this.closeModal}
                >Close
                </CloseButtonStyled>
              </ColStyled>
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
          </BoxStyled>
        </Modal>
      );
    }
    return null;
  };

  render() {
    const { selectedMembers } = this.props;

    return (
      <RowStyled display="inline-block" margin="0 0 0 10px">
        <ButtonStyled
          softDisable={isEmpty(selectedMembers)}
          color="tertiary"
          noMinWidth
          onClick={this.checkOpenModalCondition}
        >
          <FaIcon icon={faUser} />Mark as Present
        </ButtonStyled>
        {this.renderModal()}
      </RowStyled>
    );
  }
}

MarkSelectedMembersAttendance.propTypes = {
  isAttendanceMarkFailed: PropTypes.bool,
  isAttendanceMarkSuccess: PropTypes.bool,
  markSelectedMembersAttendance: PropTypes.func,
  resetIsMarkAttendanceSuccess: PropTypes.func,
  secretKey: PropTypes.string,
  selectedMembers: PropTypes.array,
};

MarkSelectedMembersAttendance.defaultProps = {
  isAttendanceMarkFailed: false,
  isAttendanceMarkSuccess: false,
  markSelectedMembersAttendance: () => {},
  resetIsMarkAttendanceSuccess: () => {},
  secretKey: '',
  selectedMembers: [],
};

const mapStateToProps = state => ({
  isAttendanceMarkFailed: isMarkAttendanceFailed(state),
  isAttendanceMarkSuccess: isMarkAttendanceSuccess(state),
  secretKey: getSecretKey(state),
});

const mapDispatchToProps = dispatch => ({
  markSelectedMembersAttendance: ({ secretKey, selectedMembersId, day }) =>
    dispatch(markSelectedMembersAttendanceAction({ secretKey, selectedMembersId, day })),
  resetIsMarkAttendanceSuccess: () => dispatch(resetIsMarkAttendanceSuccessAction()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(MarkSelectedMembersAttendance);
