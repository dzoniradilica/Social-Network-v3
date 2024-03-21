import { ConfigMessages } from '../../configs/messages-config';

class DisplayAllMessages {
  chatParent = document.querySelector('.chat')! as HTMLDivElement;
  chatWrapper = document.querySelector('.chat-wrapper')! as HTMLDivElement;

  displayMess(allMessages: ConfigMessages[]) {
    const recivedId = (
      this.chatParent.querySelector('.chat-wrapper')! as HTMLDivElement
    ).dataset.user_id!;

    console.log(recivedId);

    if (allMessages.length === 0) return;

    allMessages.forEach(singleMessage => {
      const chatBody = this.chatParent.querySelector(
        '.chat-body'
      )! as HTMLDivElement;
      const author = singleMessage.author;
      const recivedUser = singleMessage.recived_user;

      if (author && recivedId === recivedUser.id) {
        const html = `
              <div class="message-sent">
                  <p>${singleMessage.content}</p>
              </div>
          `;
        chatBody.innerHTML += html;
      }
    });
  }
}

export const displayAllMessages = new DisplayAllMessages();
