export const formatUpdateMemberDataPayload = (updatedMember) => {
  const {
    address,
    age,
    busStop,
    classAttended2017,
    education = '',
    email = '',
    mobile,
    fatherName,
    gender,
    name,
    occupation = '',
    optIn2020,
    marks2019,
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
    busStop,
    classAttended2017,
    education,
    email,
    mobile,
    fatherName,
    gender,
    name,
    occupation,
    optIn2020,
    marks2019,
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
