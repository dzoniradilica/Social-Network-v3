export interface ConfigUser {
  id: string;
  email: string;
  password: string | number;
  username: string;
}

export interface UsersState {
  [prop: string]: ConfigUser[];
}
