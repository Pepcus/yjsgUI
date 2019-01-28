import { PUT, POST, GET } from '../utils/http';
import {
  formatUpdateStudentDataPayload,
  formatCreateStudentDataPayload,
} from '../utils/apiUtils';

export const updateStudent = (id, secretKey, updatedStudent) => {
  return(PUT({
    url: `/v1/students/${id}`,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'secretKey': secretKey,
    },
    body: formatUpdateStudentDataPayload(updatedStudent),
  }));
};
export const createStudent = (student) =>
  POST({
    url: `/v1/students`,
    body: formatCreateStudentDataPayload(student),
  });

export const fetchStudent = (id, secretKey) =>
  GET({
    url: `/v1/students/${id}`,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'secretKey': secretKey,
    },
  });

export const searchStudent = (adminKey, searchKey, searchValue) =>
  GET({
    url: `/v1/students?${searchKey}=${searchValue}`,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'secretKey': adminKey,
    },
  });

export const getAllStudentsAPI = (secretKey) =>
  GET({
    url: `/v1/students`,
    headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'secretKey': secretKey,
    },
  });
