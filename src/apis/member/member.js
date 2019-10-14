import { PUT, POST, GET, PATCH } from 'apis/http';
import {
  formatUpdateMemberDataPayload,
  formatCreateMemberDataPayload,
} from 'utils/apis';

export const updateMember = ({ id, secretKey, member }) =>
  PUT({
    url: `/v1/students/${id}`,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      secretKey,
    },
    body: formatUpdateMemberDataPayload(member),
  });
export const createMember = member =>
  POST({
    url: '/v1/students',
    body: formatCreateMemberDataPayload(member),
  });

export const fetchMember = (id, secretKey) =>
  GET({
    url: `/v1/students/${id}`,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      secretKey,
    },
  });

export const getAllMembersAPI = secretKey =>
  GET({
    url: '/v1/students',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      secretKey,
    },
  });

export const uploadAttendanceAPI = (secretKey, attendanceFile, day) => {
  const file = new FormData();
  file.append('file', attendanceFile);
  file.append('day', day);
  return (
    PATCH({
      url: 'v1/students/bulk-attendance',
      headers: {
        secretKey,
      },
      body: file,
    }));
};

export const uploadOptInAPI = (secretKey, optInFile) => {
  const file = new FormData();
  file.append('file', optInFile);
  return (
    PATCH({
      url: 'v1/students/bulk-optin',
      headers: {
        secretKey,
      },
      body: file,
    }));
};

export const markSelectedMembersAttendanceAPI = ({ secretKey, selectedMembersId, day }) =>
  PUT({
    url: `v1/students/attendance?id=${selectedMembersId}`,
    headers: {
      'Content-type': 'application/json',
      secretKey,
    },
    body: day,
  });

export const markSelectedMembersOptInOrOptOutAPI = (secretKey, selectedMembersId, opt) =>
  PATCH({
    url: `v1/students/optin?id=${selectedMembersId}`,
    headers: {
      'Content-type': 'application/json',
      secretKey,
    },
    body: JSON.stringify(opt),
  });

export const updateIdCardStatusSelectedMembersAPI = ({ secretKey, selectedMembersId, IdCardStatus }) =>
  PATCH({
    url: `v1/students/reprint?id=${selectedMembersId}`,
    headers: {
      'Content-type': 'application/json',
      secretKey,
    },
    body: JSON.stringify(IdCardStatus),
  });

export const parentsRegistrationAPI = (name, members, phoneNumber) =>
  POST({
    url: '/v1/events',
    body: {
      name,
      members,
      phoneNumber,
    },
  });
