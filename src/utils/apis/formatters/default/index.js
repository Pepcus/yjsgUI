import {
  headerParamsFormatter,
  uploadCSVFileHeaderFormatter,
  markMemberAPIHeaderFormatter,
} from './headerFormatters';
import {
  formatCreateMemberDataPayload,
  formatUpdateMemberDataPayload,
  uploadAttendanceFileRequestFormatter,
  uploadOptInFileRequestFormatter,
  markMemberAttendanceRequestFormatter,
  markMemberOptStatusRequestFormatter,
} from './requestFormatters';

export const defaultTenant = {
  header: {
    updateMember: headerParamsFormatter,
    getMember: headerParamsFormatter,
    getMembers: headerParamsFormatter,
    uploadAttendanceFile: uploadCSVFileHeaderFormatter,
    uploadOptInFile: uploadCSVFileHeaderFormatter,
    markMemberAttendance: markMemberAPIHeaderFormatter,
    markMemberOptStatus: markMemberAPIHeaderFormatter
  },
  request: {
    createMember: formatCreateMemberDataPayload,
    updateMember: formatUpdateMemberDataPayload,
    uploadAttendanceFile: uploadAttendanceFileRequestFormatter,
    uploadOptInFile: uploadOptInFileRequestFormatter,
    markMemberAttendance: markMemberAttendanceRequestFormatter,
    markMemberOptStatus: markMemberOptStatusRequestFormatter,
  },
  response: {
    createMember: response => response,
    updateMember: response => response,
    getMember: response => response,
    getMembers: response => response,
    uploadAttendanceFile: response => response,
    markMemberOptStatus: response => response,
  },
};
