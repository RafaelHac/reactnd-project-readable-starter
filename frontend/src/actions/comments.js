import * as API from '../utils/PostsAPI';
import { showLoading, hideLoading } from 'react-redux-loading'
import { newId } from '../utils/helpers';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export function receiveComments (comments, parentId) {  
  return {
      type: RECEIVE_COMMENTS,
      comments,
      parentId
    };
};

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
};

function editComment (id, body){
  return {
    type: EDIT_COMMENT,
    id,
    body
  }
}

function deleteComment (id, parentId) {
  return {
    type: DELETE_COMMENT,
    id,
    parentId
  };
};

function voteComment (id, vote) {  
  return {
      type: VOTE_COMMENT,
      id,
      vote,
    };
};

export const handleReceiveComments = (parentId) => {
  return (dispatch) => {
    return API.getCommentsByPost(parentId)
      .then((comments) => dispatch(receiveComments(comments, parentId)));
  };
};

export function handleAddComment (commentForm, parentId) {
  if(commentForm.author === ''){
    commentForm.author = 'Anonymous';
  }
  const comment = { ...commentForm, id: newId(), parentId: parentId};
  
  return (dispatch) => {
    dispatch(showLoading());
    return API.addComment(comment)
      .then((comment) => {
        dispatch(addComment(comment))
        dispatch(hideLoading())
        return comment
      });
  };
};

export function handleEditComment (id, body) {
  
  return (dispatch) => {
    dispatch(showLoading());
    return API.editComment(id, body)
      .then((comment) => {
        dispatch(editComment(id, body))
        dispatch(hideLoading())
        return comment
      });
  };
};

export function handleDeleteComment (commentId) {
  return (dispatch) => {
    dispatch(showLoading());
    return API.deleteComment(commentId)
      .then((comment) => {
        dispatch(deleteComment(comment.id, comment.parentId))
        dispatch(hideLoading())
      });
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