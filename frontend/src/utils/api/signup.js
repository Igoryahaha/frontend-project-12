import axios from 'axios';
import routes from './urls.js';

export default async (authData) => {
  try {
    const response = await axios.post(routes.signup(), authData);
    const { data, status } = response;
    return {
      data, status,
    };
  } catch (e) {
    const { data, status } = e.response;
    return {
      data, status,
    };
  }
};
