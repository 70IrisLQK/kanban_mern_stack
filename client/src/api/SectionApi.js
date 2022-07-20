import axiosClient from './AxiosClient';

const sectionApi = {
  create: (boardId) => axiosClient.post(`board/${boardId}/section`),
  updateSection: (boardId, sectionId, params) =>
    axiosClient.put(`board/${boardId}/section/${sectionId}`, params),
  deleteSection: (boardId, sectionId, params) =>
    axiosClient.delete(`board/${boardId}/section/${sectionId}`),
};

export default sectionApi;
