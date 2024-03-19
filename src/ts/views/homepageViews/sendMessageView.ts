class SendMessageView {
  constructor() {
    this.showAndCloseChat('#sendMessage', '100');
    this.showAndCloseChat('#closeChat', '0');
  }

  private showAndCloseChat(openChatId: string, opacity: string) {
    setTimeout(() => {
      const chatBtn = document.querySelectorAll(
        openChatId
      )! as NodeListOf<HTMLButtonElement>;

      chatBtn.forEach(btn => {
        btn.addEventListener('click', e => {
          const chatEl = (
            (e.target! as HTMLButtonElement).closest(
              '.col-md-3'
            )! as HTMLDivElement
          ).querySelector('.chat')! as HTMLDivElement;
          chatEl.style.opacity = `${opacity}`;
        });
      });
    }, 1000);
  }
}

export const sendMessageView = new SendMessageView();
