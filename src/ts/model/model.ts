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

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}
