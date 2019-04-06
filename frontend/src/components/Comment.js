import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { formatDate, UP_VOTE, DOWN_VOTE } from '../utils/helpers';
import { handleDownVoteComment, handleUpVoteComment } from '../actions/comments';

class Comment extends Component {
    handleVote = (vote) => {
        const {id, dispatch } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVoteComment(id));
            case DOWN_VOTE:
                return dispatch(handleDownVoteComment(id));
        }
    }

    render() {
        const { comment } = this.props
        console.log(comment);
        if (comment === null) {
            return <p>This Comment doesn't exist</p>
        }

        const {
            author, body, id, timestamp, voteScore
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
            </div>
        )
    }
}

function mapStateToProps ({comments}, { id }) {
    const comment = Object.values(comments).filter((comment) => comment.id === id)[0];
  
    return {
      comment: comment
        ? comment
        : null
    }
  }
  
export default withRouter(connect(mapStateToProps)(Comment))