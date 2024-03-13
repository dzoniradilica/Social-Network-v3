import { ConfigUser } from '../configs/user-config';

export const state = {
  users: [],
};

export default class User {
  constructor() {}

  async create(email: string, username: string, password: string | number) {
    try {
      const sendData = {
        email: email,
        username: username,
        password: password,
      };

      const res = await fetch(
        `https://65d7959727d9a3bc1d7b607e.mockapi.io/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        }
      );

      let data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const res = await fetch(
        `https://65d7959727d9a3bc1d7b607e.mockapi.io/users`
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async login(email: string, password: string | number) {
    try {
      const allUsers: ConfigUser[] = await this.getAll();
      let validatePassed: number = 0;

      allUsers.forEach(singleUser => {
        if (singleUser.email === email && singleUser.password === password) {
          const session = new Session();
          session.create(singleUser.id);

          window.location.href = '../../../hexa-homepage.html';

          validatePassed++;
        }
      });

      if (validatePassed === 0) {
        alert('Wrong email or password!');
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export class Session {
  sessionId: string | number = document.cookie.split('=')[1];

  create(cvalue: string | number) {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = 'user' + '=' + cvalue + ';' + expires + ';path=/';
  }
}
