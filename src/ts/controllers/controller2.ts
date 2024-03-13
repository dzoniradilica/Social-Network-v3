import { Session } from '../model/model.js';

const session = new Session();
console.log(session.sessionId);

if (!session.sessionId) {
  window.location.href = '../../../hexa-login-register.html';
}
