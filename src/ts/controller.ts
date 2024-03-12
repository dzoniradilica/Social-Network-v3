import Validator from './validator.js';

export interface ConfigElements {
  [prop: string]: {
    required: boolean;
    maxLength: number;
    minLength: number;
    email?: boolean;
    matching?: string;
  };
}

const configEl: ConfigElements = {
  registrationUsername: {
    required: true,
    maxLength: 10,
    minLength: 5,
  },

  registrationEmail: {
    required: true,
    minLength: 5,
    maxLength: 50,
    email: true,
  },

  registrationPassword: {
    required: true,
    minLength: 5,
    maxLength: 20,
    matching: 'registrationRepeatPassword',
  },

  registrationRepeatPassword: {
    required: true,
    minLength: 5,
    maxLength: 20,
    matching: 'registrationPassword',
  },
};

new Validator(configEl, '#registrationForm');

const openModal = document.querySelector('#openModal')! as HTMLButtonElement;
const closeModal = document.querySelector('#closeModal')! as HTMLHeadingElement;

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
