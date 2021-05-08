import { isEmpty } from 'pepcus-core';

export const formatUpdateMemberDataPayload = (updatedMember) => {
  const {
    address,
    age,
    // busStop,
    education = '',
    email = '',
    mobile,
    fatherName,
    gender,
    name,
    occupation = '',
    optIn2020,
    marks2020,
    busNumber,
    classRoomNo2020,
    classAttended2019 = '',
    classAttended2020,
    secretKey,
    remark = '',
  } = updatedMember;

  const newData = {
    address,
    age,
    // busStop,
    education,
    email,
    mobile,
    fatherName,
    gender,
    name,
    occupation,
    optIn2020,
    marks2020,
    busNumber,
    classRoomNo2020,
    classAttended2019,
    classAttended2020,
    secretKey,
    remark,
  };

  return {
    ...newData,
  };
};

export const uploadAttendanceFileRequestFormatter = (data) => {
  const { attendanceFile, day } = data;
  const file = new window.FormData();
  file.append('file', attendanceFile);
  file.append('day', day);
  return file;
};

export const uploadOptInFileRequestFormatter = (data) => {
  const file = new window.FormData();
  file.append('file', data);
  return file;
};

export const markMemberOptStatusRequestFormatter = data => JSON.stringify(data);

export const markMemberIdCardStatusRequestFormatter = data => JSON.stringify(data);

export const updateCoordinatorRequestFormatter = (formData = {}) => {
  const {
    interestedDepartments = [],
    assignedDepartments = [],
    remarks,
    email,
    alternateNumber,
  } = formData;
  const formattedInterestedDepartments = [];
  const formattedAssignedDepartments = [];
  const getFormattedDepartmentValues = (departmentValues = []) => {
    return departmentValues.map(departmentValue => ({
      id: departmentValue.value,
    }))
  };
  if (interestedDepartments && interestedDepartments.length) {
    interestedDepartments.forEach(element => {
      if (element.value) {
        formattedInterestedDepartments.push({
          id: element.value,
        })
      }
    });
  }

  if (assignedDepartments && assignedDepartments.length) {
    assignedDepartments.forEach(element => {
      if (element.departmentType) {
        formattedAssignedDepartments.push({
          id: element.departmentType,
          departmentValues: !isEmpty(element.departmentValue) ? getFormattedDepartmentValues(element.departmentValue) : undefined,
        })
      }
    })
  }

  return {
    ...formData,
    interestedDepartments: formattedInterestedDepartments,
    assignedDepartments: formattedAssignedDepartments,
    remarks: remarks ? remarks : '',
    email: email ? email : '',
    alternateNumber: alternateNumber ? alternateNumber : '',
  }
};

