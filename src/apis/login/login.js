export const loginAdmin = ({ adminId, adminPassword }) => new Promise((resolve, reject) => {
  if (adminId === 'yjsgadmin' && adminPassword === '123456') {
    resolve();
  } else {
    reject();
  }
});
