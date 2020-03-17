import isEmpty from 'lodash/isEmpty';

export const formatMembersData = (response = {}) => {
  const { students = [] } = response;
  if (!isEmpty(response.students)) {
    return students.map((student = {}) => {
      return {
        ...student,
        classAttended2020: (student.classAttended2020 && student.classAttended2020.trim()) ? student.classAttended2020 : 'Level 1',
        marks2020: (student.marks2020 && student.marks2020.trim()) ? student.marks2020 : '',
      }
    });
  }
  return response;
};

export const formatMemberData = (response = {}) => {
  const { student = {} } = response;
  if (!isEmpty(student)) {
    return {
      ...response,
      student: {
        ...student,
        classAttended2020: (student.classAttended2020 && student.classAttended2020.trim()) ? student.classAttended2020 : 'Level 1',
        marks2020: (student.marks2020 && student.marks2020.trim()) ? student.marks2020 : '',
      },
    }
  }
  return response;
};

export const fetchUserFromPhoneFormatter = (data) => {
  return data.map((user) => {
    if (user.age) {
      return {
        ...user,
        age: String(user.age),
      };
    }
    return user;
  });
};
