export const meetingDataFormatter = ({ members }) => members.map((item) => {
  const { duration, participants } = item;
  let allParticipants = '';
  participants.forEach((participant) => {
    allParticipants = allParticipants.concat(participant, ',');
  });
  delete item.duration;
  delete item.participants;
  return ({ ...item, startTime: duration.startTime, endTime: duration.endTime, participants: allParticipants });
},
);
