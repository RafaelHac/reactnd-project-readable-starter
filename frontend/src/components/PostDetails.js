import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaRegEdit,FaRegTrashAlt } from 'react-icons/fa';
import { formatDate } from '../utils/helpers';
import { UP_VOTE, DOWN_VOTE } from '../actions/shared';
import { 
    handleReceivePosts, 
    handleDeletePost,
    handleDownVotePost, 
    handleUpVotePost, 
 } from '../actions/posts';
import CommentsList from './CommentsList';
import NewComment from './NewComment';

class PostDetails extends Component {
    componentDidMount(){
        if(!this.props.post){
            this.props.dispatch(handleReceivePosts(this.props.selectedCategory, this.props.sort));
        }
    }

    handleVote = (vote) => {
        const {post, dispatch } = this.props;
        switch(vote){
            case UP_VOTE:
                return dispatch(handleUpVotePost(post.id));
            case DOWN_VOTE:
                return dispatch(handleDownVotePost(post.id));
            default:
                return;
        }
    }

    handleDelete = () => {
        const {post, dispatch } = this.props;
        dispatch(handleDeletePost(post.id));
    }

    render() {
        const { post, selectedCategory } = this.props;
        if (post === null) {
            return (
                <div className="url-invalida">
                    <p>This Post doesn't exist!</p>
                </div>
            );
        }
        else if (post.category !== selectedCategory){
            return (
                <div className="url-invalida">
                    <p>This Post doesn't exist in this category!</p>
                </div>
            );
        }

        const {
            author, body, commentCount, id, category, timestamp, title, voteScore
        } = post;
        return (
            <div className = 'post'>
                <div className='post-score'>
                    <FaAngleUp className='up-vote-icon' onClick={() => this.handleVote(UP_VOTE)}/>
                        <span>{voteScore}</span>
                    <FaAngleDown className='down-vote-icon' onClick={() => this.handleVote(DOWN_VOTE)}/>
                </div>
                <div className='post-info'>
                    <div>
                        <div className = 'post-category'>Category: {category}</div>
                        <span className = 'post-title'>{title}</span>
                        <div className = 'post-date'>{formatDate(timestamp)}</div>
                        <div className = 'post-author'>Posted by {author}</div>
                        <p>{body}</p>
                        <FaRegTrashAlt className='delete-post' onClick = {() => this.handleDelete()}/>
                        <Link to={`/${category}/${id}/edit`}>
                            <FaRegEdit className='edit-post'/>
                        </Link>
                        <div className = 'comments-count'>{commentCount !== 0 && (commentCount === 1 ? `${commentCount} Comment` : `${commentCount} Comments`)}</div>
                        <CommentsList/>
                        <NewComment postId={id}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({posts, sort}, props) {
    const { id, category } = props.match.params;

    const post = Object.values(posts).filter((post) => post.id === id)[0];
  
    return {
        post: post
            ? post
            : null,
        selectedCategory: category,
        sort
    };
  };
  
export default withRouter(connect(mapStateToProps)(PostDetails));