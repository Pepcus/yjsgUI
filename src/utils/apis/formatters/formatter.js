import { TENANT } from 'constants/yjsg';
import { defaultTenant } from './default/index';
import { yjsgBhopal } from './YJSG-Bhopal/index';
import { yjsgIndore } from './YJSG-Indore/index';

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
