import { user } from './User.js';
// import { ConfigPagination } from '../configs/pagination-config.js';

export const paginationState: any = {
  users: [],
  page: 1,
  resultsPerPage: 4,
};

class Pagination {
  async paginationResults(page = paginationState.page) {
    paginationState.page = page;

    const allUsers: object[] = await user.getAll();

    allUsers.forEach(singleUser => {
      paginationState.users.push(singleUser);
    });

    const start = (page - 1) * paginationState.resultsPerPage;
    const end = page * paginationState.resultsPerPage;

    return paginationState.users.slice(start, end);
  }
}

export const pagination = new Pagination();
