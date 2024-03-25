import { ConfigUser } from './user-config';

export interface ConfigPagination {
  users: ConfigUser[];
  page: number;
  resultsPerPage: number;
}
