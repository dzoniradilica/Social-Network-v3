import { ConfigElements } from './controller';

interface errorsBag {
  [prop: string]: string[];
}

export default class Validator {
  private configEl;
  private formId;
  private errors: errorsBag = {
    registrationEmail: [],
    registrationPassword: [],
    registrationRepeatPassword: [],
    registrationUsername: [],
  };

  constructor(config: ConfigElements, id: string) {
    this.configEl = config;
    this.formId = id;

    this.config();
    this.validate();
  }

  private addHandlerInput(e: Event) {
    const currentField = e.target! as HTMLInputElement;
    const fieldName = currentField.name;
    const fieldValue = currentField.value;

    this.errors[fieldName] = [];

    if (this.configEl[fieldName].required && fieldValue === '')
      this.errors[fieldName].push('Field is required!');

    if (fieldValue.length < this.configEl[fieldName].minLength)
      this.errors[fieldName].push(
        `This field must have min ${this.configEl[fieldName].minLength} characters!`
      );

    if (fieldValue.length > this.configEl[fieldName].maxLength)
      this.errors[fieldName].push(
        `This field can have max ${this.configEl[fieldName].maxLength} characters!`
      );

    if (!this.emailValidation(fieldValue) && this.configEl[fieldName].email)
      this.errors[fieldName].push('Invalid email!');

    if (this.configEl[fieldName].matching) {
      const matchingEl = document.querySelector(
        `#${this.configEl[fieldName].matching}`
      )! as HTMLInputElement;

      if (matchingEl.value !== fieldValue)
        this.errors[fieldName].push('Passwords do not match!');
      else {
        this.errors[fieldName] = [];
        this.errors[matchingEl.name] = [];
      }
    }

    this.renderErrors(e);
  }

  private renderErrors(e: Event) {
    document.querySelectorAll('ul')?.forEach(elem => elem.remove());

    const containerDiv = (e.target! as HTMLInputElement).closest(
      '.label-input-wrapper'
    )!;

    const listUl = document.createElement('ul');
    containerDiv.appendChild(listUl);

    for (const errArr of Object.values(this.errors)) {
      errArr.forEach(err => {
        const li = document.createElement('li');
        li.textContent += err;
        listUl.appendChild(li);
      });
    }
  }

  private config() {
    const allInputs = document.querySelectorAll(`${this.formId} input`)!;

    allInputs.forEach(input => {
      input.addEventListener('input', this.addHandlerInput.bind(this));
    });
  }

  validate() {
    for (const error of Object.values(this.errors)) {
      if (error.length === 0) return true;
      else {
        return false;
      }
    }
  }

  private emailValidation(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
}
