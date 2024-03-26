import { ConfigUser } from '../../configs/user-config';
import { ConfigNews } from '../../configs/news-config';
import { ConfigPagination } from '../../configs/pagination-config';

class DisplayUsersAndNewsView {
  parentElementUsers = document.querySelector(
    '.users-wrapper'
  )! as HTMLDivElement;
  parentElementNews = document.querySelector(
    '.news-wrapper'
  )! as HTMLDivElement;

  addHandlerClick(handler: Function) {
    const parentElement = document.querySelector(
      '.all-users'
    )! as HTMLDivElement;

    parentElement.addEventListener('click', e => {
      const btn = (e.target! as HTMLEmbedElement).closest(
        '.pagination-btn'
      )! as HTMLImageElement;

      if (!btn) return;

      const goTo = +btn.dataset.go_to!;

      handler(goTo);
    });
  }

  renderPagination(data: ConfigPagination) {
    const parentEelementPagination = document.querySelector(
      '.pagination-wrapper'
    )! as HTMLDivElement;

    const curPage = data.page;
    const numPages = Math.ceil(data.users.length / data.resultsPerPage);

    if (curPage === 1 && numPages > 1) {
      parentEelementPagination.innerHTML = '';

      parentEelementPagination.innerHTML = `
      <div class="right-arrow">
        <img class="pagination-btn" src="images/right-arrow .png" data-go_to="${
          curPage + 1
        }" />
      </div>
      `;
    }

    if (numPages > curPage && curPage > 1) {
      parentEelementPagination.innerHTML = '';

      parentEelementPagination.innerHTML = `
      <div class="right-arrow">
        <img class="pagination-btn" src="images/right-arrow .png" data-go_to="${
          curPage + 1
        }" />
      </div>

      <div class="left-arrow">
        <img class="pagination-btn" src="images/left-arrow.png" alt="" data-go_to="${
          curPage - 1
        }"/>
      </div>
      `;
    }

    if (curPage === numPages) {
      parentEelementPagination.innerHTML = '';

      parentEelementPagination.innerHTML = `
      <div class="left-arrow">
        <img class="pagination-btn" src="images/left-arrow.png" data-go_to="${
          curPage - 1
        }"/>
      </div>
      `;
    }

    if (numPages === 1 && curPage === 1) {
      parentEelementPagination.innerHTML = '';
    }
  }

  displayAllUsers(allUsers?: ConfigUser[], currentUserId?: string | number) {
    this.parentElementUsers.innerHTML = '';
    allUsers!.forEach(singleUser => {
      if (+currentUserId! !== +singleUser.id) {
        const html = `
        <div class="users-inner">
            <img src="images/person.png" alt="person" />
            <h4 class="user-name">${singleUser.username}</h4>

            <div class="btns-div">
                <button id="sendMessage" data-user_id="${singleUser.id}">Message</button>
            </div>
        </div>
        `;

        this.parentElementUsers.insertAdjacentHTML('afterbegin', html);

        this.getParentElement(this.parentElementNews);
      }
    });
  }

  addHandlerSendMessage(handler: Function) {
    console.log(this.getParentElement());

    handler();
  }

  getParentElement(ple?: any) {
    return ple;
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
