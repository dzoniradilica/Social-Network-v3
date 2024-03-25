import { user } from './User.js';
import { session } from './Session.js';
import { ConfigUser } from '../configs/user-config.js';
// import { ConfigPagination } from '../configs/pagination-config.js';

export const paginationState: any = {
  users: [],
  page: 1,
  resultsPerPage: 4,
};

class Pagination {
  async paginationResults(page: number = paginationState.page) {
    paginationState.page = page;

    console.log(page);

    const allUsers: ConfigUser[] = await user.getAll();

    allUsers.forEach(singleUser => {
      if (singleUser.id !== session.sessionId)
        paginationState.users.push(singleUser);
    });

    const start = (page - 1) * paginationState.resultsPerPage;
    const end = page * paginationState.resultsPerPage;

    return paginationState.users.slice(start, end);
  }
}

export const pagination = new Pagination();
