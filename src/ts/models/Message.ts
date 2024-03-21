import { fetchData } from '../helpers/helpers.js';
import { API_URL_MESSAGES } from '../helpers/helpers.js';

class Message {
  async create(
    sendUserId: string | number,
    recivedUserId: string | number,
    content: string
  ) {
    try {
      const sendData = {
        send_user: sendUserId,
        recived_user: recivedUserId,
        content: content,
      };

      const res = await fetchData(
        'api-data',
        API_URL_MESSAGES,
        'POST',
        sendData
      );
      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
}

export const message = new Message();
