import { SORT_POSTS, BY_VOTE_SCORE } from '../actions/posts';

export default function selectedCategory (state = {by: BY_VOTE_SCORE, asc: false}, action) {
    switch(action.type) {
      case SORT_POSTS:
        return {
            by: action.by,
            asc: action.asc
        }
      default :
        return state;
    }
  }