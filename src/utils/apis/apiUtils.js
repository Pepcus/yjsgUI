export const formatUpdateMemberDataPayload = (updatedMember) => {
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
    classAttended2020,
    secretKey,
    remark,
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
    optIn2019,
    marks2019,
    busNumber,
    classRoomNo2019,
    classAttended2020,
    secretKey,
    remark,
  };

  return {
    ...newData,
  };
};

export const formatCreateMemberDataPayload = member => ({
  ...member,
});

