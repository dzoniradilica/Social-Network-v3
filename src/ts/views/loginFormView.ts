class LoginView {
  loginBtn = document.querySelector('#loginForm')! as HTMLFormElement;

  addHandlerLogin(handler: Function) {
    this.loginBtn.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = (document.querySelector('#loginEmail')! as HTMLInputElement)
        .value;
      const password = (
        document.querySelector('#loginPassword')! as HTMLInputElement
      ).value;

      handler(email, password);
    });
  }
}

export const loginView = new LoginView();
