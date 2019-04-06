import { RECEIVE_COMMENTS, VOTE_COMMENT } from '../actions/comments'
import { DOWN_VOTE, UP_VOTE } from '../utils/helpers';

export default function comments (state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENTS :
      return {
        ... action.comments,
      }
    case VOTE_COMMENT :
      return Object.values(state).map((comment) => {
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