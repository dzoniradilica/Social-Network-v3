class LogoutView {
  logoutBtn = document.querySelector('#logout')!;

  addHandlerDeleteSession(hadnler: Function) {
    this.logoutBtn.addEventListener('click', e => {
      e.preventDefault();

      hadnler();
    });
  }
}

export const logoutView = new LogoutView();
