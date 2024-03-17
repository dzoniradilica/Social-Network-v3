import { ConfigUser } from '../../configs/user-config';
import { ConfigNews } from '../../configs/news-config';

class DisplayUsersAndNewsView {
  parentElementUsers = document.querySelector(
    '.users-wrapper'
  )! as HTMLDivElement;
  parentElementNews = document.querySelector(
    '.news-wrapper'
  )! as HTMLDivElement;

  displayAllUsers(allUsers: ConfigUser[], currentUserId: string | number) {
    allUsers.forEach(singleUser => {
      if (+currentUserId! !== +singleUser.id) {
        const html = `
        <div class="users-inner">
            <img src="images/person.png" alt="person" />
            <h4 class="user-name">${singleUser.username}</h4>

            <div class="btns-div">
                <button id="sendMessage">Message</button>
            </div>
        </div>
        `;

        this.parentElementUsers.insertAdjacentHTML('afterbegin', html);
      }
    });
  }

  displayAllNews<T extends ConfigNews>(allNews: T[]) {
    allNews.forEach(singleNew => {
      const { title, url, urlToImage } = singleNew;

      const html = `
        <div class="news-inner">
          <a href="${url}"  target="_blank">
            <img
              src="${urlToImage}"
              style="height: 150px; width: 200px"
              alt="news"
            />
            <h4>${title}</h4>
          </a>
        </div> 
      `;

      this.parentElementNews.insertAdjacentHTML('afterbegin', html);
    });
  }
}

export const displayUsersAndNewsView = new DisplayUsersAndNewsView();
