import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';

import * as HTTP from 'apis/http';
import {
  formatUpdateMemberDataPayload,
  formatCreateMemberDataPayload,
} from 'utils/apis';

import { headerFormatters, requestFormatters, responseFormatters } from 'utils/apis/formatterUtils';
import { stringReplace } from 'utils/common/string';

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


// THE MAIN CALLER
export const callMemberAPI = (tenant, api, config) => {
  const { baseUrl = '', method, params, urlValuesMap } = config;
  let { data, headers, url } = config;

  const headerFormatter = headerFormatters[tenant][api];
  const requestFormatter = requestFormatters[tenant][api];
  const responseFormatter = responseFormatters[tenant][api];

  if (typeof headerFormatter === 'function') {
    headers = headerFormatter(headers);
  }

  if (typeof requestFormatter === 'function') {
    data = requestFormatter(data);
  }

  if (!_isEmpty(urlValuesMap)) {
    url = stringReplace(url, urlValuesMap);
  }

  return HTTP[method]({
    url: `${baseUrl}/${url}`,
    headers,
    body: data,
    params,
  }).then((response) => {
    let formattedResponse = _cloneDeep(response);
    if (typeof responseFormatter === 'function') {
      formattedResponse = responseFormatter(formattedResponse);
    }

    return formattedResponse;
  }).catch((error) => {
    console.error(`Error occurred while executing the '${api}' API - `, error);
    throw error;
  });
};
