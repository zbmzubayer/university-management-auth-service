export interface IAuth {
  id: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken?: string;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
