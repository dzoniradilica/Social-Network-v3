import { registrationView } from '../views/registrationView.js';
import { session } from '../model/model.js';
import { loginView } from '../views/loginFormView.js';

if (session.get(document.cookie.split('=')[0])) {
  window.location.href = '../../../hexa-homepage.html';
}

const controlRegistrationForm = function () {
  registrationView.openAndCloseModal('#openModal', 'none', 'block');
  registrationView.openAndCloseModal('#closeModal', 'block', 'none');

  registrationView.addHandlerSubmit();
};

const controlLoginForm = function () {
  loginView.validationLogin();
};

const init = function () {
  controlRegistrationForm();
  controlLoginForm();
};

init();
