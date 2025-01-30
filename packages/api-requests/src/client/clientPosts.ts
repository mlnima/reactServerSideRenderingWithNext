import AxiosInstance from '../lib/AxiosInstance';

export const clientDeletePostByAuthor = async (_id: string) => {
  return await AxiosInstance.delete(`/api/v1/post`, {
    params: {
      _id,
    },
  });
};

export const updatePost = async (formData: FormData) => {
  return await AxiosInstance.put(`/api/v1/post`, formData);
};
