import axios from 'axios';

const myApi = axios.create({ baseURL: 'https://rubensnews.herokuapp.com' });

export const getTopics = () => {
  return myApi.get('/api/topics').then((res) => {
    return res.data;
  });
};

export const getArticles = (topic, sort) => {
  console.log('getArticles called!', topic, sort);
  let str = '/api/articles?';
  if (topic) {
    str += `&topic=${topic}`;
  }
  if (sort) {
    str += `&sort_by=${sort[0]}&order=${sort[1]}`;
  }
  console.log(str);

  return myApi.get(str).then((res) => {
    return res.data;
  });
};
