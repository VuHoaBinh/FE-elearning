export interface ILogin {
  email: string;
  password: string;
  keepLogin?: boolean;
}

export interface IRegister {
  email: string;
  password: string;
  verifyCode: string;
  fullName: string;
  birthday?: string;
  gender?: string;
  phone?: string;
}

export interface IForgotPassword {
  email: string;
  password: string;
  verifyCode: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  password: string;
  passwordConfirm?: string;
}

export interface IAccount {
  id: string;
  email: string;
  password: string;
  role: "student" | "admin" | "teacher";
  refreshToken: string;
  accessToken: string;
  isActive: boolean;
}
