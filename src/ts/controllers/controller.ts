import { registrationView } from '../views/registrationView.js';

const controlRegistrationForm = function () {
  registrationView.openAndCloseModal('#openModal', 'none', 'block');
  registrationView.openAndCloseModal('#closeModal', 'block', 'none');

  registrationView.addHandlerSubmit();
};

const init = function () {
  controlRegistrationForm();
};

init();
