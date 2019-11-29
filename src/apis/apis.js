import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';

import {
  headerFormatters,
  requestFormatters,
  responseFormatters,
} from 'utils/apis/formatters';
import { stringReplace } from 'utils/common/string';
import * as HTTP from 'apis/http';

const getMembers = ({ secretKey }) => new Promise((resolve, reject) => {
  const members = [
    {
      'id': '1',
      'conferenceRoom': '001',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 1',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '2',
      'conferenceRoom': '002',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 2',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '3',
      'conferenceRoom': '003',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 3',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '4',
      'conferenceRoom': '004',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 4',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '5',
      'conferenceRoom': '005',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 5',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '6',
      'conferenceRoom': '006',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 6',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '7',
      'conferenceRoom': '003',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 7',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '8',
      'conferenceRoom': '007',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 8',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
    {
      'id': '9',
      'conferenceRoom': '008',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 9',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
  ];
  if (secretKey === '451727') {
    resolve(members);
  } else if (secretKey !== '451727') {
    resolve({
      error: 'UNAUTHORIZED',
      message: 'Unauthorized to access the service',
      status: 401,
      url: `/v1/students/${id}`,
    });
  } reject();
});
const getMember = ({ id, secretKey }) => new Promise((resolve, reject) => {
  const response = {
    code: '200',
    status: 'OK',
    student: {
      'id': '1',
      'conferenceRoom': '001',
      'description': 'def',
      'duration': {
        'endTime': '2019-11-23T08:30:00.000Z',
        'startTime': '2019-11-22T06:30:00.000Z',
      },
      'meetingTitle': 'Meeting 1',
      'organizer': 'ghi',
      'secretCode': '1234',
      'participants': ['abc', 'def', 'ghi', 'jkl'],
    },
  };
  if (secretKey === '451727') {
    resolve(response);
  } else if (secretKey !== '451727') {
    resolve({
      error: 'UNAUTHORIZED',
      message: 'Unauthorized to access the service',
      status: 401,
      url: `/v1/students/${id}`,
    });
  } reject();
});

// THE MAIN CALLER
export const callAPIWithConfig = (tenant, api, config) => {
  if (api === 'getMember') {
    const { urlValuesMap, additionalData } = config;
    const { id } = urlValuesMap;
    const { secretKey } = additionalData;
    return getMember({ id, secretKey });
  }
  if (api === 'getMembers') {
    const { additionalData } = config;
    const { secretKey } = additionalData;
    return getMembers({ secretKey });
  }
  if (api === 'updateMember') {
    return (
      { code: '200',
        message: 'Student successfully updated',
        status: 'OK',
        student: {
          'id': '1',
          'conferenceRoom': '001',
          'description': 'def',
          'duration': {
            'endTime': '2019-11-23T08:30:00.000Z',
            'startTime': '2019-11-22T06:30:00.000Z',
          },
          'meetingTitle': 'Meeting 1',
          'organizer': 'ghi',
          'secretCode': '1234',
          'participants': ['abc', 'def', 'ghi', 'jkl'],
        } });
  }
  if (api === 'createMember') {
    return (
      { code: '200',
        message: 'Student successfully created',
        status: 'OK',
        student: {
          'id': '1',
          'conferenceRoom': '001',
          'description': 'def',
          'duration': {
            'endTime': '2019-11-23T08:30:00.000Z',
            'startTime': '2019-11-22T06:30:00.000Z',
          },
          'meetingTitle': 'Meeting 1',
          'organizer': 'ghi',
          'secretCode': '1234',
          'participants': ['abc', 'def', 'ghi', 'jkl'],
        } });
  }
};
/* export const callAPIWithConfig = (tenant, api, config) => {
  const { baseUrl = '', method, params, urlValuesMap, additionalData, responseType = null } = config;
  let { data, headers, url } = config;

  const headerFormatter = headerFormatters[tenant][api];
  const requestFormatter = requestFormatters[tenant][api];
  const responseFormatter = responseFormatters[tenant][api];

  if (typeof headerFormatter === 'function') {
    headers = headerFormatter(headers, additionalData);
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
    responseType,
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
};*/
