import axios from 'axios';
import routes from './urls.js';

export default async (headers) => {
  try {
    const response = await axios.get(routes.dataPath(), { headers });
    const { data } = response;
    return data;
  } catch (e) {
    const { data, status } = e.response;
    return {
      data,
      status,
    };
  }
};
