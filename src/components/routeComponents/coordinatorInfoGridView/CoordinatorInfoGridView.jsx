import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Container from 'pepcus-core/lib/Container';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import Box from 'pepcus-core/lib/Box';

import CoordinatorInfoGrid from 'components/routeComponents/coordinatorInfoGridView/CoordinatorInfoGrid';
import {
  fetchCoordinatorDataAction,
  fetchCoordinatorsAction,
  fetchCoordinatorSuccessAction, setCoordinatorCredentialsAction
} from 'actions/coordinatorRegistrationActions';
import { getCoordinators } from 'reducers/coordinatorRegistrationReducer';
import ColumnConfiguration from 'components/routeComponents/coordinatorInfoGridView/columnConfig/ColumnConfiguration';
import {
  formatMembers,
  formatMetaData, getCoordinatorsByAssignedDepartments,
  getInitialVisibleColumnConfig, getSelectedMembers,
  getUpdatedVisibleColumnConfig,
  manageMembersTableWidth, setAllMembersAsUnchecked
} from 'utils/common';
import { formatGridHeaderDataForCoordinator, gridHeaderData } from 'constants/gridData';
import isEmpty from 'lodash/isEmpty';
import FaIcon from 'pepcus-core/lib/FaIcon';
import Row from 'pepcus-core/lib/Row';
import Button from 'pepcus-core/lib/Button';
import isEqual from 'lodash/isEqual';
import { USER_TYPES } from 'constants/member';
import { getSelectValue } from 'reducers/appReducer';
import {
  resetVisibleColumnConfigAction,
  setRedirectValueAction,
  setVisibleColumnConfigAction,
} from 'actions/appActions';
import MobileButtons from 'components/routeComponents/coordinatorInfoGridView/MobileButtons';
import AdvanceSearch from 'components/routeComponents/coordinatorInfoGridView/advanceSearch';
import DesktopButtons from 'components/routeComponents/coordinatorInfoGridView/DesktopButtons';
import { setVisibleColumnOptionsConfigAction } from 'actions/gridMetaDataAction';
import FileDownloadMessagePopup from 'components/routeComponents/coordinatorInfoGridView/FileDownloadMessagePopup';
import RedirectToRoute from 'components/routeComponents/coordinatorInfoGridView/RedirectToRoute';
import {
  resetAdminCredentialsAction,
  resetLoginAdminStateAction,
} from 'actions/loginActions';

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

class CoordinatorInfoGridView extends React.Component {
  constructor(props) {
    super(props);

    const { theme: { colors }, config } = props;
    this.widthRef = React.createRef();
    this.state = {
      coordinators: [],
      selectedCoordinators: [],
      checkedIds: [],
      columnOptionIsOpen: false,
      fileDownloadMessage: false,
      refresh: false,
      isCoordinatorDataSet: false,
      selectValue: props.selectValue,
      visibleColumnConfig: props.visibleColumnConfig,
      metaData: formatGridHeaderDataForCoordinator({
        color: colors.header,
        gridMetaData: config.gridMetaData,
      }),
      memberViewRedirection: false,
      coordinatorCorrectionRedirection: false,
      isAdminRoute: false,
    }
  }

  componentWillMount() {
    const { visibleColumnConfig, metaData } = this.state;
    const { config, visibleColumnConfig: previousVisibleColumnConfig } = this.props;
    const { gridMetaData } = config;
    if (isEmpty(visibleColumnConfig)) {
      this.props.setVisibleColumnOptionsConfig({ gridMetaData });
      this.setState({
        visibleColumnConfig: getInitialVisibleColumnConfig({ gridMetaData }),
        metaData: formatMetaData({
          visibleColumnConfig: getInitialVisibleColumnConfig({ gridMetaData }),
          metaData,
          EditButton: this.EditButton,
          gridMetaData,
        }),
      });
    } else {
      this.setState({
        metaData: formatMetaData({
          visibleColumnConfig,
          metaData,
          EditButton: this.EditButton,
          gridMetaData,
        }),
      });
    }
  }

