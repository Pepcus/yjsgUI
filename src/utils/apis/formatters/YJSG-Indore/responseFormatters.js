export const formatMembersData = response => {
  return response.students.map((student) => {
    return {
      ...student,
      classAttended2020: (student.classAttended2020 && student.classAttended2020.trim()) ? student.classAttended2020 : 'Level 1',
    }
  });
};

export const formatMemberData = response => {
  const { student } = response;
  return {
    ...response,
    student: {
      ...student,
      classAttended2020: (student.classAttended2020 && student.classAttended2020.trim()) ? student.classAttended2020 : 'Level 1',
    },
  }

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
