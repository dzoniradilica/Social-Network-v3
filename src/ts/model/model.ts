// https://65d7959727d9a3bc1d7b607e.mockapi.io/

export const state = {
  users: [],
};

export default class User {
  constructor(
    public email: string,
    public username: string,
    public password: string | number
  ) {}

  async create() {
    try {
      const sendData = {
        email: this.email,
        username: this.username,
        password: this.password,
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
