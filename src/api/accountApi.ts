import { BaseResponse } from '../models';
import { Login, LoginRes, Register } from '../models/auth';
import axiosClient from './axiosClient';

const account = {
  login(param: Login): Promise<BaseResponse<LoginRes>> {
    const url = 'admin/login';
    return axiosClient.post(url, {
      username: param.username,
      password: param.password,
    });
  },
};

export default account;
