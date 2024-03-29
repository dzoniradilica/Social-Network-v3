export const API_URL_USERS = `https://65d7959727d9a3bc1d7b607e.mockapi.io/users`;
export const API_URL_POSTS =
  'https://65d7959727d9a3bc1d7b607e.mockapi.io/posts';
export const API_URL_COMMENTS =
  'https://65d8d0b7c96fbb24c1bc5dec.mockapi.io/comments';
export const API_URL_MESSAGES =
  'https://65fb1a4614650eb210095a6f.mockapi.io/messages';

export const fetchData = async function (
  type: 'api' | 'api-data',
  API_URL: string,
  method?: string,
  sendData?: object
) {
  return type === 'api'
    ? await fetch(API_URL)
    : await fetch(API_URL, {
        method: `${method}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });
};
