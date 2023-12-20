import { BaseResponse } from '../models/common';
import axiosClient from './axiosClient';
import { User } from '../models';

const userApi = {
  searchUser(params: any): Promise<BaseResponse<User>> {
    const url = 'admin/users/search';
    return axiosClient.post(url, { ...params });
  },
  resetPassword(id: string): Promise<BaseResponse<User>> {
    const url = `admin/users/${id}/reset-password`;
    return axiosClient.patch(url);
  },
  activeUser(id: string): Promise<BaseResponse<User>> {
    const url = `admin/users/${id}/active`;
    return axiosClient.patch(url);
  },
  disableUser(id: string): Promise<BaseResponse<User>> {
    const url = `admin/users/${id}/disable`;
    return axiosClient.patch(url);
  },
};

export default userApi;
