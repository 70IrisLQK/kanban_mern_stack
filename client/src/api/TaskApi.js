import axiosClient from './AxiosClient';

const taskApi = {
  create: (boardId, params) =>
    axiosClient.post(`board/${boardId}/task`, params),
  updatePosition: (boardId, params) =>
    axiosClient.put(`board/${boardId}/task/update-position`, params),
  delete: (boardId, taskId) =>
    axiosClient.delete(`board/${boardId}/task/${taskId}`),
  update: (boardId, taskId, params) =>
    axiosClient.put(`board/${boardId}/task/${taskId}`, params),
};

export default taskApi;
