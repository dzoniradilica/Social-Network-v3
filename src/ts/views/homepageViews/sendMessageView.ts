import { ConfigUser } from '../../configs/user-config';
import { user } from '../../models/User.js';

class SendMessageView {
  renderChat(singleUser: ConfigUser) {
    return `
    <div class="chat-wrapper">
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

  addHandlerSendUser(handler: Function) {
    setTimeout(() => {
      const chatBtn = document.querySelectorAll(
        '#sendMessage'
      )! as NodeListOf<HTMLButtonElement>;

      const chatParent = document.querySelector('.chat')! as HTMLDivElement;

      chatBtn.forEach(btn => {
        btn.addEventListener('click', e => {
          const displayChat = async function () {
            chatParent.innerHTML = '';
            chatParent.style.opacity = '0';

            const messageClass = new SendMessageView();

            const user_id = (e.target! as HTMLButtonElement).dataset.user_id!;
            const singleUser: ConfigUser = await user.get(user_id);

            const html = messageClass.renderChat(singleUser);

            chatParent.insertAdjacentHTML('afterbegin', html);

            chatParent.style.opacity = `100`;

            handler(user_id);

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
    }, 2000);
  }

  renderMessages(chatParent: HTMLDivElement) {
    console.log(chatParent);
  }
}

export const sendMessageView = new SendMessageView();
