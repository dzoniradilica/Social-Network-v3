import { session } from '../model/model.js';
import { logoutView } from '../views/logoutView.js';
import { changeView } from '../views/changeFormView.js';

if (!session.get(document.cookie.split('=')[0])) {
  window.location.href = '../../../hexa-login-register.html';
}

const controlLogout = function () {
  logoutView.destroySession();
};

const controlChangeProfile = function () {
  changeView.openAndCloseModal('#changeModal', 'block');
  changeView.openAndCloseModal('#closeModal', 'none');
};

const init = function () {
  controlLogout();
  controlChangeProfile();
};

init();
