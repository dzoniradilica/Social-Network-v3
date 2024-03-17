import { session } from '../models/Session.js';
import { user } from '../models/User.js';
import { post } from '../models/Post.js';
import { comment } from '../models/Comment.js';

import { logoutDeleteView } from '../views/homepageViews/logoutAndDeleteView.js';
import { profileView } from '../views/homepageViews/profileView.js';
import { changeView } from '../views/homepageViews/changeView.js';
import { displayAllUsersView } from '../views/homepageViews/displayAllUsersView.js';
import { addPostView } from '../views/homepageViews/addPostCommentView.js';
import { displayAllComments } from '../views/homepageViews/displayAllCommentsView.js';

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
  try {
    const [email, username] = userData;

    await user.change(session.sessionId, username, email);

    location.reload();
  } catch (err) {
    console.log(err);
  }
};

const controlDisplayUsers = async function () {
  const allUsers = await user.getAll();

  displayAllUsersView.displayAllUsers(allUsers);
};

const controlDeleteProfile = async function () {
  try {
    await user.delete(session.sessionId);
    await session.delete(document.cookie.split('=')[0]);

    window.location.href = '../../../hexa-login-register.html';
  } catch (err) {
    console.log(err);
  }
};

const controlAddPost = async function (postContent: string) {
  try {
    const userData = await user.get(session.sessionId);
    const postData = await post.create(
      +session.sessionId,
      postContent,
      userData.username
    );

    addPostView.createPost(postData, userData);
  } catch (err) {
    console.log(err);
  }
};

const controlDisplayPosts = async function () {
  try {
    const allPosts = await post.getAll();
    const singleUser = await user.get(session.sessionId);

    addPostView.displayAllPosts(allPosts, singleUser);
  } catch (err) {
    console.log(err);
  }
};

const controlDisplayComments = async function () {
  try {
    const allComments = await comment.getAll();

    displayAllComments.renderAllComments(allComments);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  controlProfileView();
  controlDisplayUsers();
  controlDisplayPosts();
  controlDisplayComments();
  logoutDeleteView.addHandlerDeleteSession(controlLogin);
  logoutDeleteView.addHandlerDelete(controlDeleteProfile);
  changeView.addHandlerChange(controlChangeProfile);
  addPostView.addPostHandler(controlAddPost);
};

init();

// console.log('radi');
