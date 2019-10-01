/* eslint-disable no-useless-escape,security/detect-unsafe-regex */
import isEmpty from 'lodash/isEmpty';
import extend from 'lodash/extend';
import cloneDeep from 'lodash/cloneDeep';

import {
  USER_TYPES,
} from 'constants/yjsg';

const {
  MEMBER_WITH_URL,
  MEMBER,
} = USER_TYPES;

/**
 * checkLevelValue method check level value and return it into number type
 * @param {String} value
 * @return {number}
 */
export const checkLevelValue = (value) => {
  const level = value ? value.slice(6, 8) : -1;
  return (Number(level));
};

/**
 * updateStudentDataAccordingClassAttended2018Level method manipulate the student data
 * according to classAttended level value of previous year.
 * @param {Object} memberData
 * @return {Object} studentData
 */
export const updateClassAttended2019InMemberData = (memberData) => {

  const { classAttended2018, classAttended2019 } = memberData;

  if (classAttended2019) {
    return memberData;
  }

  const lastCourse = classAttended2018;
  const level = checkLevelValue(lastCourse);

  /* In classAttended2018 Level is greater than 0 (level > 0) condition will satisfied.*/
  if (level > 0) {
    // In classAttended2018 Level is greater than 7 like 'Level 8'
    // in that condition will pre populate
    // the value of classAttended2019 is 'Level 8'.
    if (level > 7) {
      return extend(cloneDeep(memberData), { classAttended2019: 'Level 8' });
    }
    // In classAttended2018 Level is greater than 0 and less than 8 in that condition
    // pre populate value of classAttended2019 will be classAttended2018 incremented by 1.
    return extend(cloneDeep(memberData), { classAttended2019: `Level ${level + 1}` });

  } else if (!isEmpty(lastCourse)) {
    // If classAttended2018 value is anything else then Level classAttended2019 will be Level 1.
    return extend(cloneDeep(memberData), { classAttended2019: 'Level 1' });
  }

  return memberData;
};

export const getRegisteredMemberData = ({ memberData }) => {
  // get student data from session if present
  const memberDataFromSession = JSON.parse(sessionStorage.getItem('studentData'));
  return !isEmpty(memberData) ? memberData : memberDataFromSession;
};

export const isUserMember = ({ user }) => user === MEMBER_WITH_URL || user === MEMBER;
