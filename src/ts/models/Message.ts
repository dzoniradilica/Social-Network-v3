import { fetchData } from '../helpers/helpers.js';
import { API_URL_MESSAGES } from '../helpers/helpers.js';
import { ConfigUser } from '../configs/user-config.js';

class Message {
  async create(content: string, author: ConfigUser, recivedUser: ConfigUser) {
    try {
      const sendData = {
        content: content,
        author: author,
        recived_user: recivedUser,
      };

      const res = await fetchData(
        'api-data',
        API_URL_MESSAGES,
        'POST',
        sendData
      );
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    const res = await fetchData('api', API_URL_MESSAGES);
    const data = await res.json();

    return data;
  }
}

export const message = new Message();
