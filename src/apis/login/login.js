export const loginAdmin = ({ adminId, adminPassword, preStoredAdminCredentials }) => new Promise((resolve, reject) => {
  if (adminId === 'yjsgadmin' && adminPassword.toString() === preStoredAdminCredentials.toString()) {
    resolve();
  } else {
    reject();
  }
});
