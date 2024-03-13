import Validator from '../validator.js';
import { configEl } from '../configs/config-validation.js';
import User, { Session } from '../model/model.js';

const validator = new Validator(configEl, '#registrationForm');
const user = new User();
const session = new Session();

class RegistrationView {
  registrationForm = document.querySelector(
    '#registrationForm'
  )! as HTMLFormElement;

  openAndCloseModal(
    btnModalId: string,
    display: 'none' | 'block',
    otherDisplay: string
  ) {
    const btnModal = document.querySelector(btnModalId)! as HTMLButtonElement;

    btnModal.addEventListener('click', () => {
      (
        document.querySelector('.custom-modal')! as HTMLDivElement
      ).style.display = `${otherDisplay}`;

      const logo = document.querySelector('.logo')! as HTMLDivElement;
      const infoDiv = document.querySelector(
        '.info-for-registration'
      )! as HTMLDivElement;
      const loginForm = document.querySelector(
        '#loginForm'
      )! as HTMLFormElement;

      logo.style.display = `${display}`;
      infoDiv.style.display = `${display}`;
      loginForm.style.display = `${display}`;
    });
  }

  addHandlerSubmit() {
    this.registrationForm.addEventListener('submit', e => {
      e.preventDefault();

      const username = (
        document.querySelector('#registrationUsername')! as HTMLInputElement
      ).value;
      const email = (
        document.querySelector('#registrationEmail')! as HTMLInputElement
      ).value;
      const password = (
        document.querySelector('#registrationPassword')! as HTMLInputElement
      ).value;

      if (validator.validationPassed()) {
        const createSessionAndUser = async function () {
          const userData = await user.create(email, username, password);

          session.create(userData.id);
          window.location.href = '../../../hexa-homepage.html';
        };

        createSessionAndUser();
      } else alert('Invalid registration!');
    });
  }
}

export const registrationView = new RegistrationView();
