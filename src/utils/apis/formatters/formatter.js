import { TENANT } from 'constants/yjsg';
import defaultTenant from './default';
import yjsgBhopal from './YJSG-Bhopal';
import yjsgIndore from './YJSG-Indore';
import gms from './GMS';

export const headerFormatters = {
  [TENANT.DEFAULT]: { ...defaultTenant.header },
  [TENANT.INDORE]: { ...yjsgIndore.header },
  [TENANT.BHOPAL]: { ...yjsgBhopal.header },
  [TENANT.GMS]: { ...gms.header },
};

export const requestFormatters = {
  [TENANT.DEFAULT]: { ...defaultTenant.request },
  [TENANT.INDORE]: { ...yjsgIndore.request },
  [TENANT.BHOPAL]: { ...yjsgBhopal.request },
  [TENANT.GMS]: { ...gms.request },
};

export const responseFormatters = {
  [TENANT.DEFAULT]: { ...defaultTenant.response },
  [TENANT.INDORE]: { ...yjsgIndore.response },
  [TENANT.BHOPAL]: { ...yjsgBhopal.response },
  [TENANT.GMS]: { ...gms.response },
};
