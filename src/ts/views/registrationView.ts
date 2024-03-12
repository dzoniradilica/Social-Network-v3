import Validator from '../validator.js';
import { configEl } from '../configs/config-validation.js';
import User from '../model/model.js';

const validator = new Validator(configEl, '#registrationForm');
const user = new User();

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
        user.create(email, username, password);
        window.location.href = '../../../hexa-homepage.html';
      } else alert('Invalid registration!');
    });
  }
}

export const registrationView = new RegistrationView();
