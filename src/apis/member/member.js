import * as HTTP from 'apis/http';
import {
  formatUpdateMemberDataPayload,
  formatCreateMemberDataPayload,
} from 'utils/apis';

const { PUT, POST, GET, PATCH } = HTTP;

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

export const fetchMembers = secretKey =>
  GET({
    url: '/v1/students',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      secretKey,
    },
  });

export const uploadAttendance = (secretKey, attendanceFile, day) => {
  const file = new window.FormData();
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

export const uploadOptIn = (secretKey, optInFile) => {
  const file = new window.FormData();
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

export const markMemberAttendance = ({ secretKey, selectedMembersId, day }) =>
  PUT({
    url: `v1/students/attendance?id=${selectedMembersId}`,
    headers: {
      'Content-type': 'application/json',
      secretKey,
    },
    body: day,
  });

export const markMemberOptStatus = (secretKey, selectedMembersId, opt) =>
  PATCH({
    url: `v1/students/optin?id=${selectedMembersId}`,
    headers: {
      'Content-type': 'application/json',
      secretKey,
    },
    body: JSON.stringify(opt),
  });

export const updateMemberIdCardStatus = ({ secretKey, selectedMembersId, IdCardStatus }) =>
  PATCH({
    url: `v1/students/reprint?id=${selectedMembersId}`,
    headers: {
      'Content-type': 'application/json',
      secretKey,
    },
    body: JSON.stringify(IdCardStatus),
  });

export const registerParent = (name, members, phoneNumber) =>
  POST({
    url: '/v1/events',
    body: {
      name,
      members,
      phoneNumber,
    },
  });
