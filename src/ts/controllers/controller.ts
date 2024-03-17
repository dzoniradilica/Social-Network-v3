import { validator } from '../Validator.js';
import { registrationView } from '../views/logRegViews/registrationView.js';
import { user } from '../models/User.js';
import { session } from '../models/Session.js';
import { loginView } from '../views/logRegViews/loginFormView.js';

if (session.get(document.cookie.split('=')[0])) {
  window.location.href = '../../../hexa-homepage.html';
}

const controlRegistrationForm = async function (userData: string[]) {
  try {
    const [username, email, password] = userData;

    if (
      validator.validationPassed() &&
      username !== '' &&
      email !== '' &&
      password !== ''
    ) {
      const data = await user.create(email, username, password);

      session.create(data.id);
      window.location.href = '../../../hexa-homepage.html';
    } else alert('Invalid registration!');
  } catch (err) {
    console.log(err);
  }
};

const controlLoginForm = async function (userData: string[]) {
  try {
    const [email, password] = userData;

    await user.login(email, password);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  registrationView.addHandlerSubmit(controlRegistrationForm);
  loginView.addHandlerLogin(controlLoginForm);
};

init();
