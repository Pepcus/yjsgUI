/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

import Box from 'pepcus-core/lib/Box';
import Button from 'pepcus-core/lib/Button';
import Container from 'pepcus-core/lib/Container';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Row from 'pepcus-core/lib/Row';

import {
  formatMetaData,
  formatMembers,
  getSelectedMembers,
  manageMembersTableWidth,
  setAllMembersAsUnchecked,
  getUpdatedVisibleColumnConfig,
} from 'utils/common';
import 'assets/css/card-print.css';
import { getApplicationMode } from 'reducers/assetFilesReducer';
import { gridHeaderData } from 'constants/gridData';
import {
  allMembersData,
  getSelectValue,
  getMember,
  getSecretKey,
  getVisibleColumnConfig,
  stateOfAdminLogin,
  stateOfRedirect,
} from 'reducers/memberRegistrationReducer';
import {
  fetchMemberDataAction,
  getAllMembersAction,
  resetAdminCredentialsAction,
  resetVisibleColumnConfigAction,
  resetIsSuccessAction,
  setMemberDataAction,
  setAdminLoginStateAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
  setUserTypeAction,
  updateMemberByAdminAction,
} from 'actions/memberRegistrationActions';
import {
  adminPassword,
  USER_TYPES,
} from 'constants/yjsg';

import ColumnConfiguration from './columnConfig';
import AdvanceSearch from './advanceSearch/AdvanceSearch';
import DesktopButtons from './DesktopButtons';
import FileDownloadMessagePopup from './FileDownloadMessagePopup';
import MemberDataGrid from './MemberDataGrid';
import MobileButtons from './MobileButtons';
import RedirectToRoute from './RedirectToRoute';
import SelectedMembersActionWrapper from './SelectedMembersActionWrapper';

const ContainerStyled = styled(Container)`
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    ${({ theme }) => theme.media.down('lg')`
     overflow-y: inherit;
        display: block;
        height: auto;
        min-height: 100%;
    `};
    @media print {
        height: auto;
        min-height: 100%;
    }
`;

const BoxStyled = styled(Box)`
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    flex-direction: column;
    ${({ theme }) => theme.media.down('lg')`
        overflow-y: unset;
        margin-bottom: 0;
        margin-top: 0;
    `};
    @media print {
        margin-bottom: 0;
        display:block;
        margin-top: 0;
    }
`;

const PrintMediaDisplayNoneBoxStyled = styled(Box)`
     padding: 20px 0px 0px 0px;
     margin: unset;
     @media print {
         display:none;
     }
     ${({ theme }) => theme.media.down('lg')`
         margin: unset;
         padding: 2px 2px;
     `};
`;

const DesktopRowStyled = styled(Row)`
    ${({ theme }) => theme.media.down('lg')`
        display: none;
        input[type = "checkbox"] {
        width:25px;
      }
    `}
`;

const MobileRowStyled = styled(Row)`
 display: none;
 ${({ theme }) => theme.media.down('lg')`
     display: block;
     input[type = "checkbox"] {
         width:25px;
    }
    `}
`;

const RowStyled = styled(Row)`
  display: -webkit-inline-box;
  width: 100%;
  ${({ theme }) => theme.media.down('md')`
       width: 100%;
  `}
`;

const ButtonStyled = styled(Button)`
 width: 27px;
`;

/**
 * MemberInformationGrid render member information grid.
 * @type {Class}
 */
class MemberInformationGrid extends Component {
  constructor(props) {
    super(props);
    this.widthRef = React.createRef();
    this.state = {
      fileDownloadMessage: false,
      checkedIds: [],
      selectedMembers: [],
      selectValue: this.props.selectValue,
      members: [],
      metaData: gridHeaderData({ color: this.props.theme.colors.header }),
      columnOptionIsOpen: false,
      isMemberDataSet: false,
      isAdminRoute: false,
      visibleColumnConfig: this.props.visibleColumnConfig,
      refresh: false,
      fileRedirection: false,
    };
  }

  componentWillMount() {
    const { visibleColumnConfig, metaData } = this.state;
    this.setState({
      metaData: formatMetaData({
        visibleColumnConfig,
        metaData,
        EditButton: this.EditButton,
      }),
    });
  }

