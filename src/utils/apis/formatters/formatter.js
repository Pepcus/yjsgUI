import { TENANT } from 'constants/yjsg';
import defaultTenant from './default';
import yjsgBhopal from './YJSG-Bhopal';
import yjsgIndore from './YJSG-Indore';

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
