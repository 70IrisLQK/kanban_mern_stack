import axiosClient from './AxiosClient';

const boardApi = {
  create: () => axiosClient.post('board'),
  getAllBoard: () => axiosClient.get('boards'),
  updatePosition: (params) => axiosClient.put('board', params),
  getOne: (id) => axiosClient.get(`board/${id}`),
  updateBoard: (id, params) => axiosClient.put(`board/${id}`, params),
  deleteBoard: (id) => axiosClient.delete(`board/${id}`),
  getFavorite: () => axiosClient.get('favorites'),
};

export default boardApi;
