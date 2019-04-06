import { RECEIVE_CATEGORIES } from '../actions/categories'
import { RECEIVE_POSTS } from '../actions/posts';

export default function categorySelected (state = {}, action) {
    switch(action.type) {
      case RECEIVE_CATEGORIES :
        console.log(action);
        return {
          ...state,
          categorySelected: action.categorySelected
        }
      case RECEIVE_POSTS:
      console.log(action);  
      return {
          ...state,
          categorySelected: action.categorySelected
        }
      default :
        return state
    }
  }