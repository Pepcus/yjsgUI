import 'whatwg-fetch';
/**
 *
 * @param {String} url
 * @param secretKey
 * @return {Promise} response
 */
export const GET = ({ url, headers, responseType = null }) => {

  const config = {
    url,
    method: 'GET',
    headers: headers || {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    responseType,
  };

  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        if (config.responseType) {

          const clone = response.clone();

          if (config.responseType === 'arrayBuffer') {
            return clone.ok ? clone.arrayBuffer() : Promise.reject(clone.status);

          } else if (config.responseType === 'text') {
            return clone.ok ? clone.text() : Promise.reject(clone.status);
          }

        } else {
          resolve(response.json());
        }
      },
      (error) => {
        reject(error);
      }).then(
      data => resolve(data),
      error => reject(error),
    );
  });
};


export const POST = ({ url, body }) => {

  const config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default',
  };

  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};


export const PUT = ({ url, headers, body }) => {

  const config = {
    method: 'PUT',
    headers: headers || {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors',
    cache: 'default',
  };

  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};

export const PATCH = ({ url, headers, body }) => {

  const config = {
    method: 'PATCH',
    headers: headers || {
    },
    body,
    mode: 'cors',
    cache: 'default',
  };

  return new Promise((resolve, reject) => {
    fetch(url, config).then(
      (response) => {
        resolve(response.json());
      },
      (error) => {
        reject(error);
      });
  });
};

/**
 * This method returns the request parameters of the URL
 * @param {String}name
 * @param {String}url
 * @return {String}decodeURIComponent
 */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;

  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
