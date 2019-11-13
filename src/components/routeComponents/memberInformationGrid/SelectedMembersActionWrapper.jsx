import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Container from 'pepcus-core/lib/Container';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Row from 'pepcus-core/lib/Row';
import Typography from 'pepcus-core/lib/Typography';
import { getThemeProps } from 'pepcus-core/utils/theme';

import Popup from 'components/common/Popup';
import { isBusCoordinatorsDataFailed } from 'reducers/assetFilesReducer';
import { getConstants } from 'reducers/constants';

import MarkSelectedMembersAttendance from './markSelectedMembersAttendance';
import MarkOptInOrOptOutSelectedMember from './markOptInOrOptOutSelectedMember';
import UpdateIdCardStatusMembersModal from './updateIdCardStatusMembersModal';
import MembersIdCard from './membersIdCard/MembersIdCard';

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
const CSVLinkStyled = styled(CSVLink)`
    display: ${props => (props.disable === 'true' ? 'none' : 'all')};
    cursor: ${props => (props.disable === 'true' ? 'not-allowed' : null)};
    font-size: 14px;
    border-radius: 4px;
    background-color: ${getThemeProps('palette.action.hover')};
    color: ${props => (props.disable === 'true' ? getThemeProps('palette.common.placeholder')
    : getThemeProps('palette.common.darker'))};
    padding: 8px 11px;
    position: relative;
    text-decoration: none;
    box-shadow: ${props => (props.disable === 'true' ? null : getThemeProps('palette.action.disabled'))};
    &:hover {
        background-color: ${props => (props.disable === 'true' ? getThemeProps('palette.action.hover')
    : getThemeProps('palette.action.selected'))};
    }
    &:active {
        box-shadow: none;
    }
    ${({ theme }) => theme.media.down('lg')`
     display: none;
    `};
`;

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('lg')`
     display: none;
   `};
`;

const DisabledButtonStyled = styled(Button)`
   margin: 0;
   padding: 5px 10px;
   display: ${props => (props.isView ? null : 'none')};
   ${({ theme }) => theme.media.down('lg')`
     display: none;
   `};
`;

/**
 * SelectedMembersActionWrapper render Export, Print Now, Print Later, Mark as Present and
 * Mark optIn/optOut buttons.
 * @type {Class}
 * @return {HTML}
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

  /**
   * Print the ID cards of members.
   */
  printWindow = () => {
    const { selectedMembers } = this.props;
    !isEmpty(selectedMembers) ? window.print() : null;
  };

  idCardPrintButton = () => {
    const { isIdCardPrintEnable, constants, selectedMembers, isBusCoordinatorsInformationFailed } = this.props;
    const { PRINT_NOW } = constants;
    if (isIdCardPrintEnable) {
      return (
        <ButtonStyled
          margin="0 0 0 10px"
          softDisable={isEmpty(selectedMembers)}
          color="tertiary"
          noMinWidth
          onClick={
            () => {
              isBusCoordinatorsInformationFailed
                ? this.onClickPrintCancel(true) : this.printWindow();
            }}
        >
          <FaIcon icon={faPrint} />
          {PRINT_NOW}
        </ButtonStyled>
      );
    }
    return null;
  };

  CSVExportButton = () => {
    const { isCSVExportEnable, selectedMembers, constants, metaData } = this.props;
    const { EXPORT } = constants;
    const filterHeader = metaData.headerConfig.filter(obj =>
      obj.excludeFromExport !== true);
    const header = filterHeader.map(item =>
      ({ label: item.label, key: item.key, disable: item.disable }),
    );
    if (isCSVExportEnable) {
      if (isEmpty(selectedMembers)) {
        return (
          <DisabledButtonStyled
            isView={isEmpty(selectedMembers)}
            softDisable={isEmpty(selectedMembers)}
            color="tertiary"
            noMinWidth
          >
            <FaIcon icon={faDownload} />
            {EXPORT}
          </DisabledButtonStyled>
        );
      }
      return (
        <CSVLinkStyled
          disable={isEmpty(selectedMembers) ? 'true' : 'false'}
          headers={header}
          data={selectedMembers}
          filename={`StudentData-${moment().format('DD-MM-YYYY-LT')}.csv`}
        >
          <FaIcon icon={faDownload} />
          {EXPORT}
        </CSVLinkStyled>
      );
    }
    return null;
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
          {this.CSVExportButton()}
          {this.idCardPrintButton()}
          <UpdateIdCardStatusMembersModal
            selectedMembers={selectedMembers}
            updateIdCardStatusModalFormSchema={updateIdCardStatusModalFormSchema}
            isUpdateIdCardStatusEnable={isUpdateIdCardStatusEnable}
          />
          <MarkSelectedMembersAttendance
            selectedMembers={selectedMembers}
            attendanceModalFormSchema={attendanceModalFormSchema}
            isUpdateAttendanceEnable={isUpdateAttendanceEnable}
          />
          { /**
             TODO: May use in future
           **/ }
          <MarkOptInOrOptOutSelectedMember
            isUpdateOptInEnable={isUpdateOptInEnable}
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
