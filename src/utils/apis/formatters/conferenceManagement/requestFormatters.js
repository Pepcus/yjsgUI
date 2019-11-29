export const formatUpdateMemberDataPayload = (updatedMember) => {
  const {
    meetingTitle,
    description,
    conferenceRoom,
    date,
    duration,
    secretCode,
    organizer,
    members,
  } = updatedMember;

  const newData = {
    meetingTitle,
    description,
    conferenceRoom,
    date,
    duration,
    secretCode,
    organizer,
    members,
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
