import {
  defaultHeaderFormatter,
  uploadCSVFileHeaderFormatter,
  markMemberAPIHeaderFormatter,
} from './headerFormatters';
import {
  formatUpdateMemberDataPayload,
  uploadAttendanceFileRequestFormatter,
  uploadOptInFileRequestFormatter,
  markMemberOptStatusRequestFormatter,
  markMemberIdCardStatusRequestFormatter,
} from './requestFormatters';

export default {
  header: {
    updateMember: defaultHeaderFormatter,
    getMember: defaultHeaderFormatter,
    getMembers: defaultHeaderFormatter,
    uploadAttendanceFile: uploadCSVFileHeaderFormatter,
    uploadOptInFile: uploadCSVFileHeaderFormatter,
    markMemberAttendance: markMemberAPIHeaderFormatter,
    markMemberOptStatus: markMemberAPIHeaderFormatter,
    markMemberIdCardStatus: markMemberAPIHeaderFormatter,
  },
  request: {
    updateMember: formatUpdateMemberDataPayload,
    uploadAttendanceFile: uploadAttendanceFileRequestFormatter,
    uploadOptInFile: uploadOptInFileRequestFormatter,
    markMemberOptStatus: markMemberOptStatusRequestFormatter,
    markMemberIdCardStatus: markMemberIdCardStatusRequestFormatter,
  },
  response: {
  },
};
