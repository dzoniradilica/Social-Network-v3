import { registrationView } from '../views/registrationView.js';
import { Session } from '../model/model.js';
import { loginView } from '../views/loginFormView.js';

const session = new Session();

if (session.sessionId) {
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
