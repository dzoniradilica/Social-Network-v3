import { fetchData, API_URL_USERS } from '../helpers/helpers.js';
import { session } from './Session.js';
import { ConfigUser, UsersState } from '../configs/user-config';

export const stateUser = {
  user: {},
};

export const stateUsers: UsersState = {
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

      const res = await fetchData('api-data', API_URL_USERS, 'POST', sendData);

      let data = await res.json();

      stateUser.user = {
        email: data.email,
        username: data.username,
        password: data.password,
      };

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const res = await fetchData('api', API_URL_USERS);
      const data = await res.json();

      stateUsers.users.push(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async get(userId: string | number) {
    try {
      const res = await fetchData(`api`, `${API_URL_USERS}/${userId}`);
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

  async change(userId: string | number, username: string, email: string) {
    try {
      const sendData = {
        username: username,
        email: email,
      };

      await fetchData(
        'api-data',
        ` ${API_URL_USERS}/${userId}`,
        'PUT',
        sendData
      );
    } catch (err) {
      console.log(err);
    }
  }

  async delete(userId: string | number) {
    try {
      await fetchData('api-data', `${API_URL_USERS}/${userId}`, 'DELETE');
    } catch (err) {
      console.log(err);
    }
  }
}

export const user = new User();
