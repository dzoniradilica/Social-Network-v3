import { session } from '../model/model.js';
import { logoutView } from '../views/logoutView.js';

if (!session.get(document.cookie.split('=')[0])) {
  window.location.href = '../../../hexa-login-register.html';
}

const controlLogout = function () {
  logoutView.destroySession();
};

const init = function () {
  controlLogout();
};

init();
