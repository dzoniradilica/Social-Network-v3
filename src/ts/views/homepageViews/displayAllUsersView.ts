import { ConfigUser } from '../../configs/user-config';

class DisplayAllUsersView {
  parentElement = document.querySelector('.users-wrapper')! as HTMLDivElement;

  displayAllUsers(allUsers: ConfigUser[]) {
    allUsers.forEach(singleUser => {
      const html = `
        <div class="users-inner">
            <img src="images/person.png" alt="person" />
            <h4 class="user-name">${singleUser.username}</h4>

            <div class="btns-div">
                <button id="sendMessage">Message</button>
            </div>
        </div>
        `;

      this.parentElement.insertAdjacentHTML('afterbegin', html);
    });
  }
}

export const displayAllUsersView = new DisplayAllUsersView();
