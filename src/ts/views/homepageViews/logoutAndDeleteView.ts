class LogoutDeleteView {
  logoutBtn = document.querySelector('#logout')!;
  deleteProfile = document.querySelector(
    '#deleteProfile'
  )! as HTMLButtonElement;

  addHandlerDeleteSession(hadnler: Function) {
    this.logoutBtn.addEventListener('click', e => {
      e.preventDefault();

      hadnler();
    });
  }

  addHandlerDelete(hadnler: Function) {
    this.deleteProfile.addEventListener('click', e => {
      e.preventDefault();

      hadnler();
    });
  }
}

export const logoutDeleteView = new LogoutDeleteView();
