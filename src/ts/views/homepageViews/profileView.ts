import { ConfigUser } from '../../configs/user-config.js';

class ProfileView {
  username = document.querySelector('.profile-username')!;
  email = document.querySelector('.profile-email')!;
  changeUsername = document.querySelector(
    '#changeUsername'
  )! as HTMLInputElement;
  changeEmail = document.querySelector('#changeEmail')! as HTMLInputElement;

  updateProfileData(data: ConfigUser) {
    this.username.textContent = data.username;
    this.email.textContent = data.email;

    this.changeUsername.value = data.username;
    this.changeEmail.value = data.email;
  }
}

export const profileView = new ProfileView();
