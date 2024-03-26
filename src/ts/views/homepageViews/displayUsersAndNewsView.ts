import { ConfigUser } from '../../configs/user-config';
import { ConfigNews } from '../../configs/news-config';
import { ConfigPagination } from '../../configs/pagination-config';
import { user } from '../../models/User.js';
import { message } from '../../models/Message.js';
import { session } from '../../models/Session.js';

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
      }
    });

    const chatBtns = document.querySelectorAll(
      '#sendMessage'
    )! as NodeListOf<HTMLButtonElement>;

    const chatParent = document.querySelector('.chat')! as HTMLDivElement;

    chatBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const displayChat = async function () {
          chatParent.innerHTML = '';
          chatParent.style.opacity = '0';

          const messageClass = new DisplayUsersAndNewsView();

          const user_id = (e.target! as HTMLButtonElement).dataset.user_id!;
          const singleUser: ConfigUser = await user.get(user_id);

          const html = messageClass.renderChat(singleUser);

          chatParent.insertAdjacentHTML('afterbegin', html);

          chatParent.style.opacity = `100`;

          const closeChat = chatParent.querySelectorAll('#closeChat');

          closeChat.forEach(btn => {
            btn.addEventListener('click', () => {
              chatParent.style.opacity = '0';
            });
          });

          messageClass.renderMessages(chatParent);
        };
        displayChat();
      });
    });
  }

  renderMessages(chatParent: HTMLDivElement) {
    const sendBtn = chatParent.querySelector(
      '#sendMessage'
    ) as HTMLButtonElement;

    const recivedUserId = (
      chatParent.querySelector('.chat-wrapper')! as HTMLDivElement
    ).dataset.user_id!;

    sendBtn.addEventListener('click', e => {
      const chatContent = (e.target! as HTMLButtonElement)!
        .previousElementSibling! as HTMLInputElement;

      const chatBody = chatParent.querySelector('.chat-body') as HTMLDivElement;

      const html = `
        <div class="message-sent" data-user_id="${session.sessionId}">
          <p data-sent_user_id="">${chatContent.value}</p>
        </div>
      `;

      chatBody.innerHTML += html;

      const createMessage = async function () {
        const author = await user.get(session.sessionId);
        const recivedUser = await user.get(recivedUserId);

        await message.create(chatContent.value, author, recivedUser);
        chatContent.value = '';
      };

      createMessage();
    });
  }

  renderChat(singleUser: ConfigUser) {
    return `
    <div class="chat-wrapper" data-user_id="${singleUser.id}">
        <div class="chat-header">
        <div class="person-info">
            <img src="images/person.png" alt="person" />
            <h5 class="chat-name">${singleUser?.username}</h5>
        </div>

        <div class="button-inner">
            <span id="closeChat">X</span>
        </div>
        </div>

        <div class="chat-body"></div>

        <div class="chat-footer">
        <input
            type="text"
            name=""
            id="chatContent"
            placeholder="Send message..."
        />
        <button id="sendMessage">Send</button>
        </div>
    </div>
  `;
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
