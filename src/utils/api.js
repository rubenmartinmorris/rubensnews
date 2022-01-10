import axios from 'axios';

const myApi = axios.create({ baseURL: 'https://rubensnews.herokuapp.com' });

export const getTopics = () => {
  return myApi.get('/api/topics').then((res) => {
    return res.data;
  });
};

export const getArticles = (topic) => {
  console.log('getArticles called!', topic);

  if (topic === undefined) {
    return myApi.get('/api/articles/').then((res) => {
      return res.data;
    });
  }
  return myApi.get(`/api/articles?topic=${topic}`).then((res) => {
    return res.data;
  });
};
