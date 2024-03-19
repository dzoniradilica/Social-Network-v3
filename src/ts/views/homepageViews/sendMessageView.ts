import { ConfigUser } from '../../configs/user-config';
import { user } from '../../models/User.js';

class SendMessageView {
  chatParent = document.querySelector('.chat')! as HTMLDivElement;

  addHandlerSendUser(handler: Function) {
    setTimeout(() => {
      const chatBtn = document.querySelectorAll(
        '#sendMessage'
      )! as NodeListOf<HTMLButtonElement>;

      const chatParent = document.querySelector('.chat')! as HTMLDivElement;

      chatBtn.forEach(btn => {
        btn.addEventListener('click', e => {
          const renderChat = async function () {
            chatParent.innerHTML = '';
            chatParent.style.opacity = '100';

            const user_id = (e.target! as HTMLButtonElement).dataset.user_id!;
            const singleUser: ConfigUser = await user.get(user_id);

            const html = `
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

            chatParent.insertAdjacentHTML('afterbegin', html);

            chatParent.style.opacity = `100`;

            handler(user_id);

            const closeChat = chatParent.querySelectorAll('#closeChat');

            closeChat.forEach(btn => {
              btn.addEventListener('click', () => {
                chatParent.style.opacity = '0';
              });
            });
          };

          renderChat();
        });
      });
    }, 1000);
  }

  provjera() {
    console.log(this.chatParent);
  }
}

export const sendMessageView = new SendMessageView();
sendMessageView.provjera();
