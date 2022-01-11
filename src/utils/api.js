import axios from 'axios';

const myApi = axios.create({ baseURL: 'https://rubensnews.herokuapp.com' });

export const getTopics = () => {
  return myApi.get('/api/topics').then((res) => {
    return res.data;
  });
};

export const getArticles = (topic, sort) => {
  let str = '/api/articles?';
  if (topic) {
    str += `&topic=${topic}`;
  }
  if (sort) {
    str += `&sort_by=${sort[0]}&order=${sort[1]}`;
  }

  return myApi.get(str).then((res) => {
    return res.data;
  });
};

export const getArticle = (id) => {
  return myApi.get(`/api/articles/${id}`).then((res) => {
    return res.data;
  });
};

export const upVote = (id) => {
  return myApi.patch(`/api/articles/${id}`, { inc_votes: 1 }).then((res) => {
    return res.data.article;
  });
};

export const getComments = (id) => {
  return myApi.get(`/api/articles/${id}/comments`).then((res) => {
    return res.data;
  });
};

export const submitComment = (id, commentText, user) => {
  console.log(user.username, '<---user');

  return myApi
    .post(`/api/articles/${id}/comments`, {
      body: commentText,
      username: user.username,
    })
    .then((res) => {
      return res.data.comment;
    });
};
export const getUsers = () => {
  return myApi.get('/api/users/').then((res) => {
    return res.data.users;
  });
};

export const deleteComment = (id) => {
  return myApi.delete(`/api/comments/${id}`).then((res) => {
    console.log('comment deleted', id, res);

    return res;
  });
};
