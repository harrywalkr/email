export interface IAuthUser {
  userId: string;
  username: string;
}

export interface IAuthRequest {
  user: IAuthUser;
}
