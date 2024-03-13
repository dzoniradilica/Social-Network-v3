import User from '../model/model.js';

const user = new User();

class LoginView {
  loginBtn = document.querySelector('#loginForm')! as HTMLFormElement;

  validationLogin() {
    console.log(this.loginBtn);

    this.loginBtn.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = (document.querySelector('#loginEmail')! as HTMLInputElement)
        .value;
      const password = (
        document.querySelector('#loginPassword')! as HTMLInputElement
      ).value;

      const loginUser = async function () {
        await user.login(email, password);
      };
      loginUser();
    });
  }
}

export const loginView = new LoginView();
