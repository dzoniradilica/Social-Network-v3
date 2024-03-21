import { ConfigUser } from './user-config';

export interface ConfigMessages {
  content: string;
  author: ConfigUser;
  recivedUser: ConfigUser;
}
