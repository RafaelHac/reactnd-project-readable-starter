import { RECEIVE_CATEGORIES } from '../actions/categories'
import { RECEIVE_POSTS, EDIT_POST, DELETE_POST, ADD_POST } from '../actions/posts';
import { SELECT_CATEGORY } from '../actions/selectedCategory';

export default function selectedCategory (state = {}, action) {
    switch(action.type) {
      case SELECT_CATEGORY:
      case RECEIVE_CATEGORIES :
      case RECEIVE_POSTS:
      case ADD_POST:
        return action.selectedCategory;
      case EDIT_POST:
      case DELETE_POST:
        return action.selectedCategory;
      default :
        return state;
    }
  }