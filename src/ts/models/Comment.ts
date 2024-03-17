import { API_URL_COMMENTS, fetchData } from '../helpers/helpers.js';
import { ConfigComment } from '../configs/comment-config.js';

let stateComments: ConfigComment[] = [];

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

      stateComments.push(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const res = await fetchData('api', API_URL_COMMENTS);
      const data = await res.json();

      stateComments.push(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(_: string | number, post_id: string | number) {
    try {
      stateComments.forEach(comments => {
        if (Array.isArray(comments)) {
          comments.forEach(comm => {
            if (comm.post_id === post_id) {
              const deleteComm = async function () {
                await fetchData(
                  'api-data',
                  `${API_URL_COMMENTS}/${comm.id}`,
                  'DELETE'
                );
              };
              deleteComm();
            }
          });
        } else {
          if (comments.post_id === post_id) {
            const deleteComm = async function () {
              await fetchData(
                'api-data',
                `${API_URL_COMMENTS}/${comments.id}`,
                'DELETE'
              );
            };
            deleteComm();
          }
        }
      });

      // if (comment_id === post_id)
      //   await fetchData(
      //     'api-data',
      //     `${API_URL_COMMENTS}/${comment_id}`,
      //     'DELETE'
      //   );
    } catch (err) {}
  }
}

export const comment = new Comment();
