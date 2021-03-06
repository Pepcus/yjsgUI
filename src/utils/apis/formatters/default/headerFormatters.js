export const defaultHeaderFormatter = (headers, additionalData) => {
  const { secretKey } = additionalData;
  return ({
    ...headers,
    secretKey,
  });
};

export const uploadCSVFileHeaderFormatter = (headers, additionalData) => {
  const { secretKey } = additionalData;
  return ({
    secretKey,
  });
};
