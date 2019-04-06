import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import categories from './categories';
import categorySelected from './categorySelected';
import posts from './posts';
import comments from './comments';

export default combineReducers({
  categories,
  categorySelected,
  posts,
  comments,
  loadingBar: loadingBarReducer,
});