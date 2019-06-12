/**
 * formatUpdateStudentDataPayload method use as payload for update student data
 * @param {Object} updatedStudent
 * @return {{fatherName: *,
 * address: *,
 * education: *,
 * occupation: *,
 * gender: *,
 * secretKey: *,
 * busStop: *,
 * optIn2019: *,
 * mobile: *,
 * remark: *,
 * busNumber: *,
 * marks2019: *,
 * classAttended2017: *,
 * classAttended2019: *,
 * name: *,
 * classRoomNo2019: *,
 * age: *,
 * email: *}}
 */
export const formatUpdateStudentDataPayload = (updatedStudent) => {
  const {
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
    optIn2019,
    marks2019,
    busNumber,
    classRoomNo2019,
    classAttended2019,
    secretKey,
    remark,
  } = updatedStudent;

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
    optIn2019,
    marks2019,
    busNumber,
    classRoomNo2019,
    classAttended2019,
    secretKey,
    remark,
  };

  return {
    ...newData,
  };
};

/**
 * formatCreateStudentDataPayload method use as payload for creat student
 * @param {Object} student
 * @return {Object} student
 */
export const formatCreateStudentDataPayload = student => ({
  ...student,
});

