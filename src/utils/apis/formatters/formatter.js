import { TENANT } from 'constants/yjsg';
import { formatCreateMemberDataPayload } from 'utils/apis/apiUtils';

const defaultTenant = {
  header: {},
  request: {
    createMember: formatCreateMemberDataPayload,
  },
  response: {
    createMember: response => response,
  },
};

const yjsgIndore = {
  header: {},
  request: {
    createMember: payload => payload,
  },
  response: {
    createMember: response => response,
  },
};

const yjsgBhopal = {
  header: {},
  request: {
    createMember: payload => payload,
  },
  response: {
    createMember: response => response,
  },
};

export const headerFormatters = {
  [TENANT.DEFAULT]: { ...defaultTenant.header },
  [TENANT.INDORE]: { ...yjsgIndore.header },
  [TENANT.BHOPAL]: { ...yjsgBhopal.header },
};

export const requestFormatters = {
  [TENANT.DEFAULT]: { ...defaultTenant.request },
  [TENANT.INDORE]: { ...yjsgIndore.request },
  [TENANT.BHOPAL]: { ...yjsgBhopal.request },
};

export const responseFormatters = {
  [TENANT.DEFAULT]: { ...defaultTenant.response },
  [TENANT.INDORE]: { ...yjsgIndore.response },
  [TENANT.BHOPAL]: { ...yjsgBhopal.response },
};
