import { put } from 'redux-saga/effects';

import {
  createMember,
  fetchMember,
  updateMember,
  fetchMembers,
  uploadAttendance,
  uploadOptIn,
  markMemberAttendance,
  markMemberOptStatus,
  updateMemberIdCardStatus,
  registerParent,
} from 'apis/member';

import {
  createMemberFailedAction,
  createMemberSuccessAction,
  fetchMemberFailedAction,
  fetchMemberSuccessAction,
  updateMemberFailedAction,
  updateMemberSuccessAction,
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

/**
 * createMemberSaga sage call when create a new member.
 * @param {Object} action
 */
export function* createMemberSaga(action) {
  const { member } = action;
  const errorMessage = 'Error creating new member.';
  try {
    const response = yield createMember(member);
    if (response.student) {
      yield put(createMemberSuccessAction(response.student));
    } else {
      yield put(createMemberFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(createMemberFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * fetchMemberSaga saga call when fetch particular member
 * @param {Object} action
 */
export function* fetchMemberSaga(action) {
  const { id, secretKey } = action;
  const errorMessage = 'Error fetching member details.';
  try {
    yield put(setLoadingStateAction(true));
    const response = yield fetchMember(id, secretKey);
    if (response.student) {
      yield put(fetchMemberSuccessAction(response.student));
    } else {
      yield put(fetchMemberFailedAction(errorMessage));
    }
    yield put(setLoadingStateAction(false));
  } catch (e) {
    yield put(fetchMemberFailedAction(errorMessage));
    yield put(setLoadingStateAction(false));
    throw e;
  }
}

/**
 * updateMemberSaga saga call when update member.
 * @param {Object} action
 */
export function* updateMemberSaga(action) {
  const { id, secretKey, member } = action;
  const errorMessage = 'Error updating member details.';
  try {
    yield put(setLoadingStateAction(true));
    const response = yield updateMember({ id, secretKey, member });
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield fetchMembers(secretKey);
    if (response.students) {
      yield put(getAllMembersDataResultsSuccessAction(response.students));
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield uploadAttendance(secretKey, attendanceFile, day);
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield uploadOptIn(secretKey, optInFile);
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield markMemberAttendance({ secretKey, selectedMembersId, day });
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield markMemberOptStatus({ secretKey, selectedMembersId, opt });
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield updateMemberIdCardStatus({ secretKey, selectedMembersId, IdCardStatus });
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
  try {
    yield put(setLoadingStateAction(true));
    const response = yield registerParent(name, members, phoneNumber);
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
