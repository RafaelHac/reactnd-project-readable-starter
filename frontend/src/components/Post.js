import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaRegTrashAlt } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import { handleDeletePost, handleDownVotePost, handleUpVotePost } from '../actions/posts';

class Post extends Component {
    handleVote = (vote) => {
        const { id, dispatch, sort } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVotePost(id, sort));
            case DOWN_VOTE:
                return dispatch(handleDownVotePost(id, sort));
            default:
                return;
        }
    }

    handleDelete = () => {
        const {post, dispatch } = this.props;
        console.log(this.props);
        dispatch(handleDeletePost(post.id));
    }

    render() {
        const { post } = this.props
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
                <Link to={`/${category}/${id}`} className='post'>
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
                <div className='post-delete'>
                    <FaRegTrashAlt className='delete-post' onClick = {() => this.handleDelete()}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({posts, sort}, { id }) {
    const post = Object.values(posts).filter((post) => post.id === id)[0];
  
    return {
        post: post
            ? post
            : null,
        sort
    }
  }
  
export default withRouter(connect(mapStateToProps)(Post))