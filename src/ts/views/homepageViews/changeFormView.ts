class ChangeView {
  constructor() {
    this.openAndCloseModal('#changeModal', 'block');
    this.openAndCloseModal('#closeModal', 'none');
  }

  openAndCloseModal(btnModalId: string, display: string) {
    const btnModal = document.querySelector(btnModalId)! as HTMLButtonElement;

    btnModal.addEventListener('click', () => {
      (
        document.querySelector('.custom-modal')! as HTMLDivElement
      ).style.display = `${display}`;
    });
  }

  changeProfileData() {}
}

export const changeView = new ChangeView();