  componentDidMount() {
    const { members, secretKey, getAllMembers } = this.props;
    if (isEmpty(members)) {
      getAllMembers({ secretKey });
    } else {
      const idCheckStatusList = setAllMembersAsUnchecked({ members });
      this.setState({
        members: formatMembers({ members }),
        checkedIds: setAllMembersAsUnchecked({ members }),
        selectedMembers: getSelectedMembers({ idCheckStatusList, members }),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { refresh } = this.state;
    const { members } = this.props;
    if (isEmpty(members)) {
      if (!isEqual(nextProps.members, members)) {
        const idCheckStatusList = setAllMembersAsUnchecked({ members: nextProps.members });
        this.setState({
          members: formatMembers({ members: nextProps.members }),
          checkedIds: setAllMembersAsUnchecked({ members: nextProps.members }),
          selectedMembers: getSelectedMembers({ idCheckStatusList, members: nextProps.members }),
        });
      }
    } else {
      const idCheckStatusList = setAllMembersAsUnchecked({ members });
      this.setState({
        members: formatMembers({ members }),
        checkedIds: setAllMembersAsUnchecked({ members }),
        selectedMembers: getSelectedMembers({ idCheckStatusList, members }),
      });
    }
    if (refresh) {
      if (!isEqual(nextProps.members, members)) {
        const idCheckStatusList = setAllMembersAsUnchecked({ members: nextProps.members });
        this.setState({
          members: formatMembers({ members: nextProps.members }),
          refresh: false,
          checkedIds: setAllMembersAsUnchecked({ members: nextProps.members }),
          selectedMembers: getSelectedMembers({ idCheckStatusList, members: nextProps.members }),
        });
      }
    }
  }

  componentDidUpdate() {
    manageMembersTableWidth(this.widthRef);
  }

  /**
   * Method set all export popup message state.
   * @param {boolean} value
   */
  onClickAllExport = (value) => {
    this.setState({
      fileDownloadMessage: value,
    });
  };

  /**
   * Method refresh the member information in member grid
   * by calling getAllMembers
   */
  refreshMembersGrid = () => {
    const { secretKey, getAllMembers } = this.props;
    getAllMembers({ secretKey });
    this.setState({
      refresh: true,
    });
  };

  /**
   * Method will call when click on logout button
   * It reset the admin credentials to false by calling action resetAdminCredentials()
   * It reset the admin login state to false by calling action setAdminLoginState()
   * It reset the visibleColumnConfig to initial
   * state by calling action resetVisibleColumnConfig()
   * And clear local store.
   */
  performLogout = () => {
    const { resetAdminCredentials, setAdminLoginState, setRedirectValue, resetVisibleColumnConfig } = this.props;
    resetAdminCredentials();
    setAdminLoginState({ adminLoginState: false });
    setRedirectValue({ redirect: false });
    resetVisibleColumnConfig();
    localStorage.clear();
  };

  /**
   * Method is call back function which is pass to DataGrid
   * It give selected row data of member on check of check box.
   * @param {Object} selectedRow
   */
  getSelectedRow = (selectedRow) => {
    const { members, checkedIds } = this.state;
    const { members: membersFormProps } = this.props;
    let listOfIsCheckedStatusMembersId = [];
    const membersData = members.map((member) => {
      let memberObject = { ...member, id: Number(member.memberId) };
      selectedRow.forEach((selectedRowMember) => {
        if (String(selectedRowMember.memberId) === String(member.memberId)) {
          memberObject = {
            ...member,
            id: Number(member.memberId),
            memberId: String(member.memberId),
            isChecked: selectedRowMember.isChecked,
          };
          listOfIsCheckedStatusMembersId.push({
            id: Number(member.memberId),
            isChecked: selectedRowMember.isChecked,
          });
        }
      });
      return memberObject;
    });
    const idCheckStatusList = checkedIds.map((idCheckStatusObject) => {
      let finalIdCheckStatusObject = idCheckStatusObject;
      listOfIsCheckedStatusMembersId.forEach((checkedUncheckedMemberIdObject) => {
        if (Number(idCheckStatusObject.id) === Number(checkedUncheckedMemberIdObject.id)) {
          finalIdCheckStatusObject = checkedUncheckedMemberIdObject;
        }
      });
      return finalIdCheckStatusObject;
    });
    this.setState({
      members: membersData,
      checkedIds: idCheckStatusList,
      selectedMembers: getSelectedMembers({ idCheckStatusList, members: membersFormProps }),
    });
    listOfIsCheckedStatusMembersId = [];
  };

  /**
   * Method call when onClick of columnConfig button
   * It set the true value of columnOptionIsOpen.
   */
  openColumnOption = () => {
    this.setState({ columnOptionIsOpen: true });
  };

  /**
   * Method call when onClick of close button of columnConfig modal
   * It set the false value of columnOptionIsOpen.
   */
  closeColumnOption = () => {
    this.setState({ columnOptionIsOpen: false });
  };

  /**
   * Method set the value of visibleColumnConfig and selectValue
   * And call the formatMetaData method.
   * @param {Object} visibleColumnConfig,
   * @param {variable} selectValue,
   */
  setValuesOfVisibleColumnConfig = ({ visibleColumnConfig, selectValue }) => {
    const changedVisibleColumnConfig = getUpdatedVisibleColumnConfig({ visibleColumnConfig });
    const { metaData } = this.state;
    const { setVisibleColumnConfig } = this.props;

    this.setState({
      visibleColumnConfig: changedVisibleColumnConfig,
      metaData: formatMetaData({
        visibleColumnConfig: changedVisibleColumnConfig,
        metaData,
        EditButton: this.EditButton,
      }),
      selectValue,
    });
    setVisibleColumnConfig({ visibleColumnConfig: changedVisibleColumnConfig, selectValue });
  };

  /**
   * Method call when click on edit button of particular column in DataGrid.
   * And it will converted all value of properties of rowData object into string
   * And pass it to setMemberData action
   * Call  updateMemberByAdmin action to fetch the information of particular member.
   * set value of isMemberDataSet
   * @param {Object} rowData
   */
  handleEditClick(rowData) {
    const { memberData, fetchMemberData, setMemberData, updateMemberByAdmin, setUserType } = this.props;
    if (!isEmpty(rowData)) {
      fetchMemberData({ id: String(rowData.memberId), secretKey: adminPassword });
      setMemberData({ member: memberData });
      updateMemberByAdmin({ id: String(rowData.memberId), secretKey: adminPassword });
      setUserType({ pageUser: USER_TYPES.ADMIN });
      this.setState({
        isMemberDataSet: true,
      });
    }
  }

  /**
   * Method set flag for admin route
   */
  setIsAdminRouteFlag = () => {
    this.setState({
      isAdminRoute: true,
    });
  };

  /**
   * EditButton is custom component which is pass to DataGrid
   * (Edit button render in each row of DataGrid)
   * And onClick of this button handleEditClick method will call and pass the
   * rowData object(data of that particular row) as a parameter to handleEditClick method
   * @param {Object} rowData,
   * @return {HTML} component,
   */
  EditButton = ({ rowData }) => (
    <Box backgroundColor="unset" borderStyle="none" width="auto" margin="0" padding="5px 3px">
      <DesktopRowStyled gutter={false}>
        <ButtonStyled
          onClick={() => { this.handleEditClick(rowData); }}
          padding="7px"
          noMinWidth
          noMinHeight
        >
          <FaIcon icon={faEdit} />
        </ButtonStyled>
      </DesktopRowStyled>
      <MobileRowStyled gutter={false}>
        <ButtonStyled
          onClick={() => { this.handleEditClick(rowData); }}
          padding="7px"
          noMinWidth
          noMinHeight
        >
          <FaIcon icon={faEdit} />
        </ButtonStyled>
      </MobileRowStyled>
    </Box>
  );

  /**
   * Method pass as call back function to AdvanceSearch react component.
   * onFilter method call the formatMembers call back function and
   * set the resultant formatted members data in members.
   * @param {Array} result
   */
  onFilter = (result) => {
    this.setState({
      members: formatMembers({ members: result }),
    });
  };

  /**
   * Method set flag for files route
   */
  redirectToFile = () => {
    this.setState({
      fileRedirection: true,
    });
  };

  /**
   * Method will clear all selected records".
   */
  clearSelectedMembers = () => {
    const { members } = this.props;
    this.setState({
      selectedMembers: [],
      members: formatMembers({ members }),
      checkedIds: setAllMembersAsUnchecked({ members }),
    });
  };

  render() {
    const {
      fileRedirection,
      isMemberDataSet,
      isAdminRoute,
      columnOptionIsOpen,
      visibleColumnConfig,
      selectValue,
      metaData,
      checkedIds,
      selectedMembers,
      fileDownloadMessage,
      members: updatedMembers,
    } = this.state;
    const { adminLoginState, members } = this.props;
    return (
      <ContainerStyled width="100%">
        <RedirectToRoute
          fileRedirection={fileRedirection}
          adminLoginState={adminLoginState}
          isMemberDataSet={isMemberDataSet}
          isAdminRoute={isAdminRoute}
        />
        <BoxStyled
          borderStyle="none"
          height="100%"
          width="100%"
          padding="0"
          margin="51px 0 33px"
          ref={this.widthRef}
        >
          <ColumnConfiguration
            columnOptionIsOpen={columnOptionIsOpen}
            closeColumnOption={this.closeColumnOption}
            visibleColumnConfig={visibleColumnConfig}
            setValuesOfVisibleColumnConfig={this.setValuesOfVisibleColumnConfig}
            selectValue={selectValue}
          />
          <PrintMediaDisplayNoneBoxStyled borderStyle="none">
            <MobileButtons
              openColumnOption={this.openColumnOption}
              performLogout={this.performLogout}
              refreshMembersGrid={this.refreshMembersGrid}
              setIsAdminRouteFlag={this.setIsAdminRouteFlag}
              redirectToFile={this.redirectToFile}
            />
            <RowStyled margin="0 0 0 0" backgroundColor="unset" borderStyle="none" className="modal">
              <AdvanceSearch
                metaData={metaData}
                members={members}
                onFilter={this.onFilter}
                checkedIds={checkedIds}
              />
              <DesktopButtons
                redirectToFile={this.redirectToFile}
                openColumnOption={this.openColumnOption}
                refreshMembersGrid={this.refreshMembersGrid}
              />
            </RowStyled>
          </PrintMediaDisplayNoneBoxStyled>
          <SelectedMembersActionWrapper
            selectedMembers={selectedMembers}
            metaData={metaData}
            clearSelectedMembers={this.clearSelectedMembers}
          />
          <MemberDataGrid
            metaData={metaData}
            members={updatedMembers}
            getSelectedRow={this.getSelectedRow}
            onClickAllExport={this.onClickAllExport}
          />
          <FileDownloadMessagePopup
            fileDownloadMessage={fileDownloadMessage}
            onClickAllExport={this.onClickAllExport}
          />
        </BoxStyled>
      </ContainerStyled>

    );
  }
}
MemberInformationGrid.propTypes = {
  adminLoginState: PropTypes.bool,
  fetchMemberData: PropTypes.func,
  getAllMembers: PropTypes.func,
  members: PropTypes.array,
  memberData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  mode: PropTypes.string,
  // redirect: PropTypes.bool,
  resetAdminCredentials: PropTypes.func,
  resetVisibleColumnConfig: PropTypes.func,
  secretKey: PropTypes.string,
  selectValue: PropTypes.bool,
  setAdminLoginState: PropTypes.func,
  setMemberData: PropTypes.func,
  setRedirectValue: PropTypes.func,
  setUserType: PropTypes.func,
  setVisibleColumnConfig: PropTypes.func,
  theme: PropTypes.object,
  updateMemberByAdmin: PropTypes.func,
  visibleColumnConfig: PropTypes.object,
};

MemberInformationGrid.defaultProps = {
  adminLoginState: false,
  fetchMemberData: () => {},
  getAllMembers: () => {},
  members: [],
  memberData: {},
  mode: '',
  // redirect: false,
  resetAdminCredentials: () => {},
  resetVisibleColumnConfig: () => {},
  secretKey: '',
  selectValue: true,
  setAdminLoginState: () => {},
  setMemberData: () => {},
  setRedirectValue: () => {},
  setUserType: () => {},
  setVisibleColumnConfig: () => {},
  theme: {},
  updateMemberByAdmin: () => {},
  visibleColumnConfig: {},
};

const mapStateToProps = state => ({
  adminLoginState: stateOfAdminLogin(state),
  memberData: getMember(state),
  members: allMembersData(state),
  mode: getApplicationMode(state),
  redirect: stateOfRedirect(state),
  secretKey: getSecretKey(state),
  selectValue: getSelectValue(state),
  visibleColumnConfig: getVisibleColumnConfig(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMemberData: ({ id, secretKey }) => dispatch(fetchMemberDataAction({ id, secretKey })),
  getAllMembers: ({ secretKey }) => dispatch(getAllMembersAction({ secretKey })),
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  resetIsSuccess: () => dispatch(resetIsSuccessAction()),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
  setAdminLoginState: ({ adminLoginState }) => dispatch(setAdminLoginStateAction({ adminLoginState })),
  setMemberData: ({ member }) => dispatch(setMemberDataAction({ member })),
  setRedirectValue: ({ redirect }) => dispatch(setRedirectValueAction({ redirect })),
  setVisibleColumnConfig: ({ visibleColumnConfig, selectValue }) =>
    dispatch(setVisibleColumnConfigAction({ visibleColumnConfig, selectValue })),
  setUserType: ({ pageUser }) => dispatch(setUserTypeAction({ pageUser })),
  updateMemberByAdmin: ({ id, secretKey }) => dispatch(updateMemberByAdminAction({ id, secretKey })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MemberInformationGrid));
