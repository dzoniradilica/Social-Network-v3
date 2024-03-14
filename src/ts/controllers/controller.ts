import Validator from '../validator.js';
import { configEl } from '../configs/config-validation.js';
import { registrationView } from '../views/registrationView.js';
import { session, user } from '../model/model.js';
import { loginView } from '../views/loginFormView.js';

const validator = new Validator(configEl, '#registrationForm');

if (session.get(document.cookie.split('=')[0])) {
  window.location.href = '../../../hexa-homepage.html';
}

const controlRegistrationForm = async function (userData: any) {
  const [username, email, password] = userData;

  if (validator.validationPassed()) {
    const data = await user.create(email, username, password);

    session.create(data.id);
    window.location.href = '../../../hexa-homepage.html';
  } else alert('Invalid registration!');
};

const controlLoginForm = function () {
  loginView.validationLogin();
};

const init = function () {
  registrationView.addHandlerSubmit(controlRegistrationForm);
  controlLoginForm();
};

init();
