import { ConfigUser } from './user-config';

export interface ConfigMessages {
  content: string;
  author: ConfigUser;
  recived_user: ConfigUser;
}
