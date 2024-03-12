import Validator from './validator.js';
import { configEl } from './configs/config-validation.js';
import User from './model/model.js';

let validator = new Validator(configEl, '#registrationForm');

const openModal = document.querySelector('#openModal')! as HTMLButtonElement;
const closeModal = document.querySelector('#closeModal')! as HTMLHeadingElement;
const registrationForm = document.querySelector(
  '#registrationForm'
)! as HTMLFormElement;

const openAndCloseModal = function (
  btnModal: HTMLElement,
  display: 'none' | 'block',
  otherDisplay: string
) {
  btnModal.addEventListener('click', () => {
    (
      document.querySelector('.custom-modal')! as HTMLDivElement
    ).style.display = `${otherDisplay}`;

    const logo = document.querySelector('.logo')! as HTMLDivElement;
    const infoDiv = document.querySelector(
      '.info-for-registration'
    )! as HTMLDivElement;
    const loginForm = document.querySelector('#loginForm')! as HTMLFormElement;

    logo.style.display = `${display}`;
    infoDiv.style.display = `${display}`;
    loginForm.style.display = `${display}`;
  });
};

openAndCloseModal(openModal, 'none', 'block');
openAndCloseModal(closeModal, 'block', 'none');

registrationForm.addEventListener('submit', e => {
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
    let user = new User(email, username, password);
    user.create();
  } else alert('Invalid registration!');
});
