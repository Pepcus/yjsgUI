export const headerParamsFormatter = (headers, additionalData) => {
  const { secretKey } = additionalData;
  return ({
    ...headers,
    secretKey,
  });
};
