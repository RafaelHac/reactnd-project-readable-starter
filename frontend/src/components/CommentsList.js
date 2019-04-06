import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comment from './Comment';
import { handleReceiveComments } from '../actions/comments';

class CommentsList extends Component{
    componentDidMount(){
        this.props.dispatch(handleReceiveComments(this.props.postId));
    }

    render(){
        const { comments } = this.props;
        return(
            <div>
                {(comments && comments.length > 0) ? `COMMENTS (${comments.length})` : `NO COMMENTS`}
                <ul className='comments-list'>
                    {console.log(this.props)}
                    {comments !== undefined && 
                        comments.filter((comment) => (comment.deleted === false && comment.parentDeleted === false))
                            .map((comment) => (
                                <li key={comment.id}>
                                    <Comment id={comment.id}/>
                                </li>
                            ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps( {comments}, props ){
    const postId  = props.match.params.id;

    return {
        comments: Object.values(comments), 
        postId
    };
}

export default withRouter(connect(mapStateToProps)(CommentsList));