class ChangeView {
  changeProfile = document.querySelector(
    '#changeProfile'
  )! as HTMLButtonElement;

  constructor() {
    this.openAndCloseModal('#changeModal', 'block');
    this.openAndCloseModal('#closeModal', 'none');
  }

  addHandlerChange(hadnler: Function) {
    this.changeProfile.addEventListener('click', e => {
      e.preventDefault();
      console.log('op');
      const changeUsername = (
        document.querySelector('#changeUsername')! as HTMLInputElement
      ).value;
      const changeEmail = (
        document.querySelector('#changeEmail')! as HTMLInputElement
      ).value;

      hadnler([changeEmail, changeUsername]);
    });
  }

  private openAndCloseModal(btnModalId: string, display: string) {
    const btnModal = document.querySelector(btnModalId)! as HTMLButtonElement;

    btnModal.addEventListener('click', () => {
      (
        document.querySelector('.custom-modal')! as HTMLDivElement
      ).style.display = `${display}`;
    });
  }
}

export const changeView = new ChangeView();
