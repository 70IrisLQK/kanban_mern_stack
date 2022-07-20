import axiosClient from './AxiosClient';

const authApi = {
  register: (params) => axiosClient.post('register', params),
  login: (params) => axiosClient.post('login', params),
  verifyToken: () => axiosClient.post('verify-token'),
};

export default authApi;
