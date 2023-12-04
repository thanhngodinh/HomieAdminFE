import { BaseResponse } from '../models/common';
import axiosClient from './axiosClient';

const postApi = {
  searchPost(params: any): Promise<BaseResponse<any>> {
    const url = '/admin/posts/search';
    return axiosClient.post(url, { ...params });
  },
};

export default postApi;
