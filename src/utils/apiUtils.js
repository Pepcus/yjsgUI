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
    motherMobile,
    name,
    occupation,
    optIn2018,
    course2018,
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
    motherMobile,
    name,
    occupation,
    optIn2018,
    course2018,
    secretKey,
    remark,
  };

  return {
    ...newData
  };
};

export const formatCreateStudentDataPayload = student => {
  return {
    ...student
  };
};



