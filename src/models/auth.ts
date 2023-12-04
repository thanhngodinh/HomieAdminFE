import { User } from './user';

export interface Login {
  username: string;
  password: string;
}

export interface LoginRes {
  isResetPass: boolean;
  token: string;
  profile: User;
}

export interface Register {
  username: string;
  phone: string;
  name: string;
}
