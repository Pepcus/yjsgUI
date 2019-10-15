export const loginAdmin = ({ adminId, adminPassword }) => new Promise((resolve, reject) => {
  if (adminId === 'yjsgadmin' && adminPassword === '451727') {
    resolve();
  } else {
    reject();
  }
});
