import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import categories from './categories';
import selectedCategory from './selectedCategory';
import posts from './posts';
import comments from './comments';
import sort from './sort';

export default combineReducers({
  categories,
  selectedCategory,
  posts,
  comments,
  sort,
  loadingBar: loadingBarReducer,
});