import * as API from '../utils/PostsAPI';
import  {DOWN_VOTE, UP_VOTE } from '../utils/helpers';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function receiveComments (comments, postId) {  
  return {
      type: RECEIVE_COMMENTS,
      comments,
      postId
    };
};

function voteComment (id, vote) {  
  return {
      type: VOTE_COMMENT,
      id,
      vote,
    };
};

export const handleReceiveComments = (postId) => {
  return (dispatch) => {
    console.log(postId);
    return API.getCommentsByPost(postId)
      .then((comments) => dispatch(receiveComments(comments, postId)));
  };
};

export const handleUpVoteComment = (id) => {
  return (dispatch) => {
    dispatch(voteComment(id, UP_VOTE))
    return API.voteComment(id, UP_VOTE)
      .catch((e) => {
        console.warn('Error in registering vote: ', e);
        dispatch(voteComment(id, DOWN_VOTE));
        console.warn('Error in registering vote!');
      })
  };
};

export const handleDownVoteComment = (id) => {
  return (dispatch) => {
    dispatch(voteComment(id, DOWN_VOTE));
    return API.voteComment(id, DOWN_VOTE)
      .catch((e) => {
        console.warn('Error in registering vote: ', e);
        dispatch(voteComment(id, UP_VOTE));
        console.warn('Error in registering vote!');
      })
  };
};