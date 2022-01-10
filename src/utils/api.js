import axios from 'axios';

const myApi = axios.create({ baseURL: 'https://rubensnews.herokuapp.com' });

export const getTopics = () => {
  return myApi.get('/api/topics').then((res) => {
    return res.data;
  });
};
