class ChangeView {
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
