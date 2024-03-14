import { session } from '../models/model.js';

class LogoutView {
  logoutBtn = document.querySelector('#logout')!;

  destroySession() {
    this.logoutBtn.addEventListener('click', e => {
      e.preventDefault();

      session.delete(document.cookie.split('=')[0]);

      window.location.href = '../../../hexa-login-register.html';
    });
  }
}

export const logoutView = new LogoutView();
