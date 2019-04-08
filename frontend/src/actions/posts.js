import * as API from '../utils/PostsAPI';
import { showLoading, hideLoading } from 'react-redux-loading'
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import  { newId } from '../utils/helpers';

export const BY_VOTE_SCORE = 'by Score';
export const BY_DATE = 'by Date';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const SORT_POSTS = 'SORT_POSTS';

export function receivePosts (posts, selectedCategory = '') {  
  return {
      type: RECEIVE_POSTS,
      posts,
      selectedCategory
    };
};

function addPost (post) {
  return {
    type: ADD_POST,
    post,
    selectedCategory: post.category
  };
};

function editPost (id, title, body, category){
  return {
    type: EDIT_POST,
    id,
    title,
    body,
    selectedCategory: category
  }
}

function deletePost (id) {
  return {
    type: DELETE_POST,
    id,
    selectedCategory: ''
  };
};

function votePost (id, vote) {  
  return {
      type: VOTE_POST,
      id,
      vote,
    };
};

export function sortPosts({by, asc}){
  return{
    type: SORT_POSTS,
    by,
    asc
  }
}

export function handleReceivePosts (categorySelected = '', sort) {
  console.log('sort', sort)
  return (dispatch) => {
    console.log(categorySelected);
    return (categorySelected === '' ? (API.getPosts()) : (API.getPostsByCategory(categorySelected)))
      .then((posts) => {
        dispatch(receivePosts(posts, categorySelected));
        sort && dispatch(sortPosts(sort));
      });
  };
};

export function handleAddPost (postForm) {
  if(postForm.author === ''){
    postForm.author = 'Anonymous';
  }
  const post = { ...postForm, id: newId()};
  
  return (dispatch) => {
    dispatch(showLoading());
    return API.addPost(post)
      .then((post) => {
        dispatch(addPost(post))
        dispatch(hideLoading())
        return post
      });
  };
};

export function handleEditPost (id, title, body, category) {
  
  return (dispatch) => {
    dispatch(showLoading());
    return API.editPost(id, title, body)
      .then((post) => {
        dispatch(editPost(id, title, body, category))
        dispatch(hideLoading())
        return post
      });
  };
};

export function handleDeletePost (id) {
  return (dispatch) => {
    dispatch(showLoading());
    return API.deletePost(id)
      .then((post) => {
        console.log(post);
        dispatch(deletePost(post.id))
        dispatch(hideLoading())
      });
  };
};

export function handleUpVotePost(id, sort) {
  return (dispatch) => {
    dispatch(votePost(id, UP_VOTE))
    if(sort!==undefined && sort.by === BY_VOTE_SCORE){
      dispatch(sortPosts(sort));
    }
    return API.votePost(id, UP_VOTE)
      .catch((e) => {
        console.warn('Error in registering vote: ', e);
        dispatch(votePost(id, DOWN_VOTE));
        console.warn('Error in registering vote!');
      })
  };
};

export function handleDownVotePost (id, sort) {
  return (dispatch) => {
    dispatch(votePost(id, DOWN_VOTE));
    if(sort!==undefined && sort.by === BY_VOTE_SCORE){
      dispatch(sortPosts(sort));
    }
    return API.votePost(id, DOWN_VOTE)
      .catch((e) => {
        console.warn('Error in registering vote: ', e);
        dispatch(votePost(id, UP_VOTE));
        console.warn('Error in registering vote!');
      })
  };
};