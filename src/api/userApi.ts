import { BaseResponse } from '../models/common';
import axiosClient from './axiosClient';
import { User } from '../models';

const userApi = {
  searchUser(params: any): Promise<BaseResponse<User>> {
    const url = '/users/search';
    return axiosClient.post(url, { ...params });
  },
};

export default userApi;
