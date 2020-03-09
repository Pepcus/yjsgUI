export const formatMembersData = response => response.students;

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
