import { session } from '../models/Session.js';
import { user } from '../models/User.js';
import { post } from '../models/Post.js';

import { logoutDeleteView } from '../views/homepageViews/logoutAndDeleteView.js';
import { profileView } from '../views/homepageViews/profileView.js';
import { changeView } from '../views/homepageViews/changeView.js';
import { addPostView } from '../views/homepageViews/addPostView.js';

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

const controlLogin = function () {
  session.delete(document.cookie.split('=')[0]);

  window.location.href = '../../../hexa-login-register.html';
};

const controlChangeProfile = async function (userData: [string, string]) {
  const [email, username] = userData;

  await user.change(session.sessionId, username, email);

  location.reload();
};

const controlDeleteProfile = async function () {
  await user.delete(session.sessionId);
  await session.delete(document.cookie.split('=')[0]);

  window.location.href = '../../../hexa-login-register.html';
};

const controlAddRecipe = async function (postContent: string) {
  const userData = await user.get(session.sessionId);
  const postData = await post.create(
    +session.sessionId,
    postContent,
    userData.username
  );

  addPostView.createPost(postData, userData);
};

const controlDisplayPosts = async function () {
  const allPosts = await post.getAll();
  const singleUser = await user.get(session.sessionId);

  addPostView.displayAllPosts(allPosts, singleUser);
};

const init = function () {
  controlProfileView();
  controlDisplayPosts();
  logoutDeleteView.addHandlerDeleteSession(controlLogin);
  logoutDeleteView.addHandlerDelete(controlDeleteProfile);
  changeView.addHandlerChange(controlChangeProfile);
  addPostView.addPostHandler(controlAddRecipe);
};

init();

// console.log('radi');
