import { 
    RECEIVE_POSTS,
    ADD_POST,
    EDIT_POST,
    DELETE_POST, 
    VOTE_POST,
    SORT_POSTS,
    BY_DATE,
    BY_VOTE_SCORE
} from '../actions/posts'
import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
        return [
            ...action.posts
        ];
    case ADD_POST:   
        return [
            ...state,
            Object.assign({}, action.post)
        ];
    case EDIT_POST:
        return state.map((post) => {
            if(post.id === action.id){
                post.title = action.title;
                post.body = action.body;
            }
            return post;
        });
    case DELETE_POST:
        return state.filter((post) => {
            if(post.id !== action.id){
                return post;
            }
        });
    case VOTE_POST :
        return state.map((post) => {
                if(post.id === action.id){
                    switch(action.vote){
                        case UP_VOTE:
                            return {
                                ...post,
                                voteScore: post.voteScore + 1
                            };
                        case DOWN_VOTE:
                            return {
                                ...post,
                                voteScore: post.voteScore - 1
                            };
                        default:
                            return post;
                    }
                }
                return post;
            });
    case SORT_POSTS:
        if(state.length > 0){
            switch(action.by){
                case BY_DATE:
                    return action.asc ? [].concat(state.sort((a,b) => a.timestamp - b.timestamp)) : [].concat(state.sort((a,b) => b.timestamp - a.timestamp));
                case BY_VOTE_SCORE:
                    return action.asc ? [].concat(state.sort((a,b) => a.voteScore - b.voteScore)) : [].concat(state.sort((a,b) => b.voteScore - a.voteScore));
                default: return state;
            }
        }    
        return state;
    case ADD_COMMENT:
        return state.map((post) => {
            if(post.id === action.comment.parentId){
                post.commentCount++;
            }
            return post;
        });
    case DELETE_COMMENT:
        return state.map((post) => {
            if(post.id === action.parentId){
                post.commentCount--;
            }
            return post;
        });
    default :
        return state;
  }
}