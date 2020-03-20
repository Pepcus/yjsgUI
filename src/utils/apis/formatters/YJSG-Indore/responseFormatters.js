import isEmpty from 'lodash/isEmpty';

export const formatMembersData = (response = {}) => {
  const { students = [] } = response;
  if (!isEmpty(students)) {
    return students;
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
