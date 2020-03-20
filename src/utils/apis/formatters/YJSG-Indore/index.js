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
} from './requestFormatters';
import { formatMembersData, fetchUserFromPhoneFormatter } from './responseFormatters';

export default {
  header: {
    updateMember: defaultHeaderFormatter,
    getMember: defaultHeaderFormatter,
    getMembers: defaultHeaderFormatter,
    uploadAttendanceFile: uploadCSVFileHeaderFormatter,
    uploadOptInFile: uploadCSVFileHeaderFormatter,
    markMemberAttendance: defaultHeaderFormatter,
    markMemberOptStatus: defaultHeaderFormatter,
    markMemberIdCardStatus: defaultHeaderFormatter,
  },
  request: {
    updateMember: formatUpdateMemberDataPayload,
    uploadAttendanceFile: uploadAttendanceFileRequestFormatter,
    uploadOptInFile: uploadOptInFileRequestFormatter,
    markMemberOptStatus: markMemberOptStatusRequestFormatter,
    markMemberIdCardStatus: markMemberIdCardStatusRequestFormatter,
  },
  response: {
    getMembers: formatMembersData,
    fetchUserFromPhone: fetchUserFromPhoneFormatter,
  },
};
