export const API_URL_USERS = `https://65d7959727d9a3bc1d7b607e.mockapi.io/users`;
export const API_URL_POSTS =
  'https://65d7959727d9a3bc1d7b607e.mockapi.io/posts';

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
