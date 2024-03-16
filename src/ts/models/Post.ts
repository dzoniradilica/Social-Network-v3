import { API_URL_POSTS, fetchData } from '../helpers/helpers.js';

export const postState = {};
export const postsState = [];

class Post {
  async create(userId: string | number, content: string, author: string) {
    try {
      const sendData = {
        userId: userId,
        content: content,
        likes: 0,
        author: author,
        liked: false,
      };

      const res = await fetchData('api-data', API_URL_POSTS, 'POST', sendData);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async get(postId: string | number) {
    try {
      const res = await fetchData(`api`, `${API_URL_POSTS}/${postId}`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const res = await fetchData(`api`, `${API_URL_POSTS}`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(postId: string | number) {
    try {
      console.log(postId);

      await fetchData('api-data', `${API_URL_POSTS}/${postId}`, 'DELETE');
    } catch (err) {
      console.log(err);
    }
  }

  async change(postId: string | number, likes: string | number) {
    try {
      const sendData = {
        likes: likes,
        liked: true,
      };

      await fetchData(
        'api-data',
        ` ${API_URL_POSTS}/${postId}`,
        'PUT',
        sendData
      );
    } catch (err) {
      console.log(err);
    }
  }
}

export const post = new Post();
