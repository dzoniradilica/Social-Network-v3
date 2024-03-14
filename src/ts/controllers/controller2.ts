import { session } from '../models/Session.js';
import { user } from '../models/User.js';
import { logoutView } from '../views/homepageViews/logoutView.js';
import { changeView } from '../views/homepageViews/changeFormView.js';
import { profileView } from '../views/homepageViews/profileView.js';

if (!session.get(document.cookie.split('=')[0])) {
  window.location.href = '../../../hexa-login-register.html';
}

const controlProfileView = async function () {
  try {
    const data = await user.get(session.sessionId);

    profileView.updateProfileData(data);
  } catch (err) {
    console.log(err);
  }
};

const controlLogoutAndChange = function () {
  session.delete(document.cookie.split('=')[0]);

  window.location.href = '../../../hexa-login-register.html';
};

const controlChangeProfile = function () {
  console.log(changeView);
};

const init = function () {
  controlProfileView();
  logoutView.addHandlerDeleteSession(controlLogoutAndChange);
  controlChangeProfile();
};

init();
