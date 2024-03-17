import { ConfigUser } from '../../configs/user-config';

class DisplayAllUsersView {
  displayAllUsers(allUsers: ConfigUser[]) {
    allUsers.forEach(singleUser => {
      console.log(singleUser);
    });
  }
}

export const displayAllUsersView = new DisplayAllUsersView();
