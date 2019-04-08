import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comment from './Comment';
import EditComment from './EditComment'
import { handleReceiveComments } from '../actions/comments';
import { selectCategory } from '../actions/selectedCategory';

class CommentsList extends Component{
    
    componentDidMount(){
        const { dispatch, postId, selectedCategory } = this.props;
        dispatch(selectCategory(selectedCategory));
        dispatch(handleReceiveComments(postId));
    }

    render(){
        const { comments, commentId } = this.props;
        return(
            <div>
                {(comments && comments.length > 0) ? `COMMENTS (${comments.length})` : `NO COMMENTS`}
                <ul className='comments-list'>
                    {comments !== undefined && 
                        comments.filter((comment) => (comment.deleted === false && comment.parentDeleted === false))
                            .map((comment) => (
                                <li key={comment.id}>
                                    {(commentId !== undefined && comment.id === commentId)
                                        ? <EditComment id={comment.id}/>
                                        : <Comment id={comment.id}/>
                                    }
                                    
                                </li>
                            ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( {comments}, props ){
    const {id, commentId}  = props.match.params;

    return {
        comments: Object.values(comments),
        selectedCategory: props.match.params.category,
        postId: id,
        commentId
    };
}

export default withRouter(connect(mapStateToProps)(CommentsList));