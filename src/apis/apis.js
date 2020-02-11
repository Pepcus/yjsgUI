import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';

import {
  headerFormatters,
  requestFormatters,
  responseFormatters,
} from 'utils/apis/formatters';
import { stringReplace } from 'utils/common/string';
import * as HTTP from 'apis/http';

// THE MAIN CALLER
export const callAPIWithConfig = (tenant, api, config) => {
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

    if (method.toUpperCase() === 'PUT') {
      return response;
    }
    if (typeof responseFormatter === 'function') {
      formattedResponse = responseFormatter(formattedResponse);
    }

    return formattedResponse;
  }).catch((error) => {
    console.error(`Error occurred while executing the '${api}' API - `, error);
    throw error;
  });
};