  componentDidMount() {
    const { coordinators = [] } = this.props;
    this.props.fetchCoordinators();
    const idCheckStatusList = setAllMembersAsUnchecked({ members: coordinators });
    this.setState({
      coordinators: getCoordinatorsByAssignedDepartments({ coordinators }),
      checkedIds: setAllMembersAsUnchecked({ members: coordinators }),
      selectedCoordinators: getSelectedMembers({ idCheckStatusList, members: coordinators }),
    });
  }

  componentDidUpdate() {
    manageMembersTableWidth(this.widthRef);
  }

  componentWillReceiveProps(nextProps) {
    const { refresh } = this.state;
    const { coordinators = [] } = this.props;
    if (isEmpty(coordinators)) {
      if (!isEqual(nextProps.coordinators, coordinators)) {
        const idCheckStatusList = setAllMembersAsUnchecked({ members: nextProps.coordinators });
        this.setState({
          coordinators: getCoordinatorsByAssignedDepartments({ coordinators }),
          checkedIds: setAllMembersAsUnchecked({ members: nextProps.coordinators }),
          selectedCoordinators: getSelectedMembers({ idCheckStatusList, members: nextProps.coordinators }),
        });
      }
    } else {
      const idCheckStatusList = setAllMembersAsUnchecked({ members: coordinators });
      this.setState({
        coordinators: getCoordinatorsByAssignedDepartments({ coordinators }),
        checkedIds: setAllMembersAsUnchecked({ members: coordinators }),
        selectedCoordinators: getSelectedMembers({ idCheckStatusList, members: coordinators }),
      });
    }
    if (refresh) {
      if (!isEqual(nextProps.coordinators, coordinators)) {
        const idCheckStatusList = setAllMembersAsUnchecked({ members: nextProps.coordinators });
        this.setState({
          coordinators: getCoordinatorsByAssignedDepartments({ coordinators }),
          refresh: false,
          checkedIds: setAllMembersAsUnchecked({ members: nextProps.coordinators }),
          selectedCoordinators: getSelectedMembers({ idCheckStatusList, members: nextProps.coordinators }),
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetVisibleColumnConfig();
  }

  /**
   * Method call when click on edit button of particular column in DataGrid.
   * And it will converted all value of properties of rowData object into string
   * And pass it to setMemberData action
   * Call  updateMemberByAdmin action to fetch the information of particular member.
   * set value of isMemberDataSet
   * @param {Object} rowData
   */
  handleEditClick(rowData) {
    const { id, secretKey } = rowData;
    if (!isEmpty(rowData)) {
      this.props.fetchCoordinatorSuccess(rowData);
      this.props.setCoordinatorCredentials({ id, secretKey });
      this.props.fetchCoordinatorData({ id, secretKey });
      this.setState({
        coordinatorCorrectionRedirection: true,
      });
    }
  }

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
          padding="6px"
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
    const { config } = this.props;
    const { gridMetaData } = config;

    this.setState({
      visibleColumnConfig: changedVisibleColumnConfig,
      metaData: formatMetaData({
        visibleColumnConfig: changedVisibleColumnConfig,
        metaData,
        EditButton: this.EditButton,
        gridMetaData,
      }),
      selectValue,
    });
    this.props.setVisibleColumnConfig({ visibleColumnConfig: changedVisibleColumnConfig, selectValue });
  };

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
   * Method is call back function which is pass to DataGrid
   * It give selected row data of member on check of check box.
   * @param {Array} selectedRowData
   */
  getSelectedRow = (selectedRowData = []) => {
    const { coordinators = [], checkedIds } = this.state;
    const { coordinators: coordinatorsFromProps = [] } = this.props;
    let listOfIsCheckedStatusCoordinatorId = [];
    const coordinatorsData = coordinators.map((coordinator) => {
      let coordinatorObject = { ...coordinator, id: Number(coordinator.id) };
      selectedRowData.forEach((selectedRow) => {
        if (String(selectedRow.id) === String(coordinator.id)) {
          coordinatorObject = {
            ...coordinator,
            id: Number(coordinator.id),
            isChecked: selectedRow.isChecked,
          };
          listOfIsCheckedStatusCoordinatorId.push({
            id: Number(coordinator.id),
            isChecked: selectedRow.isChecked,
          });
        }
      });
      return coordinatorObject;
    });
    const idCheckStatusList = checkedIds.map((idCheckStatusObject) => {
      let finalIdCheckStatusObject = idCheckStatusObject;
      listOfIsCheckedStatusCoordinatorId.forEach((checkedUncheckedCoordinatorIdObject) => {
        if (Number(idCheckStatusObject.id) === Number(checkedUncheckedCoordinatorIdObject.id)) {
          finalIdCheckStatusObject = checkedUncheckedCoordinatorIdObject;
        }
      });
      return finalIdCheckStatusObject;
    });
    this.setState({
      coordinators: coordinatorsData,
      checkedIds: idCheckStatusList,
      selectedCoordinators: getSelectedMembers({ idCheckStatusList, members: coordinatorsFromProps }),
    });

    listOfIsCheckedStatusCoordinatorId = [];
  };

  /**
   * Method set flag for files route
   */
  redirectToFile = () => {
    this.setState({
      fileRedirection: true,
    });
  };

  redirectToMemberView = () => {
    this.setState({
      memberViewRedirection: true,
    });
  };


  /**
   * Method will call when click on logout button
   * It reset the admin credentials to false by calling action resetAdminCredentials()
   * It reset the admin login state to false by calling action resetLoginAdminState()
   * It reset the visibleColumnConfig to initial
   * state by calling action resetVisibleColumnConfig()
   * And clear local store.
   */
  performLogout = () => {
    this.props.resetAdminCredentials();
    this.props.setRedirectValue({ redirect: false });
    this.props.resetVisibleColumnConfig();
    this.props.resetLoginAdminState();
    localStorage.clear();
  };

  /**
   * Method set flag for admin route
   */
  setIsAdminRouteFlag = () => {
    this.setState({
      isAdminRoute: true,
    });
  };


  /**
   * Method pass as call back function to AdvanceSearch react component.
   * onFilter method call the formatMembers call back function and
   * set the resultant formatted members data in members.
   * @param {Array} result
   */
  onFilter = ({ members }) => {
    this.setState({
      coordinators: members,
    });
  };

  render() {
    const {
      config,
      isAdminLogin,
    } = this.props;

    const {
      columnOptionIsOpen,
      coordinators,
      checkedIds,
      fileDownloadMessage,
      fileRedirection,
      isAdminRoute,
      memberViewRedirection,
      metaData,
      selectValue,
      visibleColumnConfig,
      coordinatorCorrectionRedirection,
    } = this.state;

    const {
      advanceSearchSchema,
      columnConfigSchema,
      columnList,
      isAdvanceSearchEnable,
    } = config;

    return(
      <ContainerStyled width="100%">
        <RedirectToRoute
          fileRedirection={fileRedirection}
          memberViewRedirection={memberViewRedirection}
          isAdminLogin={isAdminLogin}
          isAdminRoute={isAdminRoute}
          coordinatorCorrectionRedirection={coordinatorCorrectionRedirection}
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
          columnList={columnList}
          columnOptionIsOpen={columnOptionIsOpen}
          closeColumnOption={this.closeColumnOption}
          visibleColumnConfig={visibleColumnConfig}
          setValuesOfVisibleColumnConfig={this.setValuesOfVisibleColumnConfig}
          selectValue={selectValue}
          columnConfigSchema={columnConfigSchema}
        />
          <PrintMediaDisplayNoneBoxStyled borderStyle="none">
            <MobileButtons
              redirectToFile={this.redirectToFile}
              redirectToMemberView={this.redirectToMemberView}
              openColumnOption={this.openColumnOption}
              performLogout={this.performLogout}
              setIsAdminRouteFlag={this.setIsAdminRouteFlag}
            />
            <RowStyled margin="0 0 0 0" backgroundColor="unset" borderStyle="none" className="modal">
              <AdvanceSearch
                acl={isAdvanceSearchEnable}
                advanceSearchSchema={advanceSearchSchema}
                metaData={metaData}
                members={getCoordinatorsByAssignedDepartments({ coordinators: this.props.coordinators })}
                onFilter={this.onFilter}
                checkedIds={checkedIds}
              />
              <DesktopButtons
                // isUploadOptInFileEnable={isUploadOptInFileEnable}
                // isUploadAttendanceFileEnable={isUploadAttendanceFileEnable}
                // attendanceFileModalFormSchema={attendanceFileModalFormSchema}
                // optInFileModalFormSchema={optInFileModalFormSchema}
                redirectToFile={this.redirectToFile}
                redirectToMemberView={this.redirectToMemberView}
                openColumnOption={this.openColumnOption}
                // refreshMembersGrid={this.refreshMembersGrid}
              />
            </RowStyled>
          </PrintMediaDisplayNoneBoxStyled>
        <CoordinatorInfoGrid
          coordinators={coordinators}
          metaData={metaData}
          getSelectedRow={this.getSelectedRow}
          onClickAllExport={this.onClickAllExport}
        />
          <FileDownloadMessagePopup
            fileDownloadMessage={fileDownloadMessage}
            onClickAllExport={this.onClickAllExport}
          />
        </BoxStyled>
      </ContainerStyled>
    )
  }
}

CoordinatorInfoGridView.propTypes = {
  coordinators: PropTypes.array,
  config: PropTypes.object,
  fetchCoordinators: PropTypes.func,
  selectValue: PropTypes.bool,
  setVisibleColumnConfig: PropTypes.func,
  setVisibleColumnOptionsConfig: PropTypes.func,
  theme: PropTypes.object,
};

CoordinatorInfoGridView.defaultProps = {
  coordinators: [],
  config: {},
  fetchCoordinators: () => {},
  selectValue: true,
  setVisibleColumnConfig: () => {},
  setVisibleColumnOptionsConfig: () => {},
  theme: {},
};

const mapStateToProps = state => ({
  coordinators: getCoordinators(state),
  selectValue: getSelectValue(state),
});

const mapDispatchToProps = dispatch => ({
  fetchCoordinators: () => dispatch(fetchCoordinatorsAction()),
  setVisibleColumnConfig: ({ visibleColumnConfig, selectValue }) =>
    dispatch(setVisibleColumnConfigAction({ visibleColumnConfig, selectValue })),
  setVisibleColumnOptionsConfig: ({ gridMetaData }) => dispatch(setVisibleColumnOptionsConfigAction({ gridMetaData })),
  resetVisibleColumnConfig: () => dispatch(resetVisibleColumnConfigAction()),
  fetchCoordinatorSuccess: (coordinator) => dispatch(fetchCoordinatorSuccessAction(coordinator)),
  fetchCoordinatorData: ({ id, secretKey }) => dispatch(fetchCoordinatorDataAction({ id, secretKey })),
  setCoordinatorCredentials: ({ id, secretKey }) => dispatch(setCoordinatorCredentialsAction({ id, secretKey })),
  resetLoginAdminState: () => dispatch(resetLoginAdminStateAction()),
  resetAdminCredentials: () => dispatch(resetAdminCredentialsAction()),
  setRedirectValue: ({ redirect }) => dispatch(setRedirectValueAction({ redirect })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CoordinatorInfoGridView));
