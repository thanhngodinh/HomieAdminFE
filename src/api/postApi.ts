import { Post, Utilities } from 'src/models';
import { BaseResponse } from '../models/common';
import axiosClient from './axiosClient';

const postApi = {
  searchPost(params: any): Promise<BaseResponse<Post>> {
    const url = '/admin/posts/search';
    return axiosClient.post(url, { ...params });
  },
  getPostById(id: string): Promise<BaseResponse<Post>> {
    const url = `/admin/posts/${id}`;
    return axiosClient.get(url);
  },
  verifyPost(id: string): Promise<BaseResponse<Post>> {
    const url = `/admin/posts/${id}/verify`;
    return axiosClient.patch(url);
  },
  disablePost(id: string): Promise<BaseResponse<Post>> {
    const url = `/admin/posts/${id}/disable`;
    return axiosClient.patch(url);
  },
  activePost(id: string): Promise<BaseResponse<Post>> {
    const url = `/admin/posts/${id}/active`;
    return axiosClient.patch(url);
  },

  getUtilities(): Promise<BaseResponse<Utilities[]>> {
    const url = '/utilities';
    return axiosClient.get(url);
  },
};

export default postApi;
