import { apiMulti } from './axiosServices';

export const addNewImage = async (formData: any) => {
  return await apiMulti.put(`/uploads`, formData);
};
