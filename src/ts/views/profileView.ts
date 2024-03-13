import { ConfigUser } from '../configs/user-config.js';

class ProfileView {
  username = document.querySelector('.profile-username')!;
  email = document.querySelector('.profile-email')!;

  updateProfileData(data: ConfigUser) {
    this.username.textContent = data.username;
    this.email.textContent = data.email;
  }
}

export const profileView = new ProfileView();
