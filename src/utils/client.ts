import axios from 'axios';

const client = axios.create({ baseURL: import.meta.env['VITE_API_BASE_URL'] });
const tokenClient = axios.create({ baseURL: import.meta.env['VITE_API_BASE_URL'] });

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const res = await tokenClient.post('/auth/refresh');
        if (res.status !== 401) {
          return Promise.reject(error);
        }
        return client(error.config);
      } catch (refreshError) {
        throw refreshError;
      }
    }
    return Promise.reject(error);
  },
);

export default client;
