import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Container from 'pepcus-core/lib/Container';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';

import Popup from 'components/common/Popup';
import { isBusCoordinatorsDataFailed } from 'reducers/assetFilesReducer';
import { getConstants } from 'reducers/constants';

import MarkSelectedMembersAttendance from './markSelectedMembersAttendance';
import MarkOptInOrOptOutSelectedMember from './markOptInOrOptOutSelectedMember';
import UpdateIdCardStatusMembersModal from './updateIdCardStatusMembersModal';
import MembersIdCard from './membersIdCard/MembersIdCard';
import IdCardPrintButton from './IdCardPrintButton';
import CSVExportButton from './CSVExportButton';

const ContainerStyled = styled(Container)`
  position: unset;
  ${({ theme }) => theme.media.down('sm')`
       margin: 0;
  `}
`;
const BoxStyled = styled(Box)`
  @media print {
      display:none;
  }
`;

const PopupButtonStyled = styled(Button)`
     width: 100px;
`;

/**
 * SelectedMembersActionWrapper render Export, Print Now, Print Later, Mark as Present and
 * Mark optIn/optOut buttons.
 * @type {Class}
 */
class SelectedMembersActionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBusCoordinatorsError: false,
    };
  }

  /**
   * Method call window.print() method to print members
   * Id cards.
   */
  printCards = () => {
    window.print();
    this.onClickPrintCancel(false);
  };

  /**
   * Render bus coordinator error popup
   * @return {HTML}
   */
  renderCoordinatorUnavailableWarningPopup = () => {
    const { isBusCoordinatorsError } = this.state;
    const { isBusCoordinatorsInformationFailed, constants } = this.props;
    const {
      BUS_COORDINATOR_ERROR_MESSAGE,
      NO,
      YES,
    } = constants;

    if (isBusCoordinatorsInformationFailed && isBusCoordinatorsError) {
      return (
        <Popup>
          <Typography type="subheading">{ BUS_COORDINATOR_ERROR_MESSAGE }</Typography>
          <Row width="100%" justify="center">
            <PopupButtonStyled
              color="tertiary"
              noMinWidth
              margin="5px"
              onClick={() => { this.onClickPrintCancel(false); }}
            >
              {NO}
            </PopupButtonStyled>
            <PopupButtonStyled
              color="tertiary"
              margin="5px"
              noMinWidth
              onClick={this.printCards}
            >
              {YES}
            </PopupButtonStyled>
          </Row>
        </Popup>

      );
    }
    return null;
  };

  /**
   * Method set the boolean value of isBusCoordinatorsError
   * @param {Boolean}value
   */
  onClickPrintCancel = (value) => {
    this.setState({
      isBusCoordinatorsError: value,
    });
  };

  checkCoordinators = () => {
    const { isBusCoordinatorsInformationFailed } = this.props;
    if (isBusCoordinatorsInformationFailed) {
      this.onClickPrintCancel(true);
    } else {
      this.printWindow();
    }
  };

  /**
   * Print the ID cards of members.
   */
  printWindow = () => {
    const { selectedMembers } = this.props;
    !isEmpty(selectedMembers) ? window.print() : null;
  };

  render() {
    const {
      selectedMembers,
      // May use in future
      clearSelectedMembers,
      opInModalFormSchema,
      attendanceModalFormSchema,
      updateIdCardStatusModalFormSchema,
      isUpdateOptInEnable,
      isUpdateAttendanceEnable,
      isUpdateIdCardStatusEnable,
      constants,
      isIdCardPrintEnable,
      isCSVExportEnable,
      metaData,
    } = this.props;

    return (
      <ContainerStyled margin="5px 0" width="auto">
        <BoxStyled
          width="94%"
          margin="0 0px 0 10px"
          borderStyle="none"
          backgroundColor="unset"
          padding="0px"
        >
          <CSVExportButton
            acl={isCSVExportEnable}
            selectedMembers={selectedMembers}
            constants={constants}
            metaData={metaData}
          />
          <IdCardPrintButton
            acl={isIdCardPrintEnable}
            constants={constants}
            selectedMembers={selectedMembers}
            checkCoordinators={this.checkCoordinators}
          />
          <UpdateIdCardStatusMembersModal
            selectedMembers={selectedMembers}
            updateIdCardStatusModalFormSchema={updateIdCardStatusModalFormSchema}
            acl={isUpdateIdCardStatusEnable}
          />
          <MarkSelectedMembersAttendance
            selectedMembers={selectedMembers}
            attendanceModalFormSchema={attendanceModalFormSchema}
            acl={isUpdateAttendanceEnable}
          />
          { /**
             TODO: May use in future
           **/ }
          <MarkOptInOrOptOutSelectedMember
            acl={isUpdateOptInEnable}
            selectedMembers={selectedMembers}
            clearSelectedMembers={clearSelectedMembers}
            opInModalFormSchema={opInModalFormSchema}
          />
          {this.renderCoordinatorUnavailableWarningPopup()}
        </BoxStyled>
        <MembersIdCard
          selectedMembers={selectedMembers}
        />
      </ContainerStyled>
    );
  }
}

SelectedMembersActionWrapper.propTypes = {
  attendanceModalFormSchema: PropTypes.object,
  constants: PropTypes.object,
  selectedMembers: PropTypes.array,
  metaData: PropTypes.object,
  isBusCoordinatorsInformationFailed: PropTypes.bool,
  clearSelectedMembers: PropTypes.func,
  opInModalFormSchema: PropTypes.object,
  updateIdCardStatusModalFormSchema: PropTypes.object,
  isUpdateOptInEnable: PropTypes.bool,
  isUpdateAttendanceEnable: PropTypes.bool,
  isUpdateIdCardStatusEnable: PropTypes.bool,
  isIdCardPrintEnable: PropTypes.bool,
  isCSVExportEnable: PropTypes.bool,
};

SelectedMembersActionWrapper.defaultProps = {
  attendanceModalFormSchema: {},
  constants: {},
  selectedMembers: [],
  metaData: {},
  isBusCoordinatorsInformationFailed: false,
  clearSelectedMembers: () => {},
  opInModalFormSchema: {},
  updateIdCardStatusModalFormSchema: {},
  isUpdateOptInEnable: false,
  isUpdateAttendanceEnable: false,
  isUpdateIdCardStatusEnable: false,
  isIdCardPrintEnable: false,
  isCSVExportEnable: false,
};
const mapStateToProps = state => ({
  constants: getConstants(state),
  isBusCoordinatorsInformationFailed: isBusCoordinatorsDataFailed(state),
});

export default connect(mapStateToProps, null)(SelectedMembersActionWrapper);
