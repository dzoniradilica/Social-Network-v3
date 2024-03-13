// https://65d7959727d9a3bc1d7b607e.mockapi.io/

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
}

export class Session {
  sessionId: string = document.cookie.split('=')[1];

  create(cName: string, cvalue: string | number) {
    const d = new Date();
    d.setTime(d.getTime() + 2 * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cName + '=' + cvalue + ';' + expires + ';path=/';
  }
}
