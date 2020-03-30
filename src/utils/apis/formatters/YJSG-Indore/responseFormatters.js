import isEmpty from 'lodash/isEmpty';

export const formatMembersData = (response = {}) => {
  const { students = [] } = response;
  if (!isEmpty(students)) {
    return students;
  }
  return response;
};

export const updateCoordinatorResponseFormatter = (formData = {}) => {
  const { interestedDepartments = [], assignedDepartments = [] } = formData;
  const formattedInterestedDepartments = [];
  const formattedAssignedDepartments = [];

  const getDepartmentValues = (departmentValues = []) => {
    return departmentValues.map(departmentValue => ({
      label: departmentValue.displayName,
      value: departmentValue.id,
    }))
  };

  if (interestedDepartments && interestedDepartments.length) {
    interestedDepartments.forEach(element => {
      formattedInterestedDepartments.push({
          label: element.displayName,
          value: element.id,
      })
    });
  }
  if (assignedDepartments && assignedDepartments.length) {
    assignedDepartments.forEach(element => {
      formattedAssignedDepartments.push({
        departmentType: element.id,
        departmentValue: element.departmentValues ? getDepartmentValues(element.departmentValues) : undefined,
      })
    });
  }
  return {
    ...formData,
    interestedDepartments: formattedInterestedDepartments,
    assignedDepartments: formattedAssignedDepartments,
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
