import { 
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT 
} from '../actions/comments'
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';

export default function comments (state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS :
      return [
        ...action.comments,
      ]
    case ADD_COMMENT: 
        return [
            ...state,
            Object.assign({}, action.comment)
        ];
    case EDIT_COMMENT:
        return state.map((comment) => {
            if(comment.id === action.id){
                comment.body = action.body;
            }
            return comment;
        });
    case DELETE_COMMENT:
        return state.filter((comment) => {
            if(comment.id !== action.id){
                return comment;
            }
        });
    case VOTE_COMMENT :
      return state.map((comment) => {
        if(comment.id === action.id){
          switch(action.vote){
            case UP_VOTE:
                return {
                    ...comment,
                    voteScore: comment.voteScore + 1
                };
            case DOWN_VOTE:
                return {
                    ...comment,
                    voteScore: comment.voteScore - 1
                };
            default:
                return comment;
          }
        }
        return comment;
      })
    default :
      return state
  }
}