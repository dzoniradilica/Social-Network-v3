import { API_URL_POSTS, fetchData } from '../helpers/helpers.js';

export const postState = {};
export const postsState = [];

class Post {
  async create(userId: string | number, content: string) {
    const sendData = {
      userId: userId,
      content: content,
      likes: 0,
    };

    const res = await fetchData('api-data', API_URL_POSTS, 'POST', sendData);
    const data = await res.json();

    return data;
  }

  async getAll() {
    const res = await fetchData(`api`, `${API_URL_POSTS}`);
    const data = await res.json();

    return data;
  }
}

export const post = new Post();
