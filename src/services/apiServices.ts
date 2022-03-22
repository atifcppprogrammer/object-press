import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const token = localStorage?.getItem('op-access-token');

const apiMulti = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'content-type': 'multipart/form-data',
  },
});

export const addNewImage = async (formData: any) => {
  return await apiMulti.put(`/uploads`, formData);
};
