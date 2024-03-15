import { API_URL_COMMENTS, fetchData } from '../helpers/helpers.js';

class Comment {
  async create(
    userId: string | number,
    postId: string | number,
    content: string
  ) {
    try {
      const sendData = {
        user_id: userId,
        post_id: postId,
        content: content,
      };

      const res = await fetchData(
        'api-data',
        API_URL_COMMENTS,
        'POST',
        sendData
      );
      const data = await res.json();

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const res = await fetchData('api', API_URL_COMMENTS);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

export const comment = new Comment();
