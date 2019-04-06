import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { formatDate, UP_VOTE, DOWN_VOTE } from '../utils/helpers';
import { handleDownVotePost, handleUpVotePost } from '../actions/posts';

class Post extends Component {
    handleVote = (vote) => {
        const {id, dispatch } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVotePost(id));
            case DOWN_VOTE:
                return dispatch(handleDownVotePost(id));
        }
    }

    render() {
        const { post } = this.props
        console.log(post);
        if (post === null) {
            return <p>This Post doesn't exist</p>
        }

        const {
            author, body, category, commentCount, id, timestamp, title, voteScore
        } = post

        return (
            <div className = 'post'>
                <div className='post-score'>
                    <FaAngleUp className='up-vote-icon' onClick={() => this.handleVote(UP_VOTE)}/>
                        <span>{voteScore}</span>
                    <FaAngleDown className='down-vote-icon' onClick={() => this.handleVote(DOWN_VOTE)}/>
                </div>
                <Link to={`/${category}/post/${id}`} className='post'>
                    <div className='post-info'>
                        <div>
                            <span className = 'post-title'>{title}</span>
                            <div className = 'post-date'>{formatDate(timestamp)}</div>
                            <div className = 'post-author'>Posted by {author}</div>
                            <p>{body}</p>
                            <div className = 'comments-count'>
                                {commentCount !== 0 && (commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`)}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

function mapStateToProps ({posts}, { id }) {
    const post = Object.values(posts).filter((post) => post.id === id)[0];
  
    return {
      post: post
        ? post
        : null
    }
  }
  
export default withRouter(connect(mapStateToProps)(Post))