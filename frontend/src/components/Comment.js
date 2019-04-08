import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import { handleDeleteComment, handleDownVoteComment, handleUpVoteComment } from '../actions/comments';

class Comment extends Component {
    handleDelete = () => {
        const {comment, dispatch } = this.props;
        dispatch(handleDeleteComment(comment.id));
    }
    
    handleVote = (vote) => {
        const {id, dispatch } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVoteComment(id));
            case DOWN_VOTE:
                return dispatch(handleDownVoteComment(id));
            default:
                return;
        }
    }

    render() {
        const { comment, selectedCategory } = this.props
        if (comment === null) {
            return <p>This Comment doesn't exist</p>
        }

        const {
            id, author, body, timestamp, voteScore, parentId
        } = comment

        return (
            <div className = 'comment'>
                <div className='comment-score'>
                    <FaAngleUp className='up-vote-icon' onClick={() => this.handleVote(UP_VOTE)}/>
                        <span>{voteScore}</span>
                    <FaAngleDown className='down-vote-icon' onClick={() => this.handleVote(DOWN_VOTE)}/>
                </div>
                <div className='comment-info'>
                    <div>
                        <p>{body}</p>
                        <div className = 'comment-date'>{formatDate(timestamp)}</div>
                        <div className = 'comment-author'>Posted by {author}</div>
                    </div>
                </div>
                <div className='comment-options'>
                    <FaRegTrashAlt className='delete-comment' onClick = {() => this.handleDelete()}/>
                    <Link to={`/${selectedCategory}/${parentId}/${id}`}>
                        <FaRegEdit className='edit-post'/>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({comments, selectedCategory}, {id}, props) {
    const comment = Object.values(comments).filter((comment) => comment.id === id)[0];
    return {
      comment: comment
        ? comment
        : null,
      selectedCategory
    }
  }
  
export default withRouter(connect(mapStateToProps)(Comment))