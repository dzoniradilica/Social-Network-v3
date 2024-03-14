class RegistrationView {
  registrationForm = document.querySelector(
    '#registrationForm'
  )! as HTMLFormElement;

  constructor() {
    this.openAndCloseModal('#openModal', 'none', 'block');
    this.openAndCloseModal('#closeModal', 'block', 'none');
  }

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

  addHandlerSubmit(handler: any) {
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

      handler([username, email, password]);
    });
  }
}

export const registrationView = new RegistrationView();
