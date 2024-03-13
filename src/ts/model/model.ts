import { ConfigUser } from '../configs/user-config';

export const state: any = {
  users: [],
};

class User {
  constructor() {
    this.getAll();
  }

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
      console.log(data);

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

      state.users.push(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async get(userId: string | number = 1) {
    try {
      const res = await fetch(
        `https://65d7959727d9a3bc1d7b607e.mockapi.io/users/${userId}`
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

  async change() {
    try {
    } catch (err) {}
  }
}

export const user = new User();

class Session {
  sessionId: string | number = document.cookie.split('=')[1];

  create(cvalue: string | number) {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = 'user' + '=' + cvalue + ';' + expires + ';path=/';
  }

  get(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        console.log(c.substring(name.length, c.length));

        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  delete(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
}

export const session = new Session();
