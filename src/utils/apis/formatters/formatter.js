import { TENANT } from 'constants/yjsg';
import defaultTenant from './default';
import yjsgBhopal from './YJSG-Bhopal';
import yjsgIndore from './YJSG-Indore';
import conferenceManagement from './conferenceManagement';

export const headerFormatters = {
  [TENANT.CONFERENCE_MANAGEMENT]: { ...conferenceManagement.header },
  [TENANT.DEFAULT]: { ...defaultTenant.header },
  [TENANT.INDORE]: { ...yjsgIndore.header },
  [TENANT.BHOPAL]: { ...yjsgBhopal.header },
};

export const requestFormatters = {
  [TENANT.CONFERENCE_MANAGEMENT]: { ...conferenceManagement.request },
  [TENANT.DEFAULT]: { ...defaultTenant.request },
  [TENANT.INDORE]: { ...yjsgIndore.request },
  [TENANT.BHOPAL]: { ...yjsgBhopal.request },
};

export const responseFormatters = {
  [TENANT.CONFERENCE_MANAGEMENT]: { ...conferenceManagement.response },
  [TENANT.DEFAULT]: { ...defaultTenant.response },
  [TENANT.INDORE]: { ...yjsgIndore.response },
  [TENANT.BHOPAL]: { ...yjsgBhopal.response },
};
