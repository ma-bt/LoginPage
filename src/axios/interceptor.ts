import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const instance = axios.create({
  baseURL: 'https://api.escuelajs.co/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    toast.error(`Sorry ! ${error?.response?.data?.message}`);
  }
);

export default instance;

export const postData = async (path, data) => {
  const x = await instance.post(path, data);
  return x?.data;
};

export const updateData = async (path, data) => {
  const x = await instance.put(path, data);
  return x?.data;
};

export const getData = async (path) => {
  const x = await instance.get(path);
  return x?.data;
};
