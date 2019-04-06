import * as API from '../utils/PostsAPI';
import { receiveCategories } from '../actions/categories';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receivePosts } from './posts';

function getInitialData(){
  return Promise.all([
    API.getCategories(),
    API.getPosts(),
  ]).then(([categories, posts]) => ({
    categories,
    posts
  }))
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({categories, posts}) => { 
        dispatch(receiveCategories(categories));
        dispatch(receivePosts(posts));
        dispatch(hideLoading());
      })
  }
}