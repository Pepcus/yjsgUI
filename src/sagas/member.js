
import { put, select } from 'redux-saga/effects';
import { callAPIWithConfig } from 'apis/apis';
import {
  createMemberFailedAction,
  createMemberSuccessAction,
  fetchMemberFailedAction,
  fetchMemberSuccessAction,
  updateMemberFailedAction,
  updateMemberSuccessAction,
  partialMemberAlreadyRegisteredAction,
  exactMemberAlreadyRegisteredAction,
  fetchMembersByMobileNumberSuccessAction,
  fetchMembersByMobileNumberFailedAction,
  updateMembersOptInStatusSuccessAction,
  updateMembersOptInStatusFailedAction,
} from 'actions/memberRegistrationActions';
import {
  getAllMembersDataResultsSuccessAction,
  getAllMembersDataResultsFailureAction,
  uploadAttendanceFileResultsSuccessAction,
  uploadAttendanceFileResultsFailureAction,
  uploadOptInFileResultsSuccessAction,
  uploadOptInFileResultsFailureAction,
  markSelectedMembersAttendanceResultsSuccessAction,
  markSelectedMembersAttendanceResultsFailureAction,
  markSelectedMembersOptInOrOptOutResultsSuccessAction,
  markSelectedMembersOptInOrOptOutResultsFailureAction,
  updateIdCardStatusSelectedMembersResultsSuccessAction,
  updateIdCardStatusSelectedMembersResultsFailureAction,
} from 'actions/allMembersDataActions';
import {
  parentsRegistrationResultsSuccessAction,
  parentsRegistrationResultsFailureAction,
} from 'actions/parentsRegistrationAction';
import {
  setLoadingStateAction,
} from 'actions/loaderActions';
import { getAPIConfig } from 'reducers/api';
import { getTenantName } from 'reducers/app';
import { fetchUserFromPhoneSuccess, userCreateSuccessAction } from 'actions/userActions';

/**
 * createMemberSaga sage call when create a new member.
 * @param {Object} action
 */
export function* createMemberSaga(action) {
  const { member } = action;
  const errorMessage = 'Error creating new member.';

  const apiConfig = yield select(getAPIConfig, 'member', 'createMember');

  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, data: member };
    const response = yield callAPIWithConfig(tenant, 'createMember', config);

    if (response.student) {
      yield put(createMemberSuccessAction(response.student));
    } else if (response.errorCode === 1001) {
      yield put(partialMemberAlreadyRegisteredAction())
    } else if (response.errorCode === 1000) {
      yield put(exactMemberAlreadyRegisteredAction())
    } else {
      yield put(createMemberFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    if (e.errorCode === 1001) {
      yield put(partialMemberAlreadyRegisteredAction())
    } else if (e.errorCode === 1000) {
      yield put(exactMemberAlreadyRegisteredAction())
    } else {
      yield put(createMemberFailedAction(errorMessage));
      yield put(setLoadingStateAction(false));
      throw e;
    }
  }
}

/**
 * fetchMemberSaga saga call when fetch particular member
 * @param {Object} action
 */
