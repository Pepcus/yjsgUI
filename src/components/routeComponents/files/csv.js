import csv from 'csvtojson';

export const csvFileToJson = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const csvText = event.target.result;
    csv().fromString(csvText).then((csvRow) => {
      resolve(csvRow);
    },
    (error) => {
      reject(error);
    });
  };
  reader.readAsText(file);
});
