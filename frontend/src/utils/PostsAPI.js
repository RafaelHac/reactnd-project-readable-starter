
const api = "//localhost:3001";


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json());

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json());

export const addPost = (post) =>
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...post, timestamp: Date.now() })
    }).then(res => res.json());

export const getPostById = (id) => 
    fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json());

export const votePost = (id, vote) =>
    fetch(`${api}/posts/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option: vote })
    }).then(res => res.json());

export const editPost = (id, title, body) =>
    fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, body, timestamp: Date.now() })
    }).then(res => res.json());

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json());

export const getCommentsByPost = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json());

export const addComment = (comment) =>
    fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...comment, timestamp: Date.now() })
    }).then(res => res.json());

export const getCommentById = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json());

    export const voteComment = (id, vote) =>
    fetch(`${api}/comments/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option: vote })
    }).then(res => res.json());

export const editComment = (id,  body) =>
    fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body, timestamp: Date.now() })
    }).then(res => res.json());

export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
    }).then(res => res.json());