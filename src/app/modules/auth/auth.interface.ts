export interface IAuth {
  id: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken?: string;
}
