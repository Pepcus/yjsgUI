import { headerParamsFormatter } from './headerFormatters';
import {
  formatCreateMemberDataPayload,
  formatUpdateMemberDataPayload,
} from './requestFormatters';

export const yjsgBhopal = {
  header: {
    updateMember: headerParamsFormatter,
  },
  request: {
    createMember: formatCreateMemberDataPayload,
    updateMember: formatUpdateMemberDataPayload,
  },
  response: {
    createMember: response => response,
    updateMember: response => response,
  },
};
