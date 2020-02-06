import {
  defaultHeaderFormatter,
  uploadCSVFileHeaderFormatter,
} from './headerFormatters';
import {
  formatUpdateMemberDataPayload,
  uploadAttendanceFileRequestFormatter,
  uploadOptInFileRequestFormatter,
  markMemberOptStatusRequestFormatter,
  markMemberIdCardStatusRequestFormatter,
  updateCoordinatorRequestFormatter,
} from './requestFormatters';
import {
  formatMembersData,
  updateCoordinatorResponseFormatter,
  fetchUserFromPhoneFormatter,
} from './responseFormatters';

export default {
  header: {
    updateMember: defaultHeaderFormatter,
    updateCoordinator: defaultHeaderFormatter,
    getMember: defaultHeaderFormatter,
    getCoordinator: defaultHeaderFormatter,
    getMembers: defaultHeaderFormatter,
    uploadAttendanceFile: uploadCSVFileHeaderFormatter,
    uploadOptInFile: uploadCSVFileHeaderFormatter,
    markMemberAttendance: defaultHeaderFormatter,
    markMemberOptStatus: defaultHeaderFormatter,
    markMemberIdCardStatus: defaultHeaderFormatter,
  },
  request: {
    updateMember: formatUpdateMemberDataPayload,
    updateCoordinator: updateCoordinatorRequestFormatter,
    createCoordinator: updateCoordinatorRequestFormatter,
    uploadAttendanceFile: uploadAttendanceFileRequestFormatter,
    uploadOptInFile: uploadOptInFileRequestFormatter,
    markMemberOptStatus: markMemberOptStatusRequestFormatter,
    markMemberIdCardStatus: markMemberIdCardStatusRequestFormatter,
  },
  response: {
    getMembers: formatMembersData,
    getCoordinator: updateCoordinatorResponseFormatter,
    fetchUserFromPhone: fetchUserFromPhoneFormatter,
  },
};
