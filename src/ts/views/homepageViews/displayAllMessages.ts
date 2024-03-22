import { ConfigMessages } from '../../configs/messages-config';
import { ConfigUser } from '../../configs/user-config';

class DisplayAllMessages {
  chatParent = document.querySelector('.chat')! as HTMLDivElement;
  chatWrapper = document.querySelector('.chat-wrapper')! as HTMLDivElement;

  displayMess(allMessages: ConfigMessages[], currentUser: ConfigUser) {
    const recivedId = (
      this.chatParent.querySelector('.chat-wrapper')! as HTMLDivElement
    ).dataset.user_id!;

    if (allMessages.length === 0) return;

    allMessages.forEach(singleMessage => {
      const chatBody = this.chatParent.querySelector(
        '.chat-body'
      )! as HTMLDivElement;
      const author = singleMessage.author;
      const recivedUser = singleMessage.recived_user;

      const allUsernames = document.querySelectorAll(
        '.user-name'
      ) as NodeListOf<HTMLDivElement>;

      if (author.id === currentUser.id && recivedId === recivedUser.id) {
        const html = `
              <div class="message-sent" data-user_id="${author.id}">
                  <p>${singleMessage.content}</p>
              </div>
          `;
        chatBody.innerHTML += html;
      }

      allUsernames.forEach(username => {
        if (
          recivedUser.id === currentUser.id &&
          author.username === username.innerHTML
        ) {
          const html = `
                <div class="message-recived">
                    <p>${singleMessage.content}</p>
                </div>
            `;
          chatBody.innerHTML += html;
        }
      });
    });
  }
}

export const displayAllMessages = new DisplayAllMessages();
