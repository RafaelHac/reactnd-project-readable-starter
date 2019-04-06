import { RECEIVE_POSTS, VOTE_POST } from '../actions/posts'
import { DOWN_VOTE, UP_VOTE } from '../utils/helpers';

export default function posts (state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS :
        return {
            ...action.posts,
        }
    case VOTE_POST :
        return Object.values(state).map((post) => {
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
            })
    default :
        return state
  }
}