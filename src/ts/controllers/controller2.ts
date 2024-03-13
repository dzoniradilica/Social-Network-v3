import { session, user } from '../model/model.js';
import { logoutView } from '../views/logoutView.js';
import { changeView } from '../views/changeFormView.js';
import { profileView } from '../views/profileView.js';

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

const controlProfileView = async function () {
  try {
    const data = await user.get(session.sessionId);

    profileView.updateProfileData(data);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  controlLogout();
  controlChangeProfile();
  controlProfileView();
};

init();
