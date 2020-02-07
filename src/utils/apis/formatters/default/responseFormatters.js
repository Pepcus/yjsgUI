export const formatMembersData = members => members.map(item => ({
  id: String(item.member_id),
  firstName: String(item.member_firstName),
  lastName: String(item.member_lastName),
  company: String(item.member_company),
  employed: String(item.member_employed),
}));
