/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import moment from 'moment';
import connect from 'react-redux/es/connect/connect';
import styled from 'styled-components';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';

import Box from 'ravenjs/lib/Box';
import Button from 'ravenjs/lib/Button';
import Container from 'ravenjs/lib/Container';
import FaIcon from 'ravenjs/lib/FaIcon';
import Typography from 'ravenjs/lib/Typography';
import { getThemeProps } from 'ravenjs/utils/theme';

import Popup from 'components/common/Popup';
import { isBusCoordinatorsDataFailed } from 'reducers/assetFilesReducer';
import { BUS_COORDINATOR_ERROR_MESSAGE } from 'constants/messages';

import MarkSelectedMembersAttendance from './markSelectedMembersAttendance';
// import MarkOptInOrOptOutSelectedMember from './markOptInOrOptOutSelectedMember';
import UpdateIdCardStatusMembersModal from './updateIdCardStatusMembersModal';
import MembersIdCard from './membersIdCard/MembersIdCard';

const BoxStyled = styled(Box)`
  @media print {
   display:none;
  }
`;

const CSVLinkStyled = styled(CSVLink)`
    pointer-events: ${props => (props.disable === 'true' ? 'none' : 'all')};
    cursor: ${props => (props.disable === 'true' ? 'not-allowed' : null)};
    font-size: 14px;
    padding: 9px 10px;
    text-decoration: none;
    outline: medium none;
    border-radius: 4px;
    background-color: ${getThemeProps('palette.action.hover')};
    color: ${props => (props.disable === 'true' ? getThemeProps('palette.common.placeholder') : getThemeProps('palette.common.darker'))};
    box-shadow: ${props => (props.disable === 'true' ? null : getThemeProps('palette.action.disabled'))};
    :hover { 
     background-color: ${props => (props.disable === 'true' ? getThemeProps('palette.action.hover') : getThemeProps('palette.action.selected'))};
    }
    ${({ theme }) => theme.media.down('md')`
     display: none;
    `};
`;

const ButtonStyled = styled(Button)`
   ${({ theme }) => theme.media.down('md')`
     display: none;
   `};
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
    const { isBusCoordinatorsInformationFailed } = this.props;

    if (isBusCoordinatorsInformationFailed && isBusCoordinatorsError) {
      return (
        <Popup>
          <Typography type="subheading">{ BUS_COORDINATOR_ERROR_MESSAGE }</Typography>
          <Button
            color="tertiary"
            noMinWidth
            margin="5px"
            width="100px"
            onClick={() => { this.onClickPrintCancel(false); }}
          >
              No
          </Button>
          <Button
            color="tertiary"
            margin="5px"
            noMinWidth
            width="100px"
            onClick={this.printCards}
          >
              Yes
          </Button>
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

  render() {
    const {
      metaData,
      selectedMembers,
      isBusCoordinatorsInformationFailed,
      // May use in future
      clearSelectedMembers,
    } = this.props;

    const filterHeader = metaData.headerConfig.filter(obj =>
      obj.excludeFromExport !== true);
    const header = filterHeader.map(item =>
      ({ label: item.label, key: item.key, disable: item.disable }),
    );
    return (
      <Container margin="5px 0" width="auto">
        <BoxStyled
          width="94%"
          margin="0 0px 0 10px"
          borderStyle="none"
          backgroundColor="unset"
          padding="0px"
        >
          <CSVLinkStyled
            disable={isEmpty(selectedMembers).toString()}
            headers={header}
            data={selectedMembers}
            filename={`StudentData-${moment().format('DD-MM-YYYY-LT')}.csv`}
          >
            <FaIcon icon={faDownload} />
            Export
          </CSVLinkStyled>
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
            <FaIcon icon={faPrint} />Print Now
          </ButtonStyled>
          <UpdateIdCardStatusMembersModal
            selectedMembers={selectedMembers}
          />
          <MarkSelectedMembersAttendance
            selectedMembers={selectedMembers}
          />
          { /**
             TODO: May use in future
           **/ }
          {/* <MarkOptInOrOptOutSelectedMember
            selectedMembers={selectedMembers}
            clearSelectedMembers={clearSelectedMembers}
          />*/}
          {this.renderCoordinatorUnavailableWarningPopup()}
        </BoxStyled>
        <MembersIdCard
          selectedMembers={selectedMembers}
        />
      </Container>
    );
  }
}

SelectedMembersActionWrapper.propTypes = {
  selectedMembers: PropTypes.array,
  metaData: PropTypes.object,
  isBusCoordinatorsInformationFailed: PropTypes.bool,
  clearSelectedMembers: PropTypes.func,
};

SelectedMembersActionWrapper.defaultProps = {
  selectedMembers: [],
  metaData: {},
  isBusCoordinatorsInformationFailed: false,
  clearSelectedMembers: () => {},
};
const mapStateToProps = state => ({
  isBusCoordinatorsInformationFailed: isBusCoordinatorsDataFailed(state),
});

export default connect(mapStateToProps, {})(SelectedMembersActionWrapper);
