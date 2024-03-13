// import { user } from '../model/model.js';
// import { state } from '../model/model.js';
import { registrationView } from '../views/registrationView.js';
// import { session } from '../model/model.js';
import { loginView } from '../views/loginFormView.js';

// if (session.get(document.cookie.split('=')[0])) {
//   window.location.href = '../../../hexa-homepage.html';
// }

const controlRegistrationForm = async function () {
  try {
    registrationView.openAndCloseModal('#openModal', 'none', 'block');
    registrationView.openAndCloseModal('#closeModal', 'block', 'none');

    registrationView.addHandlerSubmit();
  } catch (err) {
    console.log(err);
  }
};

const controlLoginForm = function () {
  loginView.validationLogin();
};

const init = function () {
  controlRegistrationForm();
  controlLoginForm();
};

init();
