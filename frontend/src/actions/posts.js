import * as API from '../utils/PostsAPI';
import  {DOWN_VOTE, UP_VOTE } from '../utils/helpers';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const VOTE_POST = 'VOTE_POST';

export function receivePosts (posts, categorySelected) {  
  return {
      type: RECEIVE_POSTS,
      posts,
      categorySelected
    };
};

function votePost (id, vote) {  
  return {
      type: VOTE_POST,
      id,
      vote,
    };
};

export const handleReceivePosts = (categorySelected = '') => {
  return (dispatch) => {
    console.log(categorySelected);
    return (categorySelected === '' ? (API.getPosts()) : (API.getPostsByCategory(categorySelected)))
      .then((posts) => dispatch(receivePosts(posts, categorySelected)));
  };
};

export const handleUpVotePost = (id) => {
  return (dispatch) => {
    dispatch(votePost(id, UP_VOTE))
    return API.votePost(id, UP_VOTE)
      .catch((e) => {
        console.warn('Error in registering vote: ', e);
        dispatch(votePost(id, DOWN_VOTE));
        console.warn('Error in registering vote!');
      })
  };
};

export const handleDownVotePost = (id) => {
  return (dispatch) => {
    dispatch(votePost(id, DOWN_VOTE));
    return API.votePost(id, DOWN_VOTE)
      .catch((e) => {
        console.warn('Error in registering vote: ', e);
        dispatch(votePost(id, UP_VOTE));
        console.warn('Error in registering vote!');
      })
  };
};