export function* fetchMemberSaga(action) {
  const { id, secretKey } = action;
  const errorMessage = 'Error fetching member details.';
  const apiConfig = yield select(getAPIConfig, 'member', 'getMember');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { id }, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'getMember', config);

    if (response.student) {
      yield put(fetchMemberSuccessAction(response.student));
    } else {
      yield put(fetchMemberFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchMemberFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * updateMemberSaga saga call when update member.
 * @param {Object} action
 */
export function* updateMemberSaga(action) {
  const { id, secretKey, member } = action;
  const errorMessage = 'Error updating member details.';
  const apiConfig = yield select(getAPIConfig, 'member', 'updateMember');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { id }, data: member, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'updateMember', config);
    if (response) {
      yield put(updateMemberSuccessAction(response.student));
    } else {
      yield put(updateMemberFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(updateMemberFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * getAllMembersSaga saga call when fetch all member data.
 * @param {Object} action
 */
export function* getAllMembersSaga(action) {
  const { secretKey } = action;
  const errorMessage = 'Error getting member details.';
  const apiConfig = yield select(getAPIConfig, 'member', 'getMembers');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'getMembers', config);
    if (response.length) {
      yield put(getAllMembersDataResultsSuccessAction(response));
    } else {
      throw response;
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(getAllMembersDataResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * uploadAttendanceFileSaga saga call when submit members attendance csv file.
 * @param {Object} action
 */
export function* uploadAttendanceFileSaga(action) {
  const { secretKey, attendanceFile, day } = action;
  const errorMessage = 'Error occurred while uploading attendance file.';
  const apiConfig = yield select(getAPIConfig, 'member', 'uploadAttendanceFile');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, data: { attendanceFile, day }, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'uploadAttendanceFile', config);
    if (response.totalRecords) {
      yield put(uploadAttendanceFileResultsSuccessAction(response));
    } else {
      yield put(uploadAttendanceFileResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(uploadAttendanceFileResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * /**
 * uploadOptInFileSaga saga call when submit members optIn csv file.
 * @param {Object} action
 */
export function* uploadOptInFileSaga(action) {
  const { secretKey, optInFile } = action;
  const errorMessage = 'Error occurred while uploading opt-in file.';
  const apiConfig = yield select(getAPIConfig, 'member', 'uploadOptInFile');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, data: optInFile, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'uploadOptInFile', config);
    if (response.totalRecords) {
      yield put(uploadOptInFileResultsSuccessAction(response));
    } else {
      yield put(uploadOptInFileResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(uploadOptInFileResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * markSelectedMembersAttendanceSaga saga call when mark selected members attendance.
 * @param {Object} action
 */
export function* markSelectedMembersAttendanceSaga(action) {
  const { secretKey, selectedMembersId, day } = action;
  const errorMessage = 'Error getting mark selected members attendance.';
  const apiConfig = yield select(getAPIConfig, 'member', 'markMemberAttendance');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { selectedMembersId }, data: day, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'markMemberAttendance', config);
    if (response.message === 'Updated Successfully') {
      yield put(markSelectedMembersAttendanceResultsSuccessAction(response));
    } else {
      yield put(markSelectedMembersAttendanceResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(markSelectedMembersAttendanceResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * markSelectedMembersOptInOrOptOutSaga saga call when mark selected members optIn
 * @param {Object} action
 */
export function* markSelectedMembersOptInOrOptOutSaga(action) {
  const { secretKey, selectedMembersId, opt } = action;
  const errorMessage = 'Error getting mark selected members opt in or opt out.';
  const apiConfig = yield select(getAPIConfig, 'member', 'markMemberOptStatus');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { selectedMembersId }, data: opt, additionalData: { secretKey } };
    const response = yield callAPIWithConfig(tenant, 'markMemberOptStatus', config);
    if (response.message === 'Updated Successfully') {
      yield put(markSelectedMembersOptInOrOptOutResultsSuccessAction(response));
    } else {
      yield put(markSelectedMembersOptInOrOptOutResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(markSelectedMembersOptInOrOptOutResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * updateIdCardStatusSelectedMembersSaga saga call when update Id card status of selected members
 * @param {Object} action
 */
export function* updateIdCardStatusSelectedMembersSaga(action) {
  const { secretKey, selectedMembersId, IdCardStatus } = action;
  const errorMessage = 'Error getting update Id card status of selected members.';
  const apiConfig = yield select(getAPIConfig, 'member', 'markMemberIdCardStatus');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = {
      ...apiConfig,
      urlValuesMap: { selectedMembersId },
      data: IdCardStatus,
      additionalData: { secretKey },
    };
    const response = yield callAPIWithConfig(tenant, 'markMemberIdCardStatus', config);
    if (response.message === 'Updated Successfully') {
      yield put(updateIdCardStatusSelectedMembersResultsSuccessAction(response));
    } else {
      yield put(updateIdCardStatusSelectedMembersResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(updateIdCardStatusSelectedMembersResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

/**
 * parentsRegistrationSaga saga call when parent submit their registration form.
 * @param {Object} action
 */
export function* parentsRegistrationSaga(action) {
  const { name, members, phoneNumber } = action;
  const errorMessage = 'Error getting registration.';
  const apiConfig = yield select(getAPIConfig, 'member', 'createSecondaryMember');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = {
      ...apiConfig,
      data: { name, members, phoneNumber },
    };
    const response = yield callAPIWithConfig(tenant, 'createSecondaryMember', config);
    if (response.message === 'Registration successful') {
      yield put(parentsRegistrationResultsSuccessAction(response));
    } else {
      yield put(parentsRegistrationResultsFailureAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(parentsRegistrationResultsFailureAction(errorMessage));
    yield put(setLoadingStateAction(false));
  }
}

export function* fetchMembersByMobileNumberSaga(action) {
  const { mobile } = action;
  const errorMessage = 'Error fetching member details.';
  const apiConfig = yield select(getAPIConfig, 'member', 'getMembersByMobileNumber');
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const config = { ...apiConfig, urlValuesMap: { mobile } };
    const response = yield callAPIWithConfig(tenant, 'getMembersByMobileNumber', config);
    if (response.students) {
      yield put(fetchMembersByMobileNumberSuccessAction({ members: response.students }));
    } else {
      yield put(fetchMembersByMobileNumberFailedAction({ errorMessage }));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchMembersByMobileNumberFailedAction({ errorMessage }));
    yield put(setLoadingStateAction(false));
  }
}

export function* updateMembersOptInStatusSaga(action) {
  const { optedInMembersIds, notOptedInMembersIds } = action;
  const errorMessage = 'Error updating member details.';
  const apiConfig = yield select(getAPIConfig, 'member', 'updateMembersOptIn');
  let optInMembersResponse = null;
  let notOptedInMembersResponse = null;
  try {
    yield put(setLoadingStateAction(true));
    const tenant = yield select(getTenantName);
    const optInMembersConfig = { ...apiConfig, urlValuesMap: { selectedMembersId: optedInMembersIds }, data: JSON.stringify(
        {
          optIn2021: 'Y'
        })};
    const notOptedInMembersConfig = { ...apiConfig, urlValuesMap: { selectedMembersId: notOptedInMembersIds }, data: JSON.stringify(
        {
          optIn2021: 'N'
        }
      ) };
    if (optedInMembersIds) {
      optInMembersResponse = yield callAPIWithConfig(tenant, 'updateMembersOptIn', optInMembersConfig);
    }
    if (notOptedInMembersIds) {
      notOptedInMembersResponse = yield callAPIWithConfig(tenant, 'updateMembersOptIn', notOptedInMembersConfig);
    }
    if (optInMembersResponse || notOptedInMembersResponse) {
      yield put(updateMembersOptInStatusSuccessAction());
    } else {
      yield put(updateMembersOptInStatusFailedAction({ errorMessage }));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(updateMembersOptInStatusFailedAction({ errorMessage }));
    yield put(setLoadingStateAction(false));
  }
}
