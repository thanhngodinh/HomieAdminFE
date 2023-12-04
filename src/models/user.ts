export interface User {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  gender?: string;
  phone?: string;
  isVerifiedEmail?: boolean;
  isVerifiedPhone?: boolean;
  isFindRoommate?: boolean;
  dateOfBirth?: string;
  province?: string;
  district?: string[];
  costFrom?: number;
  costTo?: number;
}

export interface VerifyPhoneReq {
  phone: string;
}

export interface VerifyOTPReq {
  otp: string;
}

export interface ResetUser {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